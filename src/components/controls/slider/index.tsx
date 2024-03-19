import {
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

interface SliderControlProps {
  label: string;
  defaultValue: number;
  max: number;
  min: number;
  step: number;
  onChange: (value: number) => void;
}
function SliderControl({
  label,
  max,
  min,
  step,
  defaultValue,
  onChange,
}: SliderControlProps) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Slider
        aria-label={label}
        defaultValue={defaultValue}
        max={max}
        min={min}
        step={step}
        onChange={onChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </FormControl>
  );
}

export default SliderControl;
