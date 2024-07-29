import { FiCloudRain, FiWind } from "react-icons/fi";
import { TbDroplets } from "react-icons/tb";

import { WeatherData } from "@/types";
import { Box, Center, Flex, Grid, Heading, Icon, Text } from "@chakra-ui/react";

import { SearchComponent } from "./Search";

interface ItemProps {
  type: "wind" | "humidity" | "rain";
  value: number | string;
}

const Item = ({ type, value }: ItemProps) => {
  const icons = {
    wind: <Icon as={FiWind} w={8} h={8} opacity={0.4} />,
    humidity: <Icon as={TbDroplets} w={8} h={8} opacity={0.4} />,
    rain: <Icon as={FiCloudRain} w={8} h={8} opacity={0.4} />,
  };

  const labels = {
    wind: "Vento",
    humidity: "Umidade",
    rain: "Chuva",
  };

  const symbols = {
    wind: "km/h",
    humidity: "%",
    rain: "%",
  };

  return (
    <Flex
      gap={3}
      color="white"
      px={4}
      py={3}
      alignItems="center"
      justifyContent="center"
      bg="blackAlpha.500"
      borderRadius="lg"
      flexGrow={1}
    >
      <Box>{icons[type]}</Box>
      <Flex flexDir="column">
        <Text color="white">{labels[type]}</Text>
        <Flex gap={1} alignItems="center" justifyContent="center">
          <Heading fontSize="2xl">{value}</Heading>
          <Text>{symbols[type]}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

interface NowProps {
  data: WeatherData | null;
}

export function Now({ data }: Readonly<NowProps>) {
  return (
    <Flex
      borderRadius="xl"
      h="full"
      flexDir="column"
      p="8"
      bg={
        'linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url("/bg.png")'
      }
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
      justifyContent="space-between"
      gap={4}
      boxShadow="dark-lg"
    >
      <SearchComponent />
      <Center flexDir="column" gap={2}>
        <Center className="justify-center items-center relative">
          <Heading fontWeight="bold" color="white" fontSize="8xl">
            {data?.current.temperature_2m.toFixed(1)}
          </Heading>
          <Text
            pos="absolute"
            top={4}
            right={-7}
            color="gray.400"
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
          >
            °C
          </Text>
        </Center>
        <Flex gap={2}>
          <Text fontWeight="bold" color="white" fontSize="2xl">
            {data?.daily.temperature_2m_max[0].toFixed(1)}°
          </Text>
          <Text fontWeight="bold" color="gray.400" fontSize="2xl">
            {data?.daily.temperature_2m_min[0].toFixed(1)}°
          </Text>
        </Flex>
      </Center>
      <Grid templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]} gap={2}>
        <Item
          type="wind"
          value={data?.current.wind_speed_10m.toFixed(1) ?? 0}
        />
        <Item type="humidity" value={data?.current.relative_humidity_2m ?? 0} />
        <Item type="rain" value={data?.current.precipitation ?? 0} />
      </Grid>
    </Flex>
  );
}
