import { useContext } from "react";
import { TextureContext } from "../texture";
import { Image } from "@chakra-ui/react";

function SourceTexture() {
  const { sourceTexture } = useContext(TextureContext);

  return sourceTexture ? <Image src={sourceTexture.src} /> : null;
}

export default SourceTexture;
