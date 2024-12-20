import { Grid2 } from "@mui/material";
import Intro from "../components/Intro";
import Conversion from "../components/Conversion";
import MainBar from "../components/MainBar";

const Homepage = () => (
  <Grid2 container direction="column" alignItems="center">
    <MainBar />

    <Grid2
      container
      direction="column"
      rowGap={2}
      maxWidth={500}
      width="100%"
      padding={2}
    >
      <Intro />

      <Conversion />
    </Grid2>
  </Grid2>
);

export default Homepage;
