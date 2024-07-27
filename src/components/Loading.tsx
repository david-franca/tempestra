import Lottie from "lottie-react";
import React from "react";

import sun from "@/animations/sun.json";
import { Container } from "@chakra-ui/react";

export function Loading() {
  return (
    <Container
      centerContent
      justifyContent="center"
      minHeight="100vh"
      bg="blue.900"
    >
      <Lottie animationData={sun} loop={true} />
    </Container>
  );
}
