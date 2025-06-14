
	mapboxgl.accessToken = 'pk.eyJ1IjoiYW51NTQ1IiwiYSI6ImNtOTVlNHNlODB2c3UycnIwamJoYzVnMXoifQ.Y-Gv4KgLwW8Iy2gnSe8fGQ';
    
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

    
     const marker = new mapboxgl.Marker({ color: 'red'})
     .setLngLat(listing.geometry.coordinates) //Listing.geometry.coordinates
     .setPopup( new mapboxgl.Popup({offset: 25})
     .setHTML(
        `<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`
    )
)
     .addTo(map);