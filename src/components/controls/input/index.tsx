import {
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

interface NumberInputControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  children?: any;
}

function NumberInputControl({
  label,
  value,
  onChange,
  children,
}: NumberInputControlProps) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <NumberInput
          min={0}
          value={value}
          onChange={(_, value) => onChange(value)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <InputRightElement>{children}</InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

export default NumberInputControl;
