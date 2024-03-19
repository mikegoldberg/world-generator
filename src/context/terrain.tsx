import { createContext, useState } from "react";
import { CanvasTexture } from "three";

export const TerrainContext = createContext<any>({});

export function TerrainProvider({ children }: any) {
  const [displacementMap, setDisplacementMap] = useState<CanvasTexture | null>(
    null
  );
  const [displacementScale, setDisplacementScale] = useState(4);

  return (
    <TerrainContext.Provider
      value={{
        displacementMap,
        setDisplacementMap,
        displacementScale,
        setDisplacementScale,
      }}
    >
      {children}
    </TerrainContext.Provider>
  );
}
