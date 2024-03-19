import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useConst,
} from "@chakra-ui/react";
import { createNoise2D, NoiseFunction2D } from "simplex-noise";
import alea from "alea";
import { ChangeEvent, useContext, useEffect, useState } from "react";
// import Preview from "./preview";
import { TerrainContext } from "../../context/terrain";

const ALGORITHMS = {
  SIMPLEX_NOISE: "Simplex Noise",
};

function HeightmapGenerator() {
  const [algorithm, setAlgorithm] = useState(ALGORITHMS.SIMPLEX_NOISE);
  const { width, height } = useConst<any>({ width: 2048, height: 2048 });
  const [showPreview, setShowPreview] = useState(false);
  const [result, setResult] = useState<number[] | null>(null);
  const { displacementScale, setDisplacementScale } =
    useContext(TerrainContext);

  useEffect(() => {
    generateNoise();
  }, []);

  function generateNoise() {
    if (algorithm === ALGORITHMS.SIMPLEX_NOISE) {
      const noise2D = createNoise2D(alea(Math.round(Math.random() * 1000)));
      const result: any = [];

      let i = 0;
      while (i < width * height) {
        let value = (noise2D(i % 100, (i - (i % 100)) / 100) + 1) / 2;

        value = 255 * value;
        result.push(value);
        i++;
      }

      setResult(result);
    }
  }

  function handleApply() {}

  return (
    <Flex gap="10px" flexDirection="column" width="280px">
      <Select
        value={algorithm}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setAlgorithm(e.target.value)
        }
      >
        {Object.values(ALGORITHMS).map((algorithm: string) => (
          <option key={algorithm}>{algorithm}</option>
        ))}
      </Select>
      <FormControl>
        <FormLabel>{"Height"}</FormLabel>
        <Slider
          aria-label="displacement-scale"
          defaultValue={displacementScale}
          max={20}
          min={0}
          step={0.02}
          onChange={setDisplacementScale}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>
      <Flex gap="10px">
        <Button flex={1} onClick={generateNoise}>
          {"Generate"}
        </Button>
        <Button flex={1} onClick={handleApply}>
          {"Apply"}
        </Button>
      </Flex>
      <Preview result={result} width={width} height={height} />
    </Flex>
  );
}

export default HeightmapGenerator;
