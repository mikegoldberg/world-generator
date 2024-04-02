import { Flex } from "@chakra-ui/react";
import Heightmap from "../components/heightmap";

function LeftPanel() {
  return (
    <Flex
      flexDirection="column"
      position="relative"
      width="200px"
      zIndex={10}
      top={"20px"}
      left={"20px"}
    >
      <Flex flexDirection={"column"} padding="10px" gap="5px" background="#fff">
        <Heightmap />
      </Flex>
    </Flex>
  );
}

export default LeftPanel;
