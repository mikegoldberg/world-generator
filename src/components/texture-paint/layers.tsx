import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Switch,
  Text,
} from "@chakra-ui/react";
import { BiCog } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import store from "../../store";

function Layers({ layers, onSettingsChanged }: any) {
  return (
    <Flex
      flexDirection={"column"}
      border="1px solid"
      borderColor="whiteAlpha.300"
    >
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        background={"blackAlpha.300"}
        padding="8px"
        borderBottom="1px solid rgba(255, 255, 255, 0.1)"
      >
        <Text fontSize="10px" textTransform={"uppercase"}>
          {"Layers"}
        </Text>
        <IconButton
          aria-label="add layer"
          icon={<BsPlus />}
          height="20px"
          width="20px"
          padding="0"
          minWidth="0"
        />
      </Flex>
      <Flex>
        {layers.map(({ name }: any) => (
          <Flex
            alignItems={"center"}
            padding="8px"
            width="100%"
            justifyContent={"space-between"}
          >
            <Text>{name}</Text>
            <Popover placement="right">
              <PopoverTrigger>
                <IconButton
                  variant="unstyled"
                  minWidth={"0"}
                  height="20px"
                  icon={<BiCog />}
                  aria-label={"layer settings"}
                />
              </PopoverTrigger>
              <PopoverContent width="200px">
                <PopoverArrow />
                <PopoverBody>
                  <Flex flexDirection={"column"} gap="4px">
                    {["albedo", "normal", "displacement"].map(
                      (setting: string) => (
                        <Flex justifyContent={"space-between"} width="100%">
                          <FormLabel htmlFor={setting}>{setting}</FormLabel>
                          <Switch id={setting} isChecked />
                        </Flex>
                      )
                    )}
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

export default Layers;
