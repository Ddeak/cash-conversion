import { AppBar, Toolbar, Typography } from "@mui/material";

const MainBar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h5" sx={{ flexGrow: 1 }}>
        Cash-Conversion
      </Typography>
    </Toolbar>
  </AppBar>
);

export default MainBar;
