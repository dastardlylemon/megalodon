import generator, { Entity, WebSocketInterface, ProxyConfig } from 'megalodon'

declare var process: {
  env: {
    MASTODON_ACCESS_TOKEN: string
    PROXY_HOST: string
    PROXY_PORT: number
    PROXY_PROTOCOL: 'http' | 'https' | 'socks4' | 'socks4a' | 'socks5' | 'socks5h' | 'socks'
  }
}

const BASE_URL: string = 'wss://streaming.fedibird.com'

const access_token: string = process.env.MASTODON_ACCESS_TOKEN

const proxy: ProxyConfig = {
  host: process.env.PROXY_HOST,
  port: process.env.PROXY_PORT,
  protocol: process.env.PROXY_PROTOCOL
}

const client = generator('mastodon', BASE_URL, access_token, null, proxy)

const stream: WebSocketInterface = client.userSocket()
stream.on('connect', () => {
  console.log('connect')
})

stream.on('pong', () => {
  console.log('pong')
})

stream.on('update', (status: Entity.Status) => {
  console.log(status)
})

stream.on('notification', (notification: Entity.Notification) => {
  console.log(notification)
})

stream.on('delete', (id: number) => {
  console.log(id)
})

stream.on('error', (err: Error) => {
  console.error(err)
})

stream.on('heartbeat', () => {
  console.log('thump.')
})

stream.on('close', () => {
  console.log('close')
})

stream.on('parser-error', (err: Error) => {
  console.error(err)
})
