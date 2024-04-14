import { Flex, Portal, useConst } from "@chakra-ui/react";
import SourceTexture from "./textures/source";
import Settings from "./settings";
import { createContext, useState } from "react";
import SamplerTexture from "./textures/sampler";
import BrushTexture from "./textures/brush";
import OutputTexture from "./textures/output";
import useTextures from "../../hooks/use-textures";
import Layers from "./layers";

const TextureContext = createContext<null | any>(null);

export { TextureContext };

function TexturePaint() {
  useTextures();
  const [isDebugEnabled, setIsDebugEnabled] = useState(false);
  const [sourceTexture, setSourceTexture] = useState(null);
  const [samplerTexture, setSamplerTexture] = useState(null);
  const [brushTexture, setBrushTexture] = useState(null);
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
    <TextureContext.Provider
      value={{
        brushSize,
        setBrushSize,
        brushFade,
        setBrushFade,
        textureSize,
        setTextureSize,
        defaultColor,
        sourceTexture,
        setSourceTexture,
        samplerTexture,
        setSamplerTexture,
        brushTexture,
        setBrushTexture,
      }}
    >
      <Settings />
      <Layers layers={layers} />
      <Portal>
        <Flex
          display={isDebugEnabled ? "flex" : "none"}
          position="fixed"
          left="250px"
          top="100px"
          flexDirection="column"
          width="150px"
          gap="10px"
        >
          <SourceTexture />
          <SamplerTexture />
          <BrushTexture />
          <OutputTexture />
        </Flex>
      </Portal>
    </TextureContext.Provider>
  );
}

export default TexturePaint;
