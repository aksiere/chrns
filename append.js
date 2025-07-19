import { appendFile, readFile } from 'fs/promises'

const file = await readFile('src/lib/cron/index.js', 'utf8')
await appendFile('.cloudflare/worker.js', file, 'utf8')
