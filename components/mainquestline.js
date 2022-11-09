import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import MainQuestCard from "./mainquestcard";

function MainQuestLine() {
  return (
    <Stack spacing={3} sx={{ maxHeight: "80vh", overflow: "auto" }}>
      <MainQuestCard progress_val={60} quest_title={"Studying Math"} />
      <Divider />
    </Stack>
  );
}
export default MainQuestLine;
