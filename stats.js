import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const total = parseInt(await kv.get("total") || 0);
  const today = parseInt(await kv.get("today") || 0);
  const permanent = parseInt(await kv.get("permanentTotal") || 0);
  const live = ((await kv.get("liveUsers")) || []).length;

  res.status(200).json({ total, today, permanent, live });
}
