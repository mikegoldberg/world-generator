import { Flex } from "@chakra-ui/react";
import LeftPanel from "./layouts/left-panel";
import Stage from "./components/stage";

function App() {
  return (
    <Flex height={"100vh"}>
      <LeftPanel />
      <Stage />
    </Flex>
  );
}

export default App;
