import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, contactMessagesTable } from "@workspace/db";
import { SubmitContactBody, ListContactsResponseItem } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [message] = await db
    .insert(contactMessagesTable)
    .values(parsed.data)
    .returning();

  res.status(201).json(ListContactsResponseItem.parse(message));
});

router.get("/contact", async (_req, res): Promise<void> => {
  const messages = await db
    .select()
    .from(contactMessagesTable)
    .orderBy(desc(contactMessagesTable.createdAt));

  res.json(messages.map((m) => ListContactsResponseItem.parse(m)));
});

export default router;
