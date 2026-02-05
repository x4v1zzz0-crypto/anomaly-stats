async function update() {
  const r = await fetch("/api/stats")
  const d = await r.json()

  active.textContent = d.active
  today.textContent = d.today
  total.textContent = d.total
}

update()
setInterval(update, 3000)
