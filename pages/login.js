// material UI stuffs
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import GoogleIcon from "@mui/icons-material/Google";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

// firebase auth
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Login({ isInvited }) {
  function signInWithGoogle() {
    if (isInvited === false) getAuth().signOut();

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    signInWithPopup(getAuth(), provider).catch((err) => {
      console.log("err code: " + err.code + ", err msg: " + err.message);
    });
  }

  return (
    <div className="login-page">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Paper elevation={3} sx={{ padding: 5 }}>
          <Typography variant="h5">
            Welcome to <strong>Pandemification </strong>
          </Typography>
          <Stack spacing={2}>
            <Typography variant="p">Learning made fun!</Typography>

            <Button
              onClick={() => signInWithGoogle()}
              variant="contained"
              color="error"
              startIcon={<GoogleIcon />}
            >
              Sign In With Google
            </Button>

            {isInvited === false ? (
              <Alert severity="error">
                <AlertTitle>Access Denied</AlertTitle>
                This web app is for invite only. Contact
                jmaravilla@gbox.adnu.edu.ph if you think this is a mistake.
              </Alert>
            ) : null}
          </Stack>
        </Paper>
      </Box>
    </div>
  );
}

export default Login;
