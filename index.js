const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/get-retool-url', async (req, res) => {
    // Your logic to interact with Retool and send back the authenticated URL
    // Use environment variables for sensitive data like access tokens

    res.json({ message: "Replace this with the actual response from Retool" });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
