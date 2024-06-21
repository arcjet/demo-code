import { OpenAI } from "openai";
import arcjet, { detectBot, tokenBucket } from "@arcjet/next";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    tokenBucket({
      mode: "LIVE",
      capacity: 10,
      interval: 60,
      refillRate: 10,
    }),
    detectBot({
      mode: "LIVE",
      block: ["AUTOMATED"],
    }),
  ],
});

export default async function handler(req, res) {
  const decision = await aj.protect(req, { requested: 1 });

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return res.status(429).json({
        error:
          "You have been rate limited. Please try talking more slowly. Merlin's hearing isn't what it used to be.",
      });
    } else if (decision.reason.isBot()) {
      return res.status(403).json({
        error:
          "You are a bot. I am a bot. Together, we create viscious circles.",
      });
    }
  }

  const { message, conversation } = req.body;

  // Build a conversation string from the conversation array so OpenAI has a context
  let conversationString =
    `You are a wizard called "Merlin". You don't provide any heavy computing. ` +
    `If you are asked to do something mathematically intense, tell the other person that ` +
    `wizards are a particularly lazy creatures, and suggest another creature who might be ` +
    `able to help. The creature changes everytime you are asked. Occasionally, at random, ` +
    `you will offer to share your hair care routine. From now on, any person named "You" ` +
    `is actually the person you're talking to.\n\n`;
  for (const sentence of conversation) {
    // Only include user messages in the conversation string
    if (sentence.user !== "System")
      conversationString += `${sentence.user}: ${sentence.text}\n\n`;
  }
  conversationString += "You: " + message;

  // Send the conversation to OpenAI
  const response = await openai.chat.completions
    .create({
      messages: [{ role: "user", content: conversationString }],
      model: "gpt-4o",
    })
    .asResponse();
  const data = await response.json();

  // Merlin likes to reply with his name, so we'll remove that
  const messageContent = data.choices[0].message.content
    .replace("Merlin:", "")
    .trim();

  res.json({ message: messageContent });
}
