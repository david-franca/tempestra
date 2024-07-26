export interface WeatherData {
  current: {
    time: Date;
    temperature2m: string;
    relativeHumidity2m: number;
    precipitation: number;
    weatherCode: number;
    windSpeed10m: string;
    isDay: boolean;
  };
  daily: {
    time: Date[];
    weatherCode: Float32Array;
    temperature2mMax: Float32Array;
    temperature2mMin: Float32Array;
    sunrise: number;
    sunset: number;
  };
}

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
