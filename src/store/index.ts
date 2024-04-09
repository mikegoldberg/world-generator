import { create } from "zustand";

interface StoreState {
  displacementMap: any;
  displacementScale: any;
  isSculptMode: any;
  modificationLayer: any;
  mousePosition: any;
  isSculpting: any;
  showWireframe: any;
  isTexturePainting: any;
  isTexturePaintMode: any;
  textures: any;
  activeTextureName: any;
  terrainAlbedo: any;
}

const store = create<StoreState>(() => ({
  displacementMap: null,
  displacementScale: null,
  isSculptMode: null,
  modificationLayer: null,
  mousePosition: null,
  isSculpting: null,
  showWireframe: null,
  isTexturePainting: null,
  isTexturePaintMode: null,
  textures: [],
  activeTextureName: null,
  terrainAlbedo: null,
}));

export default store;
