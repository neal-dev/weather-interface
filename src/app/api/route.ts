import axios from "axios";
import { clientType } from "@/types/api";
import { WeatherResponse } from "@/types/weather";
import { API_KEY, API_URL } from "@/config/env";
import { handleApiRequest } from "./apiRequest";

export class QueryClientAPI {
    readonly key: Record<clientType, string> ={
        getWeatherByCity: 'GET_WEATHER_BY_CITY',
        getWeatherByLatLong: 'GET_WEATHER_BY_LAT_LONG',
    }

    async getWeatherByLatLong(lat: number, lon: number): Promise<WeatherResponse>{
        const data = await handleApiRequest<any>({
            method: "GET",
            url: `${API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
            params: {
              key: API_KEY,
              lat: lat,
              lon: lon,
            },
          });
        return {
            coord: data.coord,
            weather: data.weather,
            main: data.main,
            sys: data.sys,
            name: data.name,
            timezone: data.timezone,
        }
    }
}