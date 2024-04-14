import { useConst } from "@chakra-ui/react";
import { createContext, useRef, useState } from "react";

const TextureContext = createContext<null | any>(null);

export default TextureContext;

function Provider({ children }: any) {
  const sourceTextureRef = useRef<any>();
  const samplerTextureRef = useRef<any>();
  const brushTextureRef = useRef<any>();
  const defaultColor = useConst("#11aa33");
  const [brushSize, setBrushSize] = useState(100);
  const [brushFade, setBrushFade] = useState(0.5);
  const [textureSize, setTextureSize] = useState({ x: 1024, y: 1024 });

  return (
    <TextureContext.Provider
      value={{
        sourceTextureRef,
        samplerTextureRef,
        brushTextureRef,
        brushSize,
        setBrushSize,
        brushFade,
        setBrushFade,
        textureSize,
        setTextureSize,
        defaultColor,
      }}
    >
      {children}
    </TextureContext.Provider>
  );
}

export { Provider };
