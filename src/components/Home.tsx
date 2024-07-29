"use client";

import useWeatherAndAirQualityData from "@/hooks/useWeatherAndAirQualityData";

import { AirQuality } from "./AirQuality";
import { Loading } from "./Loading";
import { Now } from "./Now";
import { SunTime } from "./SunTime";
import { WeekWeather } from "./WeekWeather";
import { ErrorIcon } from "./Error";
import { Center, Grid, GridItem } from "@chakra-ui/react";

export function HomePage() {
  const { weatherData, airQualityData, loading, error } =
    useWeatherAndAirQualityData();

  if (loading) return <Loading />;

  if (error) return <ErrorIcon />;

  return (
    <Center
      p={[6, 12]}
      justifyContent="center"
      minHeight={["auto", "100vh"]}
      w="full"
      bg={
        'linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url("/clouds.svg")'
      }
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
    >
      <Grid
        templateRows={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
        templateColumns={"repeat(7, 1fr)"}
        gap={6}
      >
        <GridItem colSpan={[7, 3]} rowSpan={[1, 2]} rounded="xl">
          <Now data={weatherData} />
        </GridItem>
        <GridItem colSpan={[7, 2]} rowSpan={1}>
          <AirQuality data={airQualityData} />
        </GridItem>
        <GridItem colSpan={[7, 2]} rowSpan={1}>
          <SunTime
            sunrise={weatherData?.daily.sunrise}
            sunset={weatherData?.daily.sunset}
          />
        </GridItem>
        <GridItem colSpan={[7, 4]} rowSpan={1}>
          <WeekWeather data={weatherData} />
        </GridItem>
      </Grid>
    </Center>
  );
}
