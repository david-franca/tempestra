import { IoLeaf } from "react-icons/io5";

import { AirQualityData } from "@/types";
import { Center, Flex, Heading, Text } from "@chakra-ui/react";

interface NumberIconProps {
  value?: number;
  label: string;
}

function handleQualityIndex(qualityIndex?: number) {
  if (!qualityIndex) return "Inviável";
  if (qualityIndex <= 50) return "Boa";
  if (qualityIndex <= 100) return "Razoável";
  if (qualityIndex <= 150) return "Ruim";
  if (qualityIndex <= 200) return "Muito ruim";
  if (qualityIndex <= 300) return "Extremamente ruim";
  return "Inviável";
}

const NumberIcon = ({ value, label }: NumberIconProps) => {
  return (
    <Center flexDir="column" gap={1}>
      <Text fontWeight="bold" fontSize="sm" color="teal.200">
        {value?.toFixed(1)}
      </Text>
      <Text textTransform="capitalize" color="white" fontSize="xs">
        {label}
      </Text>
    </Center>
  );
};

interface AirQualityProps {
  data: AirQualityData | null;
}

export function AirQuality({ data }: Readonly<AirQualityProps>) {
  return (
    <Flex
      rounded="xl"
      bg="purple.500"
      w="full"
      flexDir="column"
      h="full"
      gap={4}
      justifyContent="space-between"
      p={8}
      color="white"
    >
      <Center gap={2}>
        <IoLeaf />
        <Text fontWeight="bold">Qualidade do Ar</Text>
      </Center>
      <Center flexDir="column" gap={2}>
        <Text fontWeight="bold" fontSize="lg" color="gray.100">
          {handleQualityIndex(data?.current.usAqi)}
        </Text>
        <Heading fontWeight="bold" fontSize="5xl">
          {data?.current.usAqi.toFixed(1)}
        </Heading>
      </Center>
      <Center gap={4}>
        <NumberIcon value={data?.current.pm25} label="PM2.5" />
        <NumberIcon value={data?.current.pm10} label="PM10" />
        <NumberIcon value={data?.current.sulphurDioxide} label="NH3" />
        <NumberIcon value={data?.current.carbonMonoxide} label="CO" />
        <NumberIcon value={data?.current.nitrogenDioxide} label="NO2" />
        <NumberIcon value={data?.current.ozone} label="O3" />
      </Center>
    </Flex>
  );
}
