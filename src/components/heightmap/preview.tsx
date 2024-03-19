import { Image } from "@chakra-ui/react";

interface PreviewProps {
  src: string;
}

function Preview({ src }: PreviewProps) {
  return src ? <Image src={src} /> : null;
}

export default Preview;
