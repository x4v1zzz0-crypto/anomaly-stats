hereimport { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { event, user } = req.body;

  // obtener usuarios live actuales
  let liveUsers = (await kv.get("liveUsers")) || [];

  if (event === "start") {
    // incrementar totales
    const total = parseInt(await kv.get("total") || 0) + 1;
    const today = parseInt(await kv.get("today") || 0) + 1;
    await kv.set("total", total);
    await kv.set("today", today);

    // agregar a live
    if (!liveUsers.includes(user)) liveUsers.push(user);
    await kv.set("liveUsers", liveUsers);

    return res.status(200).json({ ok: true });
  }

  if (event === "leave") {
    // remover de live
    liveUsers = liveUsers.filter(u => u !== user);
    await kv.set("liveUsers", liveUsers);
    return res.status(200).json
