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
  activeBrushSize: number;
  activeBrushFade: number;
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
  activeBrushSize: 80,
  activeBrushFade: 0.5,
}));

export default store;
