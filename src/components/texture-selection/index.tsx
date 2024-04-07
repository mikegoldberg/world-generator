import {
  Text,
  Flex,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function TextureSelection() {
  const [texture, setTexture] = useState<string | null>(null);
  const [textures, setTextures] = useState([]);

  useEffect(() => {
    fetch("./textures.json")
      .then((r) => r.json())
      .then((files) =>
        setTextures(
          files.filter((name: string) => name.toLowerCase().includes("color"))
        )
      );
  }, []);

  return (
    <Popover placement="right">
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button
              height="100px"
              {...(texture
                ? { backgroundImage: `url('/textures/${texture}')` }
                : {})}
              _hover={{
                background: texture ? `url('/textures/${texture}')` : "",
                backgroundSize: "cover",
                opacity: 0.6,
              }}
              backgroundSize={"cover"}
            >
              {!texture && <Text>{"Select a texture"}</Text>}
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
                      setTexture(texture);
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
