import OpenAI from "openai";
import {HttpsProxyAgent} from "https-proxy-agent"
import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import {checkApiLimit, increaseApiLimit} from "@/lib/api-limit";
import {checkSubscription} from "@/lib/subscription";

const agent = new HttpsProxyAgent('http://127.0.0.1:7890');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_1,
  httpAgent: agent
});

const instructionMessage = {
  role: "system",
  content: "You are a code generator.You must answer only in markdown code snippets.Use code comments for explanations"
}

export async function POST(req: Request) {
  try {
    const {userId} = auth()
    const body = await req.json()
    const {messages} = body

    if (!userId) {
      return new NextResponse("Unauthorized", {status: 401})
    }

    if (!messages) {
      return new NextResponse("Messages are required", {status: 400})
    }

    const freeTrial = await checkApiLimit()
    const isPro = await checkSubscription()

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired.", {status: 403})
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages]
    })

    if (!isPro) {
      await increaseApiLimit()
    }

    return NextResponse.json(response.choices[0].message)

  } catch (error) {
    console.log("[CODE_ERROR]", error)
    return new NextResponse("Internet error", {status: 500})
  }
}
