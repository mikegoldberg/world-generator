import { useEffect } from "react";
import store from "../store";

function useTextures() {
  useEffect(() => {
    fetch("./textures.json")
      .then((r) => r.json())
      .then((textures: any) => {
        store.setState({
          textures,
        });
      });
  }, []);
}

export default useTextures;
