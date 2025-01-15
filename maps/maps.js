const APIKEY = "M8OdBz6KyS2ia51SAH3Jzw1ugLXu0z6A9-ozwrU7TG8";

export let data;
var platform = new H.service.Platform({
    apikey: APIKEY
});
var defaultLayers = platform.createDefaultLayers();

// Step 2: initialize a map - this map is centered over Europe
var map = new H.Map(document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map, {
    center: { lat: 11.48920, lng: 75.74084 },
    zoom: 10,
    pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());
// Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

const searchOne = document.querySelector("#search1");
const searchTwo = document.querySelector("#search2");

let markerOne = [false, 0];
let markerTwo = [false, 0];

let originCoordinates = 0;
let destinationCoordinates = 0;


searchOne.addEventListener("keyup", (e) => {
    console.log(searchOne.value);
    autosuggest(e, 'origin');
});

searchTwo.addEventListener("keyup", (e) => {
    autosuggest(e, 'destination');
});

const autosuggest = (e, location) => {
    if (e.metaKey) {
        return;
    }
    let searchString = e.target.value;
    if (searchString != "") {
        fetch(`https://autosuggest.search.hereapi.com/v1/autosuggest?apiKey=${APIKEY}&at=33.738045,73.084488&limit=5&resultType=city&q=${searchString}&lang=en-US`)
        .then(res => res.json())
        .then((json) => {
            if (json.length != 0) {
                document.getElementById("list").innerHTML = ``;
                console.log('location = ', location);
                json.items.forEach((item) => {

                    if (location === 'origin') {
                        if (item.position) {
                            document.getElementById("list").innerHTML += `<li onClick="addMarkerOneToMap(${item.position.lat},${item.position.lng},'${item.title}')">${item.title}</li>`;
                        }
                    } else {
                        if (item.position) {
                            document.getElementById("list").innerHTML += `<li onClick="addMarkerTwoToMap(${item.position.lat},${item.position.lng},'${item.title}')">${item.title}</li>`;
                        }
                    }
                });
            }
        });
    }
};

// to get default location
function getDefaultLocation() {
    var lat = 52.5159;
    var lng = 13.3777;
    var title = "Berlin, Germany";
    addMarkerToMap(lat, lng, title);
}

const addMarkerOneToMap = (lat, lng, title) => {
    if (markerOne[0]) {
        map.removeObject(markerOne[1]);
    }
    console.log(map.getObjects(), 'one');
    document.getElementById("search1").value = title;
    var selectedLocationMarker = new H.map.Marker({ lat, lng });
    map.addObject(selectedLocationMarker);
    markerOne = [true, selectedLocationMarker];

    document.getElementById("list").innerHTML = ``;
    map.setCenter({ lat, lng }, true);
    originCoordinates = `${lat},${lng}`;
};

const addMarkerTwoToMap = (lat, lng, title) => {
    if (markerTwo[0]) {
        map.removeObject(markerTwo[1]);
    }
    console.log(map.getObjects(), 'two');
    document.getElementById("search2").value = title;
    var selectedLocationMarker = new H.map.Marker({ lat, lng });
    map.addObject(selectedLocationMarker);
    markerTwo = [true, selectedLocationMarker];
    document.getElementById("list").innerHTML = ``;
    map.setCenter({ lat, lng }, true);
    destinationCoordinates = `${lat},${lng}`;
};

function calculateRouteFromAtoB(originCo, destinationCo, platform) {
    var router = platform.getRoutingService(null, 8),
        routeRequestParams = {
            routingMode: 'fast',
            transportMode: 'car',
            origin: originCo,
            destination: destinationCo,
            return: 'polyline,turnByTurnActions,actions,instructions,travelSummary'
        };

    router.calculateRoute(
        routeRequestParams,
        onSuccess,
        onError
    );
}

function onSuccess(result) {
    var route = result.routes[0];

    /*
     * The styling of the route response on the map is entirely under the developer's control.
     * A representative styling can be found the full JS + HTML code of this example
     * in the functions below:
     */
    addRouteShapeToMap(route);
    addManueversToMap(route);
    // addWaypointsToPanel(route);
    // addManueversToPanel(route);
    // addSummaryToPanel(route);
    // ... etc.
}

function onError(error) {
    alert('Can\'t reach the remote server');
}

function addRouteShapeToMap(route) {
    route.sections.forEach((section) => {
        // decode LineString from the flexible polyline
        let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

        // Create a polyline to display the route:
        let polyline = new H.map.Polyline(linestring, {
            style: {
                lineWidth: 4,
                strokeColor: 'rgba(0, 128, 255, 0.7)'
            }
        });

        // Add the polyline to the map
        map.addObject(polyline);
        // And zoom to its bounding rectangle
        map.getViewModel().setLookAtData({
            bounds: polyline.getBoundingBox()
        });
    });
}

function addManueversToMap(route) {
    var svgMarkup = '<svg width="18" height="18" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<circle cx="8" cy="8" r="8" ' +
        'fill="#1b468d" stroke="white" stroke-width="1" />' +
        '</svg>',
        dotIcon = new H.map.Icon(svgMarkup, { anchor: { x: 8, y: 8 } }),
        group = new H.map.Group(),
        i,
        j;

    route.sections.forEach((section) => {
        let poly = H.geo.LineString.fromFlexiblePolyline(section.polyline).getLatLngAltArray();

        let actions = section.actions;
        // Add a marker for each maneuver
        for (i = 0; i < actions.length; i += 1) {
            let action = actions[i];
            var marker = new H.map.Marker({
                lat: poly[action.offset * 3],
                lng: poly[action.offset * 3 + 1]
            },
                { icon: dotIcon });
            marker.instruction = action.instruction;
            group.addObject(marker);
        }

        group.addEventListener('tap', function (evt) {
            map.setCenter(evt.target.getGeometry());
            openBubble(evt.target.getGeometry(), evt.target.instruction);
        }, false);

        // Add the maneuvers group to the map
        map.addObject(group);
    });
}

function addWaypointsToPanel(route) {
    var nodeH3 = document.createElement('h3'),
        labels = [];

    route.sections.forEach((section) => {
        labels.push(
            section.turnByTurnActions[0].nextRoad.name[0].value)
        labels.push(
            section.turnByTurnActions[section.turnByTurnActions.length - 1].currentRoad.name[0].value)
    });

    nodeH3.textContent = labels.join(' - ');
    // routeInstructionsContainer.innerHTML = '';
    // routeInstructionsContainer.appendChild(nodeH3);
}




const calculateButton = document.querySelector(".calculate-button");

calculateButton.addEventListener("click", (e) => {
    e.preventDefault();
    calculateRouteFromAtoB(originCoordinates, destinationCoordinates, platform);

    let dis=distanceCalculate();
    let fair=calculateFair(dis);
    let data=fullData(document.getElementById("search1").value,document.getElementById("search2").value,fair);


});




function distanceCalculate(){
    console.log('maps.js loaded');
const url = `https://router.hereapi.com/v8/routes?transportMode=bus&origin=${originCoordinates}&destination=${destinationCoordinates}&return=summary&apiKey=${APIKEY}`;

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

  console.log('maps.js loaded');

  return data['routes'][0]['sections'][0]['summary']['length']/1000;

}


function calculateFair(distance){
    return (distance-2)*2 + 10;
}

function fullData(origin,destination,fair){
    return {
        origin: origin,
        destination: destination,
        fair: fair
    }
}


function showGeoJSONData(map) {
    // Create GeoJSON reader which will download the specified file.
    // Shape of the file was obtained by using HERE Geocoding and Search API.
    // It is possible to customize look and feel of the objects.
    var reader = new H.data.geojson.Reader(
      "kozhikode.json",
      {
        // This function is called each time parser detects a new map object
        style: function (mapObject) {
          // Parsed geo objects could be styled using setStyle method
          if (mapObject instanceof H.map.Polygon) {
            mapObject.setStyle({
              fillColor: "rgba(255, 0, 0, 0.5)",
              strokeColor: "rgba(0, 0, 255, 0.2)",
              lineWidth: 3,
            });
          }
        },
      }
    );
  
    // Start parsing the file
    reader.parse();
  
    // Add layer which shows GeoJSON data on the map
    map.addLayer(reader.getLayer());
  }

    showGeoJSONData(map);   


