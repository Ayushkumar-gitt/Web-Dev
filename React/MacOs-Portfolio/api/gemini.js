/* global process */

const getGeminiUrl = (model) =>
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`

const getPrompt = (body) => {
    if (typeof body === 'string') {
        try {
            return JSON.parse(body).prompt
        } catch {
            return ''
        }
    }

    return body?.prompt
}

const getGeminiText = (payload) =>
    payload.candidates
        ?.flatMap((candidate) => candidate.content?.parts || [])
        ?.map((part) => part.text)
        ?.filter(Boolean)
        ?.join('\n')

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        response.setHeader('Allow', 'POST')
        return response.status(405).json({ error: 'Method not allowed' })
    }

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
        return response.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server' })
    }

    const prompt = getPrompt(request.body)

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
        return response.status(400).json({ error: 'Prompt is required' })
    }

    try {
        const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
        const geminiResponse = await fetch(getGeminiUrl(model), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey
            },
            body: JSON.stringify({
                systemInstruction: {
                    parts: [
                        {
                            text: 'Answer as a helpful assistant inside Ayush Kumar portfolio terminal. Keep responses concise.'
                        }
                    ]
                },
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: prompt.trim() }]
                    }
                ]
            })
        })
        const payload = await geminiResponse.json()

        if (!geminiResponse.ok) {
            return response.status(geminiResponse.status).json({
                error: payload.error?.message || 'Gemini request failed'
            })
        }

        return response.status(200).json({
            answer: getGeminiText(payload)?.trim() || 'No response text returned.'
        })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}
