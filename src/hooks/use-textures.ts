import { useEffect, useState } from "react";
import store from "../store";
import { TextureLoader } from "three";

function useTextures() {
  const { activeTexture } = store();
  const [sourceTexture, setSourceTexture] = useState(null);

  useEffect(() => {
    fetch("./textures.json")
      .then((r) => r.json())
      .then((textures: any) => {
        store.setState({
          textures,
        });
      });
  }, []);

  useEffect(() => {
    if (activeTexture) {
      const loader = new TextureLoader();

      Promise.all(
        Object.entries(activeTexture).map(
          ([key, value]: any) =>
            new Promise((resolve: any) =>
              loader.load(`./textures/${value}`, (texture: any) =>
                resolve({ key, texture })
              )
            )
        )
      ).then((result) => {
        const sourceTexture: any = {};

        result.forEach(({ key, texture }: any) => {
          sourceTexture[key] = texture.source.data;
        });

        setSourceTexture(sourceTexture);
      });
    }
  }, [activeTexture]);

  return { sourceTexture };
}

export default useTextures;
