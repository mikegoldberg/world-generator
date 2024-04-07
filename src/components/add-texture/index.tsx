import { IconButton } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

function AddTexture() {
  return (
    <IconButton
      icon={<FaPlus />}
      aria-label="sculpt"
      variant={"outline"}
      border={"2px solid rgba(255, 255, 255, 0.5)"}
      background="#000"
      _hover={{ background: "none", border: "2px solid #fff" }}
      color={"rgba(255, 255, 255, 0.5)"}
      onClick={() => {}}
    />
  );
}

export default AddTexture;
