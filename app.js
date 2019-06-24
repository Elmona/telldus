const { LiveApi } = require('telldus-api')
require('dotenv').config()

const key = process.env.key
const secret = process.env.secret
const tokenKey = process.env.tokenKey
const tokenSecret = process.env.tokenSecret

  ; (async () => {
  const api = new LiveApi({
    key: key, // publicKey
    secret: secret, // privateKey
    tokenKey: tokenKey, // token
    tokenSecret: tokenSecret // tokenSecret
  })

  const devices = await api.listDevices()
  // console.log(devices);

  const ids = devices.map(x => api.onOffDevice(x.id, x.state === 2 ? 'On' : null))

  await Promise.all(ids)
  // console.log(result)
})()
