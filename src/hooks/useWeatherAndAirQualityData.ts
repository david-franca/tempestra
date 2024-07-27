// useWeatherData.ts
import { useState, useEffect } from "react";
import { fetchWeatherApi } from "openmeteo";
import { AirQualityData, Weather } from "@/types";
import { useSelectedItem } from "@/context/SelectedItemContext";
import { fetchWeatherData } from "@atombrenner/openmeteo";

const useWeatherData = () => {
  const { selectedItem } = useSelectedItem();
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const latitude = selectedItem?.latitude ?? 0;
    const longitude = selectedItem?.longitude ?? 0;

    const fetchWeather = async () => {
      try {
        const data = await fetchWeatherData({
          latitude,
          longitude,
          timezone: "America/Sao_Paulo",
          current: [
            "temperature_2m",
            "relative_humidity_2m",
            "weather_code",
            "wind_speed_10m",
            "is_day",
            "precipitation",
          ],
          daily: [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "sunrise",
            "sunset",
          ],
        });

        setWeatherData(data);
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
