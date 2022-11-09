import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Alert from "@mui/material/Alert";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import { useState, useEffect } from "react";

import { useCollectionDataOnce } from "react-firebase-hooks/firestore";

import firebase from "../firebase";
import { getAuth } from "firebase/auth";

const db = firebase.firestore();

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function DQItem({
  quest_id,
  q_type,
  q_name,
  pts,
  qData,
  qAns,
  oa_pts,
  setOAPts,
  weekly_pts,
  setWeeklyPts,
  rank,
  setRank,
}) {
  // for quest verdict
  const [verdict, setVerdict] = useState(null);

  const fin_query = db
    .collection("u_dq_finishes")
    .where("u_email", "==", getAuth().currentUser.email)
    .where("dq_id", "==", quest_id);

  const [data, isDataLoading] = useCollectionDataOnce(fin_query);
  const count = data && Object.keys(data).length;

  useEffect(() => {
    if (count != 0 && !isDataLoading) {
      setVerdict(Object.values(data)[0].verdict);
    }
  }, [data]);

  ///// functions

  // add to db function

  const addtoDB = (flag, pts1, pts2) => {
    const autoID = getAuth().currentUser.uid + "_" + quest_id;

    // new
    db.collection("u_dq_finishes").doc(autoID).set({
      dq_id: quest_id,
      u_email: getAuth().currentUser.email,
      verdict: flag,
    });

    // update user points
    db.collection("users").doc(getAuth().currentUser.email).update({
      overall_points: pts1,
      weekly_points: pts2,
    });
  };

  const onClaim = () => {
    const pts1 = oa_pts + pts;
    const pts2 = weekly_pts + pts;

    setOAPts(pts1);
    setWeeklyPts(pts2);

    console.log(weekly_pts);

    setVerdict(true);
    addtoDB(true, pts1, pts2);
  };

  // modal for true or false quest
  const [openTF, setOpenTF] = useState(false);

  const [tfVal, setTFVal] = useState(null);
  const [tfNull, setTFNull] = useState(true);

  const handleOpenTF = () => {
    setOpenTF(true);
    setTFVal(null);
    setTFNull(true);
  };

  const handleCloseTF = () => {
    setOpenTF(false);
  };

  const onSubmitTF = () => {
    if (tfVal !== null) {
      setOpenTF(false);
      console.log(tfVal);
      setVerdict(tfVal === qAns);
    } else {
      setTFNull(false);
    }
  };

  // modal for multiple choice

  const [openM, setOpenM] = useState(false);

  const [mVal, setMVal] = useState(null);
  const [mNull, setMNull] = useState(true);

  const handleOpenM = () => {
    setOpenM(true);
    setMVal(null);
    setMNull(true);
  };

  const handleCloseM = () => {
    setOpenM(false);
  };

  const onSubmitM = () => {
    if (mVal !== null) {
      setOpenM(false);
      console.log(mVal);
      setVerdict(mVal === qAns);
    } else {
      setMNull(false);
    }
  };

  function selectQuest() {
    if (q_type === "tf") {
      return (
        <>
          <Button variant="contained" onClick={handleOpenTF}>
            Accept
          </Button>

          <Modal
            open={openTF}
            onClose={handleCloseTF}
            aria-labelledby="modal-modal-titletf"
            aria-describedby="modal-modal-descriptiontf"
          >
            <Box sx={style}>
              <Typography id="modal-modal-titletf" variant="h6" component="h2">
                {q_name}
              </Typography>
              <Stack spacing={2}>
                <Typography
                  id="modal-modal-descriptiontf"
                  variant="body1"
                  sx={{ mt: 2 }}
                >
                  Please select true or false.
                </Typography>
                <RadioGroup row aria-label="tf" name="row-radio-buttons-group">
                  <FormControlLabel
                    value={true}
                    control={<Radio onClick={() => setTFVal(true)} />}
                    label="True"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio onClick={() => setTFVal(false)} />}
                    label="False"
                  />
                </RadioGroup>

                {tfNull ? null : (
                  <Alert severity="error">
                    you can't submit without choosing your answer.
                  </Alert>
                )}

                <Button variant="outlined" onClick={onSubmitTF}>
                  Submit
                </Button>
              </Stack>
            </Box>
          </Modal>
        </>
      );
    } else if (q_type === "mult") {
      return (
        <>
          {" "}
          <Button variant="contained" onClick={handleOpenM}>
            Accept
          </Button>
          <Modal
            open={openM}
            onClose={handleCloseM}
            aria-labelledby="modal-modal-titlem"
            aria-describedby="modal-modal-descriptionm"
          >
            <Box sx={style}>
              <Typography id="modal-modal-titlem" variant="h6" component="h2">
                {q_name}
              </Typography>
              <Stack spacing={2}>
                <Typography
                  id="modal-modal-descriptionm"
                  variant="body1"
                  sx={{ mt: 2 }}
                >
                  Please choose your answer:
                </Typography>
                <RadioGroup aria-label="m" name="row-radio-buttons-group">
                  <FormControlLabel
                    value="a"
                    control={<Radio onClick={() => setMVal("a")} />}
                    label={"a. " + qData[0]}
                  />
                  <FormControlLabel
                    value="b"
                    control={<Radio onClick={() => setMVal("b")} />}
                    label={"b. " + qData[1]}
                  />
                  <FormControlLabel
                    value="c"
                    control={<Radio onClick={() => setMVal("c")} />}
                    label={"c. " + qData[2]}
                  />
                  <FormControlLabel
                    value="d"
                    control={<Radio onClick={() => setMVal("d")} />}
                    label={"d. " + qData[3]}
                  />
                </RadioGroup>

                {mNull ? null : (
                  <Alert severity="error">
                    you can't submit without choosing your answer.
                  </Alert>
                )}

                <Button variant="outlined" onClick={onSubmitM}>
                  Submit
                </Button>
              </Stack>
            </Box>
          </Modal>
        </>
      );
    } else {
      return (
        <Button variant="contained" onClick={onClaim}>
          {" "}
          Claim
        </Button>
      );
    }
  }

  function selectIcon() {
    if (verdict === true) return <CheckBoxIcon />;
    else if (verdict === false) return <CancelPresentationIcon />;
    else return <CheckBoxOutlineBlankIcon />;
  }

  return (
    <>
      {data && !isDataLoading ? (
        <Stack
          direction="row"
          alignItems="center"
          padding={10 + "px"}
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1}>
            {selectIcon()}
            <Typography variant="overline">
              <strong>{q_name}</strong> - {pts} pts
            </Typography>
          </Stack>
          {verdict === null ? selectQuest(q_type) : null}
        </Stack>
      ) : null}
    </>
  );
}

export default DQItem;
