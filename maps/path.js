// URL of the API endpoint
let origin = '11.13522,76.18566';
let destination = '11.24801,75.83367';
let YOUR_API_KEY = 'M8OdBz6KyS2ia51SAH3Jzw1ugLXu0z6A9-ozwrU7TG8'; 

const url = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${origin}&destination=${destination}&return=summary&apiKey=${YOUR_API_KEY}`;

// Send GET request
fetch(url)
  .then(response => {
    // Check if the response is OK (status code 200)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the response as JSON
    return response.json();
  })
  .then(data => {
    // Handle the parsed data
    console.log(data['routes'][0]['sections'][0]['summary']); // This will log the JSON response
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('There was a problem with the fetch operation:', error);
  });



  