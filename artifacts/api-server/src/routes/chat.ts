import { Router, type IRouter } from "express";
import { SendChatMessageBody } from "@workspace/api-zod";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

const SYSTEM_PROMPT = `You are an intelligent assistant for 21st DreamDev — a premium IT company that builds AI-powered software, full-stack applications, payment systems, and AI search solutions for startups and enterprises.

Your role is to help website visitors learn about the company's services, pricing, process, and how to get started. Be helpful, concise, and professional — like a knowledgeable member of the team.

Key services offered:
1. Full Stack Development — React, Node.js, TypeScript, cloud infrastructure
2. AI Chatbots — Custom GPT-powered assistants, NLP integrations
3. Payment Integration — Stripe, PayPal, custom payment gateways, subscriptions
4. AI Search Systems — Semantic search, vector databases, intelligent retrieval

Process: Discovery → Design → Build → Launch → Support

Typical timeline: MVPs take 4-8 weeks; complex systems 3-6 months.

For specific project inquiries and custom pricing, direct them to the contact form on the page.

Keep responses brief and direct. Answer in 1-4 sentences unless the question requires more detail. Do not use markdown bullet points or headers — respond in plain conversational text.`;

router.post("/chat", async (req, res): Promise<void> => {
  const parsed = SendChatMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const stream = await openai.chat.completions.create({
    model: "gpt-5.2",
    max_completion_tokens: 8192,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: parsed.data.message },
    ],
    stream: true,
  });

  let fullReply = "";

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      fullReply += content;
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }
  }

  res.write(`data: ${JSON.stringify({ done: true, reply: fullReply })}\n\n`);
  res.end();
});

export default router;
