import {
  Flex,
  FormLabel,
  IconButton,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import SliderControl from "../controls/slider";
import { makeNoise3D } from "open-simplex-noise";
import { makeCylinderSurface } from "fractal-noise";
import * as StackBlur from "stackblur-canvas";
import { FaRandom } from "react-icons/fa";
import store from "../../store";

function Heightmap() {
  const [height, setHeight] = useState(1024);
  const [width, setWidth] = useState(1024);
  const [seed, setSeed] = useState(Math.floor(Math.random() * 1000));
  const [blur, setBlur] = useState(20);
  const [heightScale, setHeightScale] = useState(1);
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
      frequency: 0.005,
      octaves: 4,
    });

    // for (let x = 0; x < width; x++) {
    //   for (let y = 0; y < height; y++) {
    //     const i = (x + y * width) * 4;
    //     const value = ((result[x][y] + 1) / 2) * 255;

    //     imageData.data[i] = value;
    //     imageData.data[i + 1] = value;
    //     imageData.data[i + 2] = value;
    //     imageData.data[i + 3] = 255;
    //   }
    // }

    // StackBlur.imageDataRGBA(imageData, 0, 0, width, height, blur);
    ctx.putImageData(imageData, 0, 0);

    store.setState({
      displacementMap: imageData,
      displacementScale: heightScale,
    });
  }

  function handleRandomSeed() {
    setSeed(Math.round(Math.random() * 1000));
  }

  function handleChangeSeed(_: any, value: number) {
    setSeed(value);
  }

  return (
    <Flex flexDirection="column" gap="10px">
      <SliderControl
        label="Scale"
        max={5}
        min={-5}
        step={0.1}
        onChange={setHeightScale}
        defaultValue={heightScale}
      />
      <SliderControl
        label="Blur"
        max={120}
        min={1}
        step={10}
        defaultValue={blur}
        onChange={setBlur}
      />
      <Flex gap="10px" alignItems={"center"}>
        <FormLabel fontSize={"sm"}>{"Seed"}</FormLabel>
        <InputGroup>
          <NumberInput min={0} value={seed} onChange={handleChangeSeed}>
            <NumberInputField />
          </NumberInput>
          <InputRightElement>
            <IconButton
              aria-label="random seed"
              fontSize="18px"
              icon={<FaRandom />}
              onClick={handleRandomSeed}
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <canvas id="canvas" ref={canvasRef} height={height} width={width} />
    </Flex>
  );
}

export default Heightmap;
