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
  const [texturePreview, setTexturePreview] = useState<string | null>(null);

  return (
    <Popover placement="right">
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button
              height="100px"
              backgroundPosition={"center"}
              {...(texturePreview
                ? { backgroundImage: `url('${texturePreview}')` }
                : {})}
              _hover={{
                backgroundImage: texturePreview
                  ? `url('${texturePreview}')`
                  : "",
                opacity: 0.6,
              }}
              _active={{
                backgroundImage: texturePreview
                  ? `url('${texturePreview}')`
                  : "",
                opacity: 0.2,
              }}
              backgroundSize={"cover"}
            >
              {!texturePreview && <Text>{"Select a texture"}</Text>}
            </Button>
          </PopoverTrigger>
          <PopoverContent width="160px">
            <PopoverArrow />
            <PopoverBody>
              <Flex flexDirection="column" gap="5px">
                {Object.entries(textures).map(
                  ([textureName, { albedo }]: any) => (
                    <Button
                      height="80px"
                      backgroundPosition={"center"}
                      _hover={{
                        backgroundImage: `url('/textures/${albedo}')`,
                        opacity: 0.6,
                      }}
                      _active={{
                        backgroundImage: textureName
                          ? `url('/textures/${albedo}')`
                          : "",
                        opacity: 0.2,
                      }}
                      key={albedo}
                      backgroundImage={`url('/textures/${albedo}')`}
                      backgroundSize="cover"
                      onClick={() => {
                        onClose();
                        setTexturePreview(`/textures/${albedo}`);
                        store.setState({
                          activeTexture: textures[textureName],
                          isSculptMode: false,
                          isTexturePaintMode: true,
                        });
                      }}
                    />
                  )
                )}
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}

export default TextureSelection;
