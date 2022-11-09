import Stack from "@mui/material/Stack";
import DQItem from "./dq_item";

import firebase from "../firebase";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { getAuth } from "firebase/auth";

const db = firebase.firestore();
const today = firebase.firestore.Timestamp.now();

function DQCard({ oa_pts, setOAPts, weekly_pts, setWeeklyPts, rank, setRank }) {
  // returns all available daily quest today
  const dq_query = db
    .collection("dailyQuests")
    .where("expiration", ">=", today);

  const [quests] = useCollectionDataOnce(dq_query, { idField: "id" });

  return (
    <Stack spacing={2}>
      {quests &&
        quests.map((quest) => (
          <DQItem
            key={quest.id}
            quest_id={quest.id}
            q_type={quest.type}
            q_name={quest.title}
            pts={quest.points}
            qData={quest.mult_data}
            qAns={quest.correct_ans}
            oa_pts={oa_pts}
            setOAPts={setOAPts}
            weekly_pts={weekly_pts}
            setWeeklyPts={setWeeklyPts}
            rank={rank}
            setRank={setRank}
          />
        ))}

      {/* below for code are for debug 

      <DQItem q_name="Claim for logging in today" pts={5} q_verdict={null} />
      <DQItem q_type="tf" q_name="Is lemon yummy?" pts={5} qAns={false} />
      <DQItem
        q_type="mult"
        q_name="What is the largest animal?"
        pts={5}
        qData={["dog", "whale", "mouse", "cat"]}
        qAns={"b"}
      />

      */}
    </Stack>
  );
}

export default DQCard;
