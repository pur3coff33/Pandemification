import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

function MainQuestCard({ progress_val, quest_title }) {
  return (
    <div style={{ padding: 20 + "px" }}>
      <Stack>
        <LinearProgress
          variant="determinate"
          color="success"
          value={progress_val}
        />
        <Grid container>
          <Grid item xs={12}>
            <Paper style={{ padding: 20 + "px" }} elevation={3}>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center">
                  <Typography variant="body1" flexGrow={1}>
                    {quest_title}
                  </Typography>
                  <Typography variant="overline">Reward: 20 pts</Typography>
                </Stack>
                <Divider />
                <Typography variant="body2">
                  *Lesson description* Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit. Maecenas porttitor congue massa. Fusce
                  posuere, magna sed pulvinar ultricies, purus lectus malesuada
                  libero, sit amet commodo magna eros quis urna.
                </Typography>

                <CardMedia
                  height="400px"
                  component="img"
                  image="https://c8.alamy.com/comp/T8G32G/schoolchildren-writing-on-chalkboard-in-classroom-during-math-lesson-T8G32G.jpg"
                  alt="quest 1"
                />

                <Button variant="contained" color="primary">
                  Take Quest!
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
}

export default MainQuestCard;
