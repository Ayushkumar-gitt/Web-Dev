import { PDFParse } from 'pdf-parse'
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from '@langchain/mistralai'
import { Pinecone } from '@pinecone-database/pinecone'
import 'dotenv/config'
import fs from 'fs'

// const dataBuffer = fs.readFileSync("./HarshVardhanSain.pdf")

const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed", // Default value
});

const pc = new Pinecone({ apiKey: process.env.VECTOR_API_KEY });
const index = pc.index('rag')

// const parser = new PDFParse({
//     data: dataBuffer
// })

// const pdfText = await parser.getText()

// const spitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 1500,
//     chunkOverlap: 0
// })
// const chunks = await spitter.splitText(pdfText.text)

// const docs = await Promise.all(chunks.map(async (chunk) => {
//     const embedding = await embeddings.embedQuery(chunk)
//     return {
//         text: chunk,
//         embedding
//     }
// }))

// const result = await index.upsert({
//     records: docs.map((doc, i) => ({
//         id: `doc-${i}`,
//         values: doc.embedding,
//         metadata: {
//             text: doc.text
//         }
//     }))
// })

const embeddingQuery = await embeddings.embedQuery("What is FCFS?")

const results = await index.query({
    vector: embeddingQuery,
    topK: 2,
    includeMetadata: true
})

console.log(JSON.stringify(results))