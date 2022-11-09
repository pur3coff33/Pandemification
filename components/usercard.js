import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

import { getAuth } from "firebase/auth";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
function UserCard({ user_data, oa_pts, weekly_pts, rank }) {
  return (
    <div style={{ padding: 20 + "px" }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Avatar
            alt="Avatar"
            src={getAuth().currentUser.photoURL}
            sx={{ width: 64, height: 64 }}
          />

          <Stack>
            <Typography variant="body1">
              <strong>{getAuth().currentUser.displayName}</strong>
            </Typography>

            {user_data.is_student ? (
              <Typography variant="caption">
                Overall Points: {oa_pts}
              </Typography>
            ) : null}

            {user_data.is_student ? (
              <Typography variant="caption">
                Weekly Points: {weekly_pts}
              </Typography>
            ) : null}

            {user_data.is_student ? (
              <Typography variant="caption">
                Current Rank: {rank < 1 ? "N/A" : rank}
              </Typography>
            ) : (
              <Typography variant="caption">Admin</Typography>
            )}
          </Stack>
        </Stack>
        <Divider />
        {user_data.is_student ? (
          <Typography variant="body1">
            <strong>EARNED BADGES</strong>
          </Typography>
        ) : null}

        {user_data.is_student ? (
          <Grid container>
            <Grid item xs={3}>
              <Badge color="secondary" badgeContent={0}>
                <Tooltip title="First Login!" arrow>
                  <Avatar
                    alt="first login badge"
                    src="https://www.schoolofsound.ch/online/wp-content/uploads/2018/09/cb23cf7b9d64aee9037cb1b385634e69.png"
                  />
                </Tooltip>
              </Badge>
            </Grid>
          </Grid>
        ) : null}

        <Button variant="outlined">Show All Available Badges</Button>
      </Stack>
    </div>
  );
}

export default UserCard;
