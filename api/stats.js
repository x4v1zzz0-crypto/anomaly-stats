import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const today = new Date().toISOString().slice(0, 10);

  const total = await kv.get("total_exec") || 0;
  const todayExec = await kv.get(`daily_exec:${today}`) || 0;
  const live = await kv.get("live_users") || 0;

  res.status(200).json({
    total,
    today: todayExec,
    live
  });
}
