function getEndpoint (email) {
  const isDevelopment = !('update_url' in chrome.runtime.getManifest());

  const baseUrl = isDevelopment
    ? 'http://localhost:3000/get-retool-url'
    : 'http://localhost:3000/get-retool-url' // TODO plug in your vercel url base here

  return `${baseUrl}?email=${email}`
}
  
function fetchEmbedUrl() {
  const backendEndpoint = getEndpoint('brent@pathweaver.ai') // TODO insert user email here
  fetch(backendEndpoint)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok. Status: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data && data.embedUrl) {
        // Send the data back to the content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "embedUrlFetched", url: data.embedUrl});
        });
      } else {
        throw new Error('Invalid data received from API');
      }
    })
    .catch(error => {
      console.error('Error fetching embed URL:', error);
    })
}

