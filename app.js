const url = "https://api.wheretheiss.at/v1/satellites/25544"
const mapEl = document.querySelector("#map")
let map = L.map("map").setView([0, 0], 3)
let marker = L.marker([0, 0]).addTo(map)
const latEl = document.querySelector("#lat")
const longEl = document.querySelector("#long")
const altiEl = document.querySelector("#alti")
const veloEl = document.querySelector("#velo")
L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
            "pk.eyJ1IjoidW5hbHVzdGsiLCJhIjoiY2t6ZnR6MTJqMngwYjJybjl2emZ6b2JlMiJ9.weKWeraLf7pYkQU1i5kFqA",
    }
).addTo(map)

async function getLocation() {
    const response = await fetch(url)
    const data = await response.json()
    latitude = data.latitude
    longitude = data.longitude
    latEl.textContent = `Latitude: ${latitude}`
    longEl.textContent = `Longitude: ${longitude}`
    altiEl.textContent = `Altitude: ${data.altitude} KM`
    veloEl.textContent = `Velocity: ${data.velocity} KM/H`

    marker.setLatLng([latitude, longitude])
    map.setView([latitude, longitude], 3)
    console.log(latitude, longitude)
}

getLocation()
setInterval(getLocation, 1000)
