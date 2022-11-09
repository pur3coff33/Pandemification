// material ui stuffs
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import SettingsIcon from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import { blueGrey } from "@mui/material/colors";

// firebase stuufs
import { getAuth } from "firebase/auth";

// react stuffs
import { useState } from "react";
import Link from "react-router-dom/Link";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <div>
      <AppBar position="sticky" sx={{ backgroundColor: blueGrey[900] }}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item md={3}>
              <Typography variant="h6" component="div">
                Pandemification
              </Typography>
            </Grid>
            <Grid item md={5}>
              <Stack direction="row" spacing={5 + "vw"} justifyContent="end">
                <Tooltip title="to Dashboard Page" enterDelay={800} arrow>
                  <Link
                    to="/"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Typography variant="p">Dashboard</Typography>
                  </Link>
                </Tooltip>

                <Tooltip title="to Leaderboards Page" enterDelay={800} arrow>
                  <Link
                    to="/leaderboards"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Typography variant="p">Leaderboards</Typography>
                  </Link>
                </Tooltip>
              </Stack>
            </Grid>
            <Grid item md={4} textAlign="end">
              <Tooltip title="User Settings">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="account-menu"
                  aria-haspopup="true"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  color="inherit"
                >
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuList>
            <MenuItem onClick={() => getAuth().signOut()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              SignOut
            </MenuItem>
          </MenuList>
        </Menu>
      </AppBar>
    </div>
  );
}

export default Navbar;
