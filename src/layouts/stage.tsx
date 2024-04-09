import { Box } from "@chakra-ui/react";
import ThreeCanvas from "../components/three-canvas";
import TopPanel from "./top-panel";

function Stage() {
  return (
    <Box flex={1} position="relative" background="whiteAlpha.100">
      <TopPanel />
      <ThreeCanvas />
    </Box>
  );
}

export default Stage;
