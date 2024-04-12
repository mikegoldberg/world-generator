import { Flex } from "@chakra-ui/react";
import ShowWireframeButton from "./show-wireframe-button";
import SculptButton from "./sculpt-button";
import TexturePaintButton from "./texture-paint-button";

function TopPanel() {
  return (
    <Flex
      flexDirection="row"
      zIndex={10}
      padding="20px"
      position={"absolute"}
      justifyContent={"space-between"}
      width="100%"
    >
      <Flex gap="10px">
        <SculptButton />
        <TexturePaintButton />
      </Flex>
      <ShowWireframeButton />
    </Flex>
  );
}

export default TopPanel;
