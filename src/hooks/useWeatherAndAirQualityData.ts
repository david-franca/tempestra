// useWeatherData.ts
import { useState, useEffect } from "react";
import { fetchWeatherApi } from "openmeteo";
import { AirQualityData, WeatherData } from "@/types";
import { useSelectedItem } from "@/context/SelectedItemContext";

const useWeatherData = () => {
  const { selectedItem } = useSelectedItem();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const latitude = selectedItem?.latitude ?? "0.00";
    const longitude = selectedItem?.longitude ?? "0.00";

    const fetchWeather = async () => {
      try {
        const params = {
          latitude,
          longitude,
          timezone: "America/Sao_Paulo",
          current: [
            "temperature_2m",
            "relative_humidity_2m",
            "precipitation_probability",
            "weather_code",
            "wind_speed_10m",
            "is_day",
          ],
          daily: [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "sunrise",
            "sunset",
          ],
          forecast_days: 8,
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];

        const utcOffsetSeconds = response.utcOffsetSeconds();
        const current = response.current()!;
        const daily = response.daily()!;

        const range = (start: number, stop: number, step: number): number[] => {
          const length = Math.ceil((stop - start) / step); // Use Math.ceil to ensure we cover the entire range
          const result: number[] = [];

          for (let i = 0; i < length; i++) {
            result.push(start + i * step);
          }

          return result;
        };

        const weatherData: WeatherData = {
          current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0)!.value().toFixed(1),
            relativeHumidity2m: current.variables(1)!.value(),
            precipitation: current.variables(2)!.value(),
            weatherCode: current.variables(3)!.value(),
            windSpeed10m: current.variables(4)!.value().toFixed(1),
            isDay: current.variables(5)!.value() === 1,
          },
          daily: {
            time: range(
              Number(daily.time()),
              Number(daily.timeEnd()),
              daily.interval()
            ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
            weatherCode: daily.variables(0)!.valuesArray()!,
            temperature2mMax: daily.variables(1)!.valuesArray()!,
            temperature2mMin: daily.variables(2)!.valuesArray()!,
            sunrise: daily.variables(3)!.values(0)!,
            sunset: daily.variables(4)!.values(0)!,
          },
        };

        console.log(weatherData);

        setWeatherData(weatherData);
      } catch (error) {
        setError("Failed to fetch weather data");
      }
    };

    const fetchAirQuality = async () => {
      try {
        const params = {
          latitude,
          longitude,
          current: [
            "us_aqi",
            "pm10",
            "pm2_5",
            "carbon_monoxide",
            "nitrogen_dioxide",
            "sulphur_dioxide",
            "ozone",
          ],
        };
        const url = "https://air-quality-api.open-meteo.com/v1/air-quality";
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];

        const utcOffsetSeconds = response.utcOffsetSeconds();
        const current = response.current()!;

        const airQualityData: AirQualityData = {
          current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            usAqi: current.variables(0)!.value(),
            pm10: current.variables(1)!.value(),
            pm25: current.variables(2)!.value(),
            carbonMonoxide: current.variables(3)!.value(),
            nitrogenDioxide: current.variables(4)!.value(),
            sulphurDioxide: current.variables(5)!.value(),
            ozone: current.variables(6)!.value(),
          },
        };

        setAirQualityData(airQualityData);
      } catch (error) {
        setError("Failed to fetch air quality data");
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchWeather(), fetchAirQuality()]);
      setLoading(false);
    };

    fetchData();
  }, [selectedItem]);

  return { weatherData, airQualityData, loading, error };
};

export default useWeatherData;
