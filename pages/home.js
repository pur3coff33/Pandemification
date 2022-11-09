import { useEffect, useState } from "react";

//react router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// firebase hooks
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { getAuth } from "firebase/auth";
import firebase from "../firebase";

// components
import Navbar from "../components/navbar";
import Dashboard from "./dashboard";
import Leaderboards from "./leaderboads";

const db = firebase.firestore();

function Home() {
  // check user at firestore
  const usersRef = db.collection("users");
  const query = usersRef.where(
    firebase.firestore.FieldPath.documentId(),
    "==",
    getAuth().currentUser.email
  );

  // read database table once
  const [values, isloading] = useCollectionDataOnce(query);
  const count = values && Object.keys(values).length;

  let user_val;
  // check if user is registered. otherwise, register.
  if (count === 0 && !isloading) {
    console.log("adding to db");
    usersRef.doc(getAuth().currentUser.email).set({
      is_student: true,
      overall_points: 0,
      weekly_points: 0,
      rank: 0,
    });
  } else {
    user_val = values && Object.values(values)[0];
  }

  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            {user_val ? <Dashboard user_val={user_val} /> : null}
          </Route>
          <Route path="/leaderboards">
            <Leaderboards />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Home;
