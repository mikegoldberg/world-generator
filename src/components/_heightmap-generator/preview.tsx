// import { useContext, useEffect, useRef, useState } from "react";
// import Konva from "konva";
// import { CanvasTexture } from "three";
// import { TerrainContext } from "../../context/terrain";
// import { Box } from "@chakra-ui/react";

// interface PreviewProps {
//   result: number[] | null;
//   width: number;
//   height: number;
// }

// function Preview({ result, width, height }: PreviewProps) {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [canvasBuffer, setCanvasBuffer] = useState<any>(null);

//   useEffect(() => {
//     if (canvasRef.current && result) {
//       const ctx = canvasRef.current.getContext("2d");

//       if (!ctx) {
//         return;
//       }

//       const imageData = ctx.createImageData(width, height);

//       for (let i = 0, ii = 0; i < imageData.data.length; i += 4, ii += 1) {
//         const color = result[ii];

//         imageData.data[i + 0] = color;
//         imageData.data[i + 1] = color;
//         imageData.data[i + 2] = color;
//         imageData.data[i + 3] = 255;
//       }
//       // ctx.putImageData(imageData, 0, 0);
//       setCanvasBuffer(canvasRef.current);
//     }
//   }, [canvasRef.current, result]);

//   return (
//     <Box>
//       <>
//         {/* <canvas
//           width={width / window.devicePixelRatio}
//           height={height / window.devicePixelRatio}
//           ref={canvasRef}
//           style={{
//             background: "red",
//             display: "none",
//           }}
//         />
//         {canvasBuffer && ( */}
//         <KonvaCanvas
//           sourceContent={canvasBuffer}
//           result={result}
//           width={width}
//           height={height}
//         />
//         {/* )} */}
//       </>
//     </Box>
//   );
// }

// function KonvaCanvas({ sourceContent, result, width, height }: any) {
//   const { setDisplacementMap } = useContext(TerrainContext);

//   // useEffect(() => {
//   //   if (sourceContent) {
//   //     setDisplacementMap(null);
//   //     process(sourceContent);
//   //   }
//   // }, [sourceContent, result]);

//   useEffect(() => {
//     setDisplacementMap(null);
//     process();
//   }, []);

//   function process() {
//     const stage = new Konva.Stage({
//       container: "container",
//       width,
//       height,
//     });
//     const layer = new Konva.Layer();
//     const lion = new Konva.Rect({
//       x: 0,
//       y: 0,
//       width,
//       height,
//       fill: "green",
//       stroke: "black",
//       strokeWidth: 4,
//       blurRadius: 14,
//     });
//     lion.cache();
//     lion.filters([
//       Konva.Filters.Noise,
//       Konva.Filters.Grayscale,
//       Konva.Filters.Blur,
//     ]);
//     layer.add(lion);
//     stage.add(layer);
//     lion.noise(3.0);

//     setDisplacementMap(new CanvasTexture(stage.toCanvas()));
//   }

//   return <Box id={"container"} />;
// }

// export default Preview;
