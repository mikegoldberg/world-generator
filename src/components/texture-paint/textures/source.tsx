import { useContext, useEffect } from "react";
import store from "../../../store";
import { TextureLoader } from "three";
import { TextureContext } from "../";
import { Image } from "@chakra-ui/react";

function SourceTexture({ type = "albedo" }: any) {
  const { sourceTexture, setSourceTexture } = useContext(TextureContext);
  const { activeTexture } = store();

  useEffect(() => {
    if (activeTexture && activeTexture[type]) {
      const loader = new TextureLoader();
      loader.load(`./textures/${activeTexture[type]}`, (texture: any) =>
        setSourceTexture(texture.source.data)
      );
    }
  }, [activeTexture]);

  return sourceTexture ? <Image src={sourceTexture.src} /> : null;
}

export default SourceTexture;
