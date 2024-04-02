import { createContext, useState } from "react";
import { CanvasTexture } from "three";

export const TerrainContext = createContext<any>({});

export function TerrainProvider({ children }: any) {
  const [displacementMap, setDisplacementMap] = useState<CanvasTexture | null>(
    null
  );
  const [displacementScale, setDisplacementScale] = useState(4);
  const [isSculptMode, setIsSculptMode] = useState(false);
  const [modificationLayer, setModificationLayer] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState<any>();
  const [isSculpting, setIsSculpting] = useState(false);

  return (
    <TerrainContext.Provider
      value={{
        displacementMap,
        setDisplacementMap,
        displacementScale,
        setDisplacementScale,
        isSculptMode,
        setIsSculptMode,
        modificationLayer,
        setModificationLayer,
        mousePosition,
        setMousePosition,
        isSculpting,
        setIsSculpting,
      }}
    >
      {children}
    </TerrainContext.Provider>
  );
}
