import axios from 'axios'
export const tomtomService = {
   getRoute
}
//const tomtomUrl = https://api.tomtom.com/routing/1/calculateRoute/32.6975621,35.1589051:34.6975621,39.1589051/json?routeRepresentation=polyline&avoid=unpavedRoads&travelMode=car&key=CwOxz0AKMMH52aKvTIQF6kKooGOTwlsj

const BASE_URL = 'https://api.tomtom.com';
const api_key = 'CwOxz0AKMMH52aKvTIQF6kKooGOTwlsj'
// const url = `${BASE_URL}/routing/1/calculateRoute/${locations}/json?routeRepresentation=polyline&avoid=unpavedRoads`;
//location : `${curr.lat},``${curr.lon}:${curr.lat},``${curr.lon}:`;
// 'dgrd'+'thfthf'+'grddr'+apikey
async function getRoute(locations) {
   let strLocations = `${locations[0].lat},${locations[0].lon}:${locations[1].lat},${locations[1].lon}`
   console.log({ strLocations, BASE_URL });
   // return fetch(`${BASE_URL}/routing/1/calculateRoute/${strLocations}/json?routeRepresentation=polyline&avoid=unpavedRoads&travelMode=car&key=${api_key}`, {
   //    method: 'GET',
   //    headers: new Headers({
   //       'Content-type': 'application/json; charset=UTF-8',
   //       'Accept': 'application/json; charset-UTF-8'
   //    })
   // }).then(response => response).then(data => {
   //    console.log({ data });
   //    // data.json()
   //    return data.json()
   // })

   return await axios.get(`${BASE_URL}/routing/1/calculateRoute/${strLocations}/json?routeRepresentation=polyline&avoid=unpavedRoads&travelMode=pedestrian&key=${api_key}`)
}
