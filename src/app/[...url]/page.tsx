import { ChatWrapper } from '@/components/ChatWrapper';
import { ragChat } from '@/lib/rag-chat';
import { redis } from '@/lib/redis';
import { cookies } from 'next/headers';


interface PageProps {
    params: {
        url: string | string[] | undefined; // this is an array of strings
    }
}

function reconstructUrl({ url }: { url: string[] }) {
    const decodedComponents = url.map((component) => decodeURIComponent(component));
    return decodedComponents.join('/');
}

const Page = async ({ params }: PageProps) => {
    const sessionCookie = cookies().get('sessionId')?.value;
    const reconstructedUrl = reconstructUrl({ url: params.url as string[] });
    console.log(params.url)

    const sessionId = (reconstructUrl + "--" + sessionCookie).replace(/\//g, "");
    const isAlreadyIndexed = await redis.sismember('indexed_urls', reconstructedUrl);
    console.log("isAlreadyIndexed", isAlreadyIndexed);

    // const sessionId = "mock-session"
    // const sessionId = await ragChat.context.createSession();
    // const sessionId = await ragChat.context.createSession(reconstructedUrl);
    // const sessionId = cookies().get('sessionId')?.value || await ragChat.context.createSession(reconstructedUrl);

    const initialMessages = await ragChat.history.getMessages({ amount: 10, sessionId });
    
    if (!isAlreadyIndexed) {
        await ragChat.context.add({
            type: 'html',
            source: reconstructedUrl,
            config: { chunkOverlap: 50, chunkSize: 200 },
        });

        await redis.sadd('indexed_urls', reconstructedUrl);
    }

    return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
}

export default Page