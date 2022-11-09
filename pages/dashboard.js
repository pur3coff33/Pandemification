import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";

import UserCard from "../components/usercard";
import DQCard from "../components/dq_card";
import MainQuestLine from "../components/mainquestline";

function Dashboard({ user_val }) {
  const user_data = {
    is_student: user_val.is_student,
    overall_pts: user_val.overall_points,
    weekly_pts: user_val.weekly_points,
    rank: user_val.rank,
  };

  const [oa_pts, setOAPts] = useState(user_data.overall_pts);
  const [weekly_pts, setWeeklyPts] = useState(user_data.weekly_pts);
  const [rank, setRank] = useState(user_data.rank);

  return (
    <div>
      <Grid container spacing={2} sx={{ padding: 5 + "px" }}>
        <Hidden lgDown>
          <Grid item lg={1} />
        </Hidden>
        <Hidden smDown>
          <Grid item sm={12} md={3} lg={2}>
            <Paper>
              <UserCard
                user_data={user_data}
                oa_pts={oa_pts}
                weekly_pts={weekly_pts}
                rank={rank}
                setRank={setRank}
              />
            </Paper>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={6} lg={5}>
          <Paper>
            <Stack direction="row" sx={{ padding: 15 + "px" }}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                <strong>Main Quests</strong>
              </Typography>
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                icon={<SpeedDialIcon />}
                direction="left"
              >
                <SpeedDialAction
                  icon={<MenuBookIcon />}
                  tooltipTitle={"Add Main Quest Slideshow"}
                />

                <SpeedDialAction
                  icon={<OndemandVideoIcon />}
                  tooltipTitle={"Add Main Quest Watch Video"}
                />

                <SpeedDialAction
                  icon={<FactCheckIcon />}
                  tooltipTitle={"Add Daily Quest"}
                />
              </SpeedDial>
            </Stack>

            <Divider />

            <MainQuestLine />
          </Paper>
        </Grid>
        <Hidden smDown>
          <Grid item sm={12} md={3}>
            <Paper>
              <Stack padding={5 + "px"} spacing={1}>
                <Typography variant="h6">Daily Quests</Typography>
                <Divider />
                <DQCard
                  oa_pts={oa_pts}
                  setOAPts={setOAPts}
                  weekly_pts={weekly_pts}
                  setWeeklyPts={setWeeklyPts}
                  rank={rank}
                  setRank={setRank}
                />
              </Stack>
            </Paper>
          </Grid>
        </Hidden>
        <Hidden lgDown>
          <Grid item lg={1} />
        </Hidden>
      </Grid>
    </div>
  );
}

export default Dashboard;
