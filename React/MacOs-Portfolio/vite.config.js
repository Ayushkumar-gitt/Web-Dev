/* global process */

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const getGeminiUrl = (model) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`

const readJsonBody = (request) =>
  new Promise((resolve) => {
    let body = ''

    request.on('data', (chunk) => {
      body += chunk
    })

    request.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'))
      } catch {
        resolve({})
      }
    })
  })

const sendJson = (response, statusCode, data) => {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(data))
}

const getGeminiText = (payload) =>
  payload.candidates
    ?.flatMap((candidate) => candidate.content?.parts || [])
    ?.map((part) => part.text)
    ?.filter(Boolean)
    ?.join('\n')

const geminiDevApi = (env) => ({
  name: 'gemini-dev-api',
  configureServer(server) {
    server.middlewares.use(async (request, response, next) => {
      if (!request.url?.startsWith('/api/gemini')) {
        next()
        return
      }

      if (request.method !== 'POST') {
        response.setHeader('Allow', 'POST')
        sendJson(response, 405, { error: 'Method not allowed' })
        return
      }

      if (!env.GEMINI_API_KEY) {
        sendJson(response, 500, { error: 'GEMINI_API_KEY is not configured in .env' })
        return
      }

      const body = await readJsonBody(request)
      const prompt = body.prompt?.trim()

      if (!prompt) {
        sendJson(response, 400, { error: 'Prompt is required' })
        return
      }

      try {
        const model = env.GEMINI_MODEL || 'gemini-2.5-flash'
        const geminiResponse = await fetch(getGeminiUrl(model), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': env.GEMINI_API_KEY,
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [
                {
                  text: 'Answer as a helpful assistant inside Ayush Kumar portfolio terminal. Keep responses concise.',
                },
              ],
            },
            contents: [
              {
                role: 'user',
                parts: [{ text: prompt }],
              },
            ],
          }),
        })
        const payload = await geminiResponse.json()

        if (!geminiResponse.ok) {
          sendJson(response, geminiResponse.status, {
            error: payload.error?.message || 'Gemini request failed',
          })
          return
        }

        sendJson(response, 200, {
          answer: getGeminiText(payload)?.trim() || 'No response text returned.',
        })
      } catch (error) {
        sendJson(response, 500, { error: error.message })
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), geminiDevApi(env)],
  }
})
