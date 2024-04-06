import { Flex } from "@chakra-ui/react";
import Stage from "./layouts/stage";
import { TerrainProvider } from "./context/terrain";
import LeftPanel from "./layouts/left-panel";

function App() {
  return (
    <TerrainProvider>
      <Flex height={"100vh"}>
        <LeftPanel />
        <Stage />
      </Flex>
    </TerrainProvider>
  );
}

export default App;
