import { LatLng } from "leaflet"

export type clientType = 'getWeatherByCity' | 'getWeatherByLatLong'

export type WeatherRequest = {
   latlong: LatLng
}