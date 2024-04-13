import {
  Flex,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

interface SliderControlProps {
  label: string;
  value: number;
  max: number;
  min: number;
  step: number;
  orientation?: "horizontal" | "vertical";
  onChange: (value: number) => void;
}
function SliderControl({
  label,
  max,
  min,
  step,
  value,
  orientation = "horizontal",
  onChange,
}: SliderControlProps) {
  return (
    <Flex
      flexDirection={"column"}
      flexFlow={orientation === "horizontal" ? "column" : "column-reverse"}
      gap="5px"
    >
      <FormLabel margin={0} fontSize={"sm"}>
        {label}
      </FormLabel>
      <Slider
        aria-label={label}
        value={value}
        max={max}
        min={min}
        step={step}
        onChange={onChange}
        orientation={orientation}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Flex>
  );
}

export default SliderControl;
