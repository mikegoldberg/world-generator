import { Flex } from "@chakra-ui/react";
import Stage from "./layouts/stage";
import LeftPanel from "./layouts/left-panel";

function App() {
  return (
    <Flex height={"100vh"}>
      <LeftPanel />
      <Stage />
    </Flex>
  );
}

export default App;
