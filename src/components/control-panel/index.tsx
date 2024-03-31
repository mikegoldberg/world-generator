import { Box, Flex, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RxCaretUp, RxCaretDown } from "react-icons/rx";

function ControlPanel({ id, children }: any) {
  const [isHidden, setIsHidden] = useState(
    localStorage.getItem(`control-input-hidden:${id}`) === "true"
  );

  useEffect(() => {
    localStorage.setItem(
      `control-input-hidden:${id}`,
      JSON.stringify(isHidden)
    );
  }, [isHidden]);

  return (
    <Flex gap="2px" flexDirection="column" width="280px">
      <Box textAlign={"right"}>
        <IconButton
          fontSize="24px"
          background="none"
          height="24px"
          width="30px"
          padding="0"
          onClick={() => setIsHidden(!isHidden)}
          icon={isHidden ? <RxCaretDown /> : <RxCaretUp />}
          aria-label={""}
        />
      </Box>
      <Flex
        gap="10px"
        display={isHidden ? "none" : "flex"}
        flexDirection="column"
        width="280px"
      >
        {children}
      </Flex>
    </Flex>
  );
}

export default ControlPanel;
