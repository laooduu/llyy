import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const { messages, sessionId } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    const response = await ragChat.chat(lastMessage, { streaming: true, sessionId });

    console.log(response);

    return aiUseChatAdapter(response);
    //   const { prompt } = await req.json();
    //   const response = await fetch("https://api.openai.com/v1/chat/completions", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //     },
    //     body: JSON.stringify({

    //       })
    //     }
    //   )
};
