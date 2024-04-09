import { Flex } from "@chakra-ui/react";
import ShowWireframe from "../components/show-wireframe";

function TopPanel() {
  return (
    <Flex
      flexDirection="row"
      zIndex={10}
      gap="10px"
      padding="20px"
      position={"absolute"}
      justifyContent={"flex-end"}
      width="100%"
    >
      <ShowWireframe />
    </Flex>
  );
}

export default TopPanel;
