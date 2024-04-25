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
  activeTexture: any;
  albedo: any;
  normal: any;
  roughness: any;
  activeBrushSize: number;
  activeBrushFade: number;
  activeBrushScale: number;
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
  activeTexture: null,
  albedo: null,
  normal: null,
  roughness: null,
  activeBrushSize: 80,
  activeBrushFade: 0.5,
  activeBrushScale: 1,
}));

export default store;
