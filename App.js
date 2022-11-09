import "./App.css";

//initializing firebase config
import "./firebase";

// firebase auth
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

// mui stuffs
import LinearProgress from "@mui/material/LinearProgress";

//pages
import Home from "./pages/home";
import Login from "./pages/login";
import { useEffect } from "react";

let emails = [
  "jmaravilla@gbox.adnu.edu.ph",
  "jonarielm@gmail.com",
  "pandemificationwebapp@gmail.com",
];

function App() {
  // to check if theres a current login user
  const [user, isLoading] = useAuthState(getAuth());

  /*
  useEffect(() => {
    // run once app loaded and never again
    // get invited only pipz

    fetch("https://raw.githubusercontent.com/jonarielm/apis/main/emails.json")
      .then((response) => response.json())
      .then((json) => {
        emails = json;
      });
  }, []);
  */

  return (
    <div className="App">
      {isLoading ? (
        <LinearProgress />
      ) : user ? (
        emails && emails.includes(getAuth().currentUser.email) ? (
          <Home />
        ) : (
          <Login isInvited={emails.includes(getAuth().currentUser.email)} />
        )
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
