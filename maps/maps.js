const APIKEY = "SR3I-XNfyAH1yj8UUqTwRmTYnbQ3OcdneeS65kpvPEw";
            var platform = new H.service.Platform({
                apikey: APIKEY
            });
            var defaultLayers = platform.createDefaultLayers();

            //Step 2: initialize a map - this map is centered over Europe
            var map = new H.Map(document.getElementById('mapContainer'),
                defaultLayers.vector.normal.map, {
                center: { lat: 50, lng: 5 },
                zoom: 4,
                pixelRatio: window.devicePixelRatio || 1
            });
            // add a resize listener to make sure that the map occupies the whole container
            window.addEventListener('resize', () => map.getViewPort().resize());
            //Step 3: make the map interactive
            // MapEvents enables the event system
            // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
            var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
            const autosuggest = (e) => {
    if(event.metaKey) {
        return
    } 
    let searchString = e.value
    if (searchString != "") {
        fetch(`https://autosuggest.search.hereapi.com/v1/autosuggest?apiKey=${APIKEY}&at=33.738045,73.084488&limit=5&resultType=city&q=${searchString}&lang=en-US`)
        .then(res => res.json())
        .then((json) => {
        if (json.length != 0) {
            document.getElementById("list").innerHTML = ``;
            let dropData = json.items.map((item) => {
            if ((item.position != undefined) & (item.position != ""))
                document.getElementById("list").innerHTML += `<li onClick="addMarkerToMap(${item.position.lat},${item.position.lng})">${item.title}</li>`;
            });
        }
        });
    }
    };
      // to get deafult location
  function getDeafultLocation(){
      var lat=52.5159;
      var lng=13.3777;
      var title = "Berlin, Germany";
      addMarkerToMap(lat, lng, title);
  }
  const addMarkerToMap = (lat, lng, title) => {
      map.removeObjects(map.getObjects())
      document.getElementById("search").value =  title;
      var selectedLocationMarker = new H.map.Marker({ lat, lng });
      map.addObject(selectedLocationMarker);
      document.getElementById("list").innerHTML = ``;
      map.setCenter({ lat, lng }, true); 
  };