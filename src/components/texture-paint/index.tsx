import { Flex, Portal, useConst } from "@chakra-ui/react";
import Settings from "./settings";
import { createContext, useState } from "react";
import useTextures from "../../hooks/use-textures";
import Layers from "./layers";
import Texture from "./texture";

const BrushContext = createContext<null | any>(null);

export { BrushContext };

function TexturePaint() {
  const { sourceTexture } = useTextures();
  const [isDebugEnabled, setIsDebugEnabled] = useState(false);
  const defaultColor = useConst("#11aa33");
  const [brushSize, setBrushSize] = useState(100);
  const [brushFade, setBrushFade] = useState(0.5);
  const [textureSize, setTextureSize] = useState({ x: 1024, y: 1024 });
  const [layers] = useState([
    {
      name: "layer",
      options: {
        albedo: true,
        normal: true,
        roughness: false,
      },
    },
  ]);

  return (
    <BrushContext.Provider
      value={{
        brushSize,
        setBrushSize,
        brushFade,
        setBrushFade,
        textureSize,
        setTextureSize,
        defaultColor,
        sourceTexture,
      }}
    >
      <Settings />
      <Layers layers={layers} />
      <Portal>
        <Flex
          position="fixed"
          left="250px"
          gap="10px"
          top="100px"
          display={isDebugEnabled ? "flex" : "none"}
        >
          {sourceTexture &&
            Object.entries(sourceTexture).map(([property, texture]: any) => (
              <Texture
                key={property}
                property={property}
                sourceTexture={texture}
              />
            ))}
        </Flex>
      </Portal>
    </BrushContext.Provider>
  );
}

export default TexturePaint;
