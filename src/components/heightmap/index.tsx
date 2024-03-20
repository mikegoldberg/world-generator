import { Button, Flex, IconButton } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { TerrainContext } from "../../context/terrain";
import { CanvasTexture } from "three";
import Preview from "./preview";
import SliderControl from "../controls/slider";
import { makeNoise3D } from "open-simplex-noise";
import { makeCylinderSurface } from "fractal-noise";
import * as StackBlur from "stackblur-canvas";
import { FaRandom } from "react-icons/fa";
import NumberInputControl from "../controls/input";

interface HeightmapProps {
  width: number;
  height: number;
}

function Heightmap({ width, height }: HeightmapProps) {
  const { displacementScale, setDisplacementScale, setDisplacementMap } =
    useContext(TerrainContext);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [seed, setSeed] = useState(0);
  const [blur, setBlur] = useState(50);
  const [heightScale, setHeightScale] = useState(0.5);
  // const [contrast, setContrast] = useState(12);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    generate();
  }, [blur, seed, heightScale]);

  function generate() {
    const ctx = canvasRef.current?.getContext("2d");

    if (!ctx || !canvasRef.current) {
      return;
    }

    const imageData = ctx.createImageData(width, height);
    const noise3D = makeNoise3D(seed);
    const result = makeCylinderSurface(width, height, noise3D, {
      frequency: 0.04,
      octaves: 1,
    });

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const i = (x + y * width) * 4;
        const value = ((result[x][y] + 1) / 2) * 255;

        imageData.data[i] = value;
        imageData.data[i + 1] = value;
        imageData.data[i + 2] = value;
        imageData.data[i + 3] = 255;
      }
    }

    StackBlur.imageDataRGBA(imageData, 0, 0, width, height, blur);
    ctx.putImageData(imageData, 0, 0);

    apply(imageData);
  }

  function apply(imageData: ImageData) {
    if (!canvasRef.current) {
      return;
    }

    setDisplacementMap(imageData);
    setDisplacementScale(heightScale);
  }

  return (
    <Flex gap="10px" flexDirection="column" width="280px">
      <SliderControl
        label="Height Scale"
        max={20}
        min={-20}
        step={0.01}
        onChange={setHeightScale}
        defaultValue={heightScale}
      />
      <SliderControl
        label="Blur"
        max={100}
        min={1}
        step={1}
        defaultValue={blur}
        onChange={setBlur}
      />
      <NumberInputControl
        label="Seed"
        value={seed}
        onChange={(value: number) => setSeed(value)}
      >
        <IconButton
          aria-label="random seed"
          fontSize="18px"
          icon={<FaRandom />}
          onClick={() => setSeed(Math.round(Math.random() * 1000))}
        />
      </NumberInputControl>
      {/* <Flex gap="10px">
        <Button flex={1} onClick={apply}>
          {"Apply"}
        </Button>
      </Flex> */}
      <canvas id="canvas" ref={canvasRef} height={height} width={width} />
      {previewSrc && <Preview src={previewSrc} />}
    </Flex>
  );
}

export default Heightmap;
