import Lottie from "lottie-react";
import React from "react";

import errorIcon from "@/animations/error.json";
import { Container } from "@chakra-ui/react";

export function ErrorIcon() {
  return (
    <Container
      centerContent
      justifyContent="center"
      minHeight="100vh"
      bg="blue.900"
    >
      <Lottie animationData={errorIcon} loop={true} />
    </Container>
  );
}
