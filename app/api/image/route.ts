import OpenAI from "openai";
import {HttpsProxyAgent} from "https-proxy-agent"
import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import {checkApiLimit, increaseApiLimit} from "@/lib/api-limit";
import {checkSubscription} from "@/lib/subscription";

const agent = new HttpsProxyAgent('http://127.0.0.1:7890');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_1,
  httpAgent: process.env.NODE_ENV === "development" ? agent : null
});

export async function POST(req: Request) {
  try {
    const {userId} = auth()
    const body = await req.json()
    const {prompt, amount = 1, resolution = "512x512"} = body

    if (!userId) {
      return new NextResponse("Unauthorized", {status: 401})
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", {status: 400})
    }

    const freeTrial = await checkApiLimit()
    const isPro = await checkSubscription()

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired.", {status: 403})
    }

    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt,
      n: parseInt(amount, 10),
      size: resolution
    })

    if (!isPro) {
      await increaseApiLimit()
    }

    return NextResponse.json(response.data)

  } catch (error) {
    console.log("[CODE_ERROR]", error)
    return new NextResponse("Internet error", {status: 500})
  }
}
