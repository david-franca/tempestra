import { WeatherData } from "@/types";
import React from "react";
import { icons } from "./wmo";
import Image from "next/image";
import { Center, Flex, Text } from "@chakra-ui/react";

interface DayWeatherProps {
  date: number;
  tempMin: string;
  tempMax: string;
  icon: keyof typeof icons;
  isDay: boolean;
}

const getDayName = (dateString: number) => {
  const date = new Date(dateString * 1000);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Hoje";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Amanhã";
  } else {
    const dayNames = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    return dayNames[date.getDay()];
  }
};

function DayWeather({
  date,
  tempMin,
  tempMax,
  icon,
}: Readonly<DayWeatherProps>) {
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="space-between"
      h="full"
      w="full"
    >
      <Text
        color="white"
        fontWeight="bold"
        fontSize="sm"
        textTransform="capitalize"
      >
        {getDayName(date)}
      </Text>
      <Image
        src={icons[icon].day.image}
        alt="WMO Icon"
        width={80}
        height={80}
      />
      <Center gap={1}>
        <Text color="white" fontWeight="bold">
          {tempMax}º
        </Text>
        <Text color="gray.400" fontWeight="bold">
          {tempMin}º
        </Text>
      </Center>
    </Flex>
  );
}

interface WeekWeatherProps {
  data?: WeatherData | null;
}

const generateRandomId = () => {
  return Math.random().toString(36).slice(2);
};

export function WeekWeather({ data }: Readonly<WeekWeatherProps>) {
  return (
    <Flex
      p={8}
      rounded="xl"
      w="full"
      h="full"
      gap={3}
      justifyContent="space-between"
      alignItems="center"
      borderRadius="lg"
      bg={
        "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), #0398fc"
      }
      overflowX={["scroll", "hidden"]}
      boxShadow="dark-lg"
    >
      {data?.daily.time.slice(1, 8).map((day, index) => (
        <DayWeather
          key={generateRandomId()}
          date={day}
          tempMin={data?.daily.temperature_2m_min[index].toFixed(1)}
          tempMax={data?.daily.temperature_2m_max[index].toFixed(1)}
          icon={data?.daily.weather_code[index] as keyof typeof icons}
          isDay={index === 0}
        />
      ))}
    </Flex>
  );
}
