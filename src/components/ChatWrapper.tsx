"use client"

import { Message, useChat } from "ai/react"
import { Messages } from "./Messages";
import { ChatInput } from "./ChatInput";

export const ChatWrapper = ({ sessionId, initialMessages }: { sessionId: string, initialMessages: Message[] }) => {
    const { messages, handleInputChange, handleSubmit, input, setInput } = useChat({
        api: "/api/chat-stream",
        body: { sessionId },
        initialMessages
    });

    console.log(initialMessages);

    return (
        <div className="relative min-h-full bg-zinc-900 flex divided-y divided-zinc-700 flex-col justify-between gap-2  ">
            <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
                {/* {JSON.stringify(messages)} */}
                <Messages messages={messages} />
            </div>
            {/* <form onSubmit={handleSubmit}>
                <input onChange={handleInputChange}
                    value={input}
                    className="text-black"
                    // className="bg-zinc-800 text-white p-2"
                    placeholder="Type your message here..."
                    type="text" />
                    <button type="submit" className="bg-zinc-800 text-white p-2">Send</button>
            </form> */}
            <ChatInput input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} setInput={setInput}/>
        </div>
    )
}