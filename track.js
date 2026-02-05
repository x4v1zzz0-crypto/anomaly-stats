import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { event, user } = req.body;
  const today = new Date().toISOString().slice(0, 10);

  
  if (event === "start") {
    await kv.incr("total_exec");
    await kv.incr(`daily_exec:${today}`);
    await kv.incr("live_users");
  }

  
  if (event === "leave") {
    await kv.decr("live_users");
  }

  return res.status(200).json({ ok: true });
}
