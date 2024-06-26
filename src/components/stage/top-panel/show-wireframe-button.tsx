import { IconButton } from "@chakra-ui/react";
import { SiTraefikmesh } from "react-icons/si";
import store from "../../../store";

function ShowWireframeButton() {
  const { showWireframe } = store();

  function handleClick() {
    store.setState({ showWireframe: !showWireframe });
  }

  return (
    <IconButton
      icon={<SiTraefikmesh />}
      aria-label="sculpt"
      variant={"outline"}
      border={`2px solid ${
        showWireframe ? "#fff" : "rgba(255, 255, 255, 0.5)"
      }`}
      background="#000"
      fontSize="28px"
      height="44px"
      width="44px"
      _hover={{ background: "none" }}
      color={showWireframe ? "#fff" : "rgba(255, 255, 255, 0.5)"}
      onClick={handleClick}
    />
  );
}

export default ShowWireframeButton;
