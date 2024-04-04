import { Flex } from "@chakra-ui/react";
import SculptBrush from "../components/brushes/sculpt";
import TextureBrush from "../components/brushes/texture";

function TopPanel() {
  return (
    <Flex
      flexDirection="row"
      position="absolute"
      zIndex={10}
      top={"20px"}
      left={"240px"}
      gap="10px"
    >
      <SculptBrush />
      <TextureBrush />
    </Flex>
  );
}

export default TopPanel;
