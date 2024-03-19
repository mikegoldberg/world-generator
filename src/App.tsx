import { Box, Flex } from "@chakra-ui/react";
import Stage from "./Stage";
import { TerrainProvider } from "./context/terrain";
import Heightmap from "./components/heightmap";

function App() {
  return (
    <TerrainProvider>
      <Flex
        flexDirection="column"
        position="relative"
        width="300px"
        zIndex={10}
        top={"20px"}
        left={"20px"}
      >
        <Flex
          flexDirection={"column"}
          padding="10px"
          gap="5px"
          background="#fff"
        >
          <Heightmap height={400} width={400} />
        </Flex>
      </Flex>
      <Box
        userSelect="none"
        width="100%"
        top={0}
        position="absolute"
        height="100vh"
      >
        <Stage />
      </Box>
    </TerrainProvider>
  );
}

export default App;
