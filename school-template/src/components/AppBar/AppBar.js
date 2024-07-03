import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Favorites from "../../components/Favorites/Favorites";

export default function ButtonAppBar() {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <span>DOGSTIREST</span>
          </IconButton>
          <Button color="inherit">Лента изображений</Button>
          <Button color="inherit" onClick={() => setOpen((prev) => !prev)}>
            Лента понравившихся публикаций
          </Button>
          <>
            <Drawer
              anchor={"right"}
              open={isOpen}
              onClose={() => setOpen(false)}
            >
              <Typography variant="h2">Понравившихся публикации</Typography>
              <Favorites />
            </Drawer>
          </>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
