const express = require('express')
const fetch = require('node-fetch')

const app = express()
const port = process.env.PORT || 3000
require('dotenv').config()

app.use(express.json())

app.get('/get-retool-url', async (req, res) => {
  const url = 'https://app.pathweaver.ai/api/embed-url/external-user'
  const data = {
    // Your POST data here as per https://docs.retool.com/apps/external/quickstarts/embed
    "landingPageUuid": "aa8ca8d4-8cdd-11ee-94a9-37f4d911b569",
    "groupIds": "2276747",
    "externalIdentifier": "brent@pathweaver.ai",
    "userInfo": {
      "email": "brent@pathweaver.ai"
    }
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.RETOOL_ACCESS_TOKEN}`
    },
    body: JSON.stringify(data)
  })

  const result = await response.join()
  console.log(result)


  res.json({ message: "Replace this with the actual response from Retool" })
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
