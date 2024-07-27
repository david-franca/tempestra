import { WeatherData as W } from "@atombrenner/openmeteo";

export interface AirQualityData {
  current: {
    time: Date;
    usAqi: number;
    pm10: number;
    pm25: number;
    carbonMonoxide: number;
    nitrogenDioxide: number;
    sulphurDioxide: number;
    ozone: number;
  };
}

export interface GeolocationData {
  results: Result[];
  generationtime_ms: number;
}

export interface Result {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  timezone: string;
  population?: number;
  country_id: number;
  country: string;
  admin1_id?: number;
  admin2_id?: number;
  admin3_id?: number;
  admin1?: string;
  admin2?: string;
  admin3?: string;
}

export type WeatherData = W<
  never,
  | "weather_code"
  | "temperature_2m_max"
  | "temperature_2m_min"
  | "sunrise"
  | "sunset",
  | "temperature_2m"
  | "relative_humidity_2m"
  | "weather_code"
  | "wind_speed_10m"
  | "is_day"
  | "precipitation"
>;
