import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import { Button, CircularProgress } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import { Auth } from "@three0dev/js-sdk";

function Login() {
  const history = useHistory();
  // const addToast = useToasts();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [showLoader, setShowLoader] = useState(false);
  // const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (Auth.isLoggedIn()) {
      console.log("You are logged in");
      history.push("/");
    } else {
      console.log("You are logged out");
    }
  }, [Auth.isLoggedIn()]);

  const login = (e) => {
    if (Auth.isLoggedIn()) {
      Auth.logout();
    } else {
      Auth.login();
    }
    // e.preventDefault();
    // setShowLoader(true);
    // auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then((auth) => {
    //     //logged in
    //     // addToast(`Login successfull for ${email}`, {
    //     //   appearance: "success",
    //     //   autoDismiss: true,
    //     //   autoDismissTimeout: 1800,
    //     // });
    //     setShowLoader(false);
    //     history.push("/");
    //   })
    //   .catch((e) => {
    //     setShowLoader(false);
    //     setError(e.message);
    //     setTimeout(() => {
    //       setError("");
    //     }, 2000);
    //   });
  };

  // const register = (e) => {
  //   e.preventDefault();
  //   setLoader(true);
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((auth) => {
  //       //logged in
  //       // addToast(`Resgistration successfull for ${email}`, {
  //       //   appearance: "success",
  //       //   autoDismiss: true,
  //       //   autoDismissTimeout: 1800,
  //       // });
  //       setLoader(false);
  //       history.push("/");
  //     })
  //     .catch((e) => {
  //       setLoader(false);
  //       setError(e.message);
  //       setTimeout(() => {
  //         setError("");
  //       }, 2000);
  //     });
  // };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>
      <div className="login__container">
        <h1>Sign in</h1>
        <Button
          variant="contained"
          onClick={login}
          className="login__signInButton"
        >
          {Auth.isLoggedIn() ? "Logout with Near" : "Login with Near"}
        </Button>
        {/* <form>
          <h5>Email</h5>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
          />
          <h5>Password</h5>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <p className="login_error">{error}</p>
          <Button
            variant="contained"
            onClick={login}
            type="submit"
            className="login__signInButton"
          >
            {!showLoader ? "Sign In" : <CircularProgress />}
          </Button>
        </form> */}
        <p>
          No need to agree to Amazon's Conditions of Use and Privacy Notice
          because the app is decentralized.
        </p>
        {/* <Button
          variant="contained"
          onClick={register}
          className="login__registerButton"
        >
          {!loader ? "Create your Amazon Account" : <CircularProgress />}
        </Button> */}
      </div>
    </div>
  );
}

export default Login;