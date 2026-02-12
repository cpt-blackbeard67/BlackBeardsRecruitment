import type { VercelRequest, VercelResponse } from "@vercel/node";

interface Body {
  message1: string;
  message2: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message1, message2 } = req.body as Body;

    if (!message1 || !message2) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const payload = {
      content: `**Message 1:** ${message1}\n**Message 2:** ${message2}`
    };

    const response = await fetch(
      process.env.DISCORD_WEBHOOK_URL as string,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      throw new Error("Discord webhook failed");
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
