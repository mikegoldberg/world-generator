import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

interface InputControlProps {
  label: string;
  value: number;
  onChange: (e: string) => void;
  isNumeric: boolean;
  children?: any;
}

function InputControl({ label, value, onChange, children }: InputControlProps) {
  return (
    <Flex gap="10px">
      <FormLabel margin="0">{label}</FormLabel>
      <InputGroup>
        <Input
          autoComplete="off"
          value={value}
          onChange={(e: any) => onChange(e.target.value)}
        />
        <InputRightElement>{children}</InputRightElement>
      </InputGroup>
    </Flex>
  );
}

export default InputControl;
