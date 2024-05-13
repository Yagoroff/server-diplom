import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from 'dotenv'

dotenv.config({
  path: '.env',
})

const app = new Hono()

app.get('/', async (c) => {
  if (!process.env.FILE_URL) {
    return c.text('FILE_URL is not defined')
  }
  const res =  await fetch(process.env.FILE_URL, {
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
