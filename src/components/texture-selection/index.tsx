import {
  Text,
  Flex,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useState } from "react";
import store from "../../store";

function TextureSelection() {
  const { textures } = store();
  const [textureName, setTextureName] = useState<string | null>(null);

  return (
    <Popover placement="right">
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button
              height="100px"
              {...(textureName
                ? { backgroundImage: `url('/textures/${textureName}')` }
                : {})}
              _hover={{
                background: textureName
                  ? `url('/textures/${textureName}')`
                  : "",
                backgroundSize: "cover",
                opacity: 0.6,
              }}
              backgroundSize={"cover"}
            >
              {!textureName && <Text>{"Select a texture"}</Text>}
            </Button>
          </PopoverTrigger>
          <PopoverContent width="160px">
            <PopoverArrow />
            <PopoverBody>
              <Flex flexDirection="column" gap="5px">
                {textures.map((texture: string) => (
                  <Button
                    height="80px"
                    _hover={{
                      background: `url('/textures/${texture}')`,
                      backgroundSize: "cover",
                      opacity: 0.6,
                    }}
                    key={texture}
                    backgroundImage={`url('/textures/${texture}')`}
                    backgroundSize="cover"
                    onClick={() => {
                      onClose();
                      setTextureName(texture);
                      store.setState({ activeTextureName: texture });
                    }}
                  />
                ))}
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}

export default TextureSelection;
