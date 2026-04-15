import { Router, type IRouter } from "express";
import { SendChatMessageBody } from "@workspace/api-zod";

const FAQ_RESPONSES: Record<string, string> = {
  services:
    "We offer Full Stack Development, AI Chatbots, Payment Integration, and AI Search Systems. Each service is tailored to your business needs.",
  pricing:
    "Our pricing depends on the scope of your project. Contact us through the form on our website and we'll provide a detailed quote within 24 hours.",
  contact:
    "You can reach us through the contact form on this page. Fill in your name, email, and message, and our team will get back to you promptly.",
  timeline:
    "Project timelines vary based on complexity. A typical MVP takes 4-8 weeks, while more complex solutions may take 3-6 months.",
  technology:
    "We work with modern tech stacks including React, Node.js, Python, and cloud platforms like AWS and GCP. We choose the best tools for each project.",
  ai: "Our AI solutions include custom chatbots, intelligent search systems, and machine learning integrations that help automate and enhance your business processes.",
  payment:
    "We integrate payment systems like Stripe, PayPal, and custom payment gateways to help you accept payments securely and efficiently.",
  development:
    "Our full stack development covers everything from frontend interfaces to backend APIs, databases, and cloud infrastructure.",
};

function getFaqResponse(message: string): string {
  const lower = message.toLowerCase();

  for (const [keyword, response] of Object.entries(FAQ_RESPONSES)) {
    if (lower.includes(keyword)) {
      return response;
    }
  }

  if (
    lower.includes("hello") ||
    lower.includes("hi") ||
    lower.includes("hey")
  ) {
    return "Hello! Welcome to NexaTech Solutions. How can I help you today? You can ask about our services, pricing, timelines, or technology stack.";
  }

  if (lower.includes("help")) {
    return "I can help you with information about our services (Full Stack Development, AI Chatbots, Payment Integration, AI Search Systems), pricing, project timelines, and how to get in touch with our team.";
  }

  return "Thanks for your message! I can help with questions about our services, pricing, timelines, and technology. For specific project inquiries, please use the contact form and our team will respond within 24 hours.";
}

const router: IRouter = Router();

router.post("/chat", async (req, res): Promise<void> => {
  const parsed = SendChatMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const reply = getFaqResponse(parsed.data.message);
  res.json({ reply });
});

export default router;
