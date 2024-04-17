import { Flex } from "@chakra-ui/react";
import BrushTexture from "./textures/brush";
import OutputTexture from "./textures/output";
import SamplerTexture from "./textures/sampler";
import SourceTexture from "./textures/source";
import { createContext, useEffect, useState } from "react";
import store from "../../store";

const TextureContext = createContext<null | any>(null);

export { TextureContext };

const Texture = ({ property, sourceTexture }: any) => {
  const [samplerTexture, setSamplerTexture] = useState(null);
  const [brushTexture, setBrushTexture] = useState(null);
  const [output, setOutput] = useState(null);

  useEffect(() => {
    if (output) {
      store.setState({
        [property]: output,
      });
    }
  }, [output]);

  return (
    <TextureContext.Provider
      value={{
        sourceTexture,
        samplerTexture,
        setSamplerTexture,
        brushTexture,
        setBrushTexture,
        setOutput,
      }}
    >
      <Flex flexDirection="column" width="90px" gap="10px">
        <SourceTexture />
        <SamplerTexture />
        <BrushTexture />
        <OutputTexture />
      </Flex>
    </TextureContext.Provider>
  );
};

export default Texture;
