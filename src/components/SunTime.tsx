import { useEffect, useState } from "react";
import { IoSunny } from "react-icons/io5";

import { Center, Flex, Text } from "@chakra-ui/react";

interface SunTimeProps {
  sunrise?: number;
  sunset?: number;
}

export function SunTime({ sunrise, sunset }: Readonly<SunTimeProps>) {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000); // Atualiza a cada minuto

    return () => clearInterval(interval);
  }, []);

  const currentSunrise = Number(sunrise);
  const currentSunset = Number(sunset);

  const getRotationDegrees = (hour: number) => {
    if (!sunrise || !sunset) {
      return 0;
    }

    // Converte para graus
    const angle =
      ((hour - currentSunrise) / (currentSunset - currentSunrise)) * 180;
    return angle;
  };

  const rotationDegrees = getRotationDegrees(currentHour);

  return (
    <Flex
      borderRadius="lg"
      bg="purple.500"
      w="full"
      h="full"
      flexDir="column"
      justifyContent="space-between"
      p={8}
      flex={1}
    >
      <Center gap={2} color="white">
        <IoSunny />
        <Text fontWeight="bold">Horário do Sol</Text>
      </Center>
      <Center flexDir="column" w="full" h={32}>
        <Flex
          pos="relative"
          w={[48, 64]}
          h={[24, 32]}
          overflow="hidden"
          justifyContent="center"
        >
          <div className="w-48 md:w-64 h-48 md:h-64 border-2 bg-yellow-200 bg-opacity-25 border-yellow-400 rounded-full"></div>
          {/* <IoSunny className="text-2xl md:text-3xl text-yellow-500" /> */}
        </Flex>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          w="full"
          color="white"
        >
          <Text fontSize={["sm", "md"]}>{sunrise}</Text>
          <Text fontSize={["sm", "md"]}>{sunset}</Text>
        </Flex>
        {/* Hora do pôr do sol */}
      </Center>
    </Flex>
  );
}
