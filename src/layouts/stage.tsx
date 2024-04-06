import { Box } from "@chakra-ui/react";
import ThreeCanvas from "../components/three-canvas";

function Stage() {
  return (
    <Box flex={1} background="whiteAlpha.100">
      <ThreeCanvas />
    </Box>
  );
}

export default Stage;
