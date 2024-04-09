import { IconButton } from "@chakra-ui/react";
import { FaMountain } from "react-icons/fa";
import store from "../../../store";
import useSculpting from "../../../hooks/use-sculpting";

interface SculptBrushProps {
  brushSize: number;
  brushFade: number;
}

function SculptBrush({}: SculptBrushProps) {
  useSculpting();
  const { isSculptMode } = store();

  return (
    <IconButton
      icon={<FaMountain />}
      aria-label="sculpt"
      variant={"outline"}
      border={`2px solid ${isSculptMode ? "#fff" : "rgba(255, 255, 255, 0.5)"}`}
      background="#000"
      _hover={{ background: "none" }}
      color={isSculptMode ? "#fff" : "rgba(255, 255, 255, 0.5)"}
      onClick={() => store.setState({ isSculptMode: !isSculptMode })}
    />
  );
}

export default SculptBrush;
