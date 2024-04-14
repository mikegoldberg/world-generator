import { useContext, useEffect } from "react";
import store from "../../store";
import { TextureLoader } from "three";
import TextureContext from "./texture-context";
import { Image } from "@chakra-ui/react";

function SourceTexture() {
  const { sourceTextureRef } = useContext(TextureContext);
  const { activeTextureName } = store();

  useEffect(() => {
    if (activeTextureName) {
      const loader = new TextureLoader();
      loader.load(
        `./textures/${activeTextureName}`,
        (texture: any) => (sourceTextureRef.current = texture)
      );
    }
  }, [activeTextureName]);

  return sourceTextureRef.current ? (
    <Image src={sourceTextureRef.current.source.data.src} />
  ) : null;
}

export default SourceTexture;
