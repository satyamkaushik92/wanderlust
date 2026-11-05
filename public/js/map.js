mapboxgl.accessToken=mapToken;
 const map = new mapboxgl.Map({
       // accessToken: accessToken,
        container: 'map', // container ID
        center: [coordinates[0], coordinates[1]], // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
       });

const marker1= new mapboxgl.Marker({color:"red"})
       .setLngLat(coordinates)
       .setPopup(new mapboxgl.Popup({offset:25})
       .setHTML(`<h3>${location2}</h3><p>exact location after booking</p>`))
       .addTo(map);

        