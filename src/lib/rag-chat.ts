import { RAGChat, upstash } from "@upstash/rag-chat"
import { redis } from "./redis"
export const ragChat = new RAGChat({
    // model: upstash("meta-llama/Meta-llama-3-8b-Instruct"),
    model: upstash("meta-llama/Meta-Llama-3-8B-Instruct"),
    redis: redis,
})