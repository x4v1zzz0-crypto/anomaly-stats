let stats = {
  total: 0,
  today: 0,
  active: 0,
  lastDay: new Date().toDateString()
}

export default function handler(req, res) {
  const today = new Date().toDateString()

  if (stats.lastDay !== today) {
    stats.today = 0
    stats.lastDay = today
  }

  if (req.method === "POST") {
    const { action } = req.body || {}

    if (action === "start") {
      stats.total++
      stats.today++
      stats.active++
    }

    if (action === "stop") {
      stats.active = Math.max(0, stats.active - 1)
    }

    return res.json(stats)
  }

  res.json(stats)
}
