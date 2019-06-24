const { LiveApi } = require('telldus-api')
require('dotenv').config()

const key = process.env.key
const secret = process.env.secret
const tokenKey = process.env.tokenKey
const tokenSecret = process.env.tokenSecret

const args = process.argv.slice(2)

  ; (async () => {
  const api = new LiveApi({
    key: key, // publicKey
    secret: secret, // privateKey
    tokenKey: tokenKey, // token
    tokenSecret: tokenSecret // tokenSecret
  })

  const devices = await api.listDevices()

  let ids

  if (args[0] === 'on') {
    console.log('Turning the lights on')
    ids = devices.map(x => api.onOffDevice(x.id, 'On'))
  } else if (args[0] === 'off') {
    console.log('Turning the lights off')
    ids = devices.map(x => api.onOffDevice(x.id, null))
  } else {
    console.log('Switching the lights')
    ids = devices.map(x => api.onOffDevice(x.id, x.state === 2 ? 'On' : null))
  }

  await Promise.all(ids)
})()
