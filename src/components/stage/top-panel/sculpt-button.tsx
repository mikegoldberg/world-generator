import { IconButton } from "@chakra-ui/react";
import { FaMountain } from "react-icons/fa6";
import store from "../../../store";

function SculptButton() {
  const { isSculptMode } = store();

  function handleClickPaintMode() {
    store.setState({
      isSculptMode: !isSculptMode,
      isTexturePaintMode: false,
    });
  }

  return (
    <IconButton
      icon={<FaMountain />}
      aria-label="sculpt"
      variant={"outline"}
      border={`2px solid ${isSculptMode ? "#fff" : "rgba(255, 255, 255, 0.5)"}`}
      background="#000"
      fontSize="28px"
      height="44px"
      width="44px"
      _hover={{ background: "none" }}
      color={isSculptMode ? "#fff" : "rgba(255, 255, 255, 0.5)"}
      onClick={handleClickPaintMode}
    />
  );
}

export default SculptButton;
