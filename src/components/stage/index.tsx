import { Box } from "@chakra-ui/react";
import TopPanel from "./top-panel";
import ThreeCanvas from "../three-canvas";

function Stage() {
  return (
    <Box flex={1} position="relative" background="whiteAlpha.100">
      <TopPanel />
      <ThreeCanvas />
    </Box>
  );
}

export default Stage;
