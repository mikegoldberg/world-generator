import { IconButton } from "@chakra-ui/react";
import store from "../../../store";
import { FaSprayCanSparkles } from "react-icons/fa6";

function TexturePaintButton() {
  const { isTexturePaintMode } = store();

  function handleClickPaintMode() {
    store.setState({
      isTexturePaintMode: !isTexturePaintMode,
      isSculptMode: false,
    });
  }

  return (
    <IconButton
      icon={<FaSprayCanSparkles />}
      aria-label="TexturePaint"
      variant={"outline"}
      border={`2px solid ${
        isTexturePaintMode ? "#fff" : "rgba(255, 255, 255, 0.5)"
      }`}
      background="#000"
      _hover={{ background: "none" }}
      color={isTexturePaintMode ? "#fff" : "rgba(255, 255, 255, 0.5)"}
      onClick={handleClickPaintMode}
    />
  );
}

export default TexturePaintButton;
