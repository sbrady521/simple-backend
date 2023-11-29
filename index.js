//Access the URL at http://localhost:3000/get-retool-url?email=brent@pathweaver.ai
//Response will come back looking like this: {"embedUrl":"https://app.pathweaver.ai/embed-redirect?nonce=xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&destination=%2Fembedded%2Fauthed%2Fxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}
const express = require('express')
const fetch = require('node-fetch')

const app = express()
const port = process.env.PORT || 3000
require('dotenv').config()

app.use(express.json())

app.get('/get-retool-url', async (req, res) => {
  const userEmail = req.query.email; // Get email from query parameter

  if (!userEmail) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const url = 'https://app.pathweaver.ai/api/embed-url/external-user'
  const data = {
    landingPageUuid: "aa8ca8d4-8cdd-11ee-94a9-37f4d911b569",
    groupIds: [2276747],
    externalIdentifier: "brent@pathweaver.ai",
    userInfo: { "email": userEmail }
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RETOOL_ACCESS_TOKEN}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      // Forward the error status and the response body
      res.status(response.status);
      response.body.pipe(res);
    } else {
      // Stream the response body directly to the client
      response.body.pipe(res);
    }
  } catch (error) {
    // Handle network or other operational errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
