import { Flex, Portal } from "@chakra-ui/react";
import SourceTexture from "./source-texture";
import { Provider as TextureProvider } from "./texture-context";
import OptionsPanel from "./options-panel";
import { useEffect, useState } from "react";
import store from "../../store";
import SamplerTexture from "./sampler-texture";
import BrushTexture from "./brush-texture";
import OutputTexture from "./output-texture";

function TexturePaint() {
  const [isDebugEnabled, setIsDebugEnabled] = useState(true);

  useEffect(() => {
    fetch("./textures.json")
      .then((r) => r.json())
      .then((files) => {
        const textures = files.filter((name: string) =>
          name.toLowerCase().includes("color")
        );

        store.setState({
          textures,
        });
      });
  }, []);

  return (
    <TextureProvider>
      <OptionsPanel />
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
    </TextureProvider>
  );
}

export default TexturePaint;
