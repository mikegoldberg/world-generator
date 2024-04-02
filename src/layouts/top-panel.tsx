import { Flex } from "@chakra-ui/react";
import TerrainSculptingIcon from "../components/editing-icons/terrain-sculpting-icon";

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
      <TerrainSculptingIcon />
    </Flex>
  );
}

export default TopPanel;
