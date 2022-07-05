import axios from 'axios'
export const tomtomService = {
   getRoute
}
const BASE_URL = 'https://api.tomtom.com';
const api_key = 'CwOxz0AKMMH52aKvTIQF6kKooGOTwlsj'

async function getRoute(locations) {
   let strLocations = `${locations[0].lat},${locations[0].lon}:${locations[1].lat},${locations[1].lon}`
   return await axios.get(`${BASE_URL}/routing/1/calculateRoute/${strLocations}/json?routeRepresentation=polyline&avoid=unpavedRoads&travelMode=pedestrian&key=${api_key}`)
}