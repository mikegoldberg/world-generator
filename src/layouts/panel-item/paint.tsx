import { Grid, GridItem } from "@chakra-ui/react";
import TextureBrush from "../../components/brushes/texture";

function Paint() {
  return (
    <Grid>
      <GridItem>
        <TextureBrush />
      </GridItem>
    </Grid>
  );
}

export default Paint;
