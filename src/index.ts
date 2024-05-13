import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()
const FILE_URL = "http://minio-bc8ksck.87.242.117.226.sslip.io/moonspaceshipapp/levels.json"

app.get('/', async (c) => {
  const res =  await fetch(FILE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await res.json()
  return c.json(data)
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
