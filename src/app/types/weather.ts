export type WeatherResponse = {
  coord: {
    lat: number;
    lon: number;
  };
  weather: WeatherLocation;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  timezone: number;
};

export type WeatherQuery = {
  location: string;
  date: string;
};

export type WeatherLocation = [
  {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
];
