import React, { useState, useEffect, useReducer, useContext } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ref, child, get } from "firebase/database";

import { firebaseAuth, db } from "../../utils/firebase";

import AuthContext from "../../store/auth-context";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      // console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 750);

    return () => {
      // console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailState.value;
    const enteredPassword = passwordState.value;

    setIsLoading(true);
    if (!isSignup) {
      // console.log("sign in code goes here");
      signInWithEmailAndPassword(firebaseAuth, enteredEmail, enteredPassword)
        .then((userCredential) => {
          // Signed in
          // console.log(firebaseAuth.currentUser.uid);

          // set(ref(db, "admins/" + firebaseAuth.currentUser.uid), {
          //   email: firebaseAuth.currentUser.email,
          // });

          // console.log(userCredential._tokenResponse.expiresIn);
          const expirationTime = new Date(
            new Date().getTime() +
              +userCredential._tokenResponse.expiresIn * 1000
          );

          const dbRef = ref(db);
          get(child(dbRef, `admins/${firebaseAuth.currentUser.uid}`))
            .then((snapshot) => {
              setIsLoading(false);

              if (snapshot.exists()) {
                // console.log("This user is an admin.");
                authCtx.login(
                  userCredential._tokenResponse.idToken,
                  firebaseAuth.currentUser.uid,
                  expirationTime.toISOString(),
                  firebaseAuth.currentUser.emailVerified,
                  true
                );
              } else {
                // console.log("No such admin exists!");

                authCtx.login(
                  userCredential._tokenResponse.idToken,
                  firebaseAuth.currentUser.uid,
                  expirationTime.toISOString(),
                  firebaseAuth.currentUser.emailVerified,
                  false
                );
              }
            })
            .catch((error) => {
              setIsLoading(false);
              console.error(error);

              authCtx.login(
                userCredential._tokenResponse.idToken,
                firebaseAuth.currentUser.uid,
                expirationTime.toISOString(),
                firebaseAuth.currentUser.emailVerified,
                false
              );
            });

          props.onLogin(emailState.value, passwordState.value);
          // ...
        })
        .catch((error) => {
          setIsLoading(false);

          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
          alert(errorCode + ": " + errorMessage);
        });
    } else {
      // console.log("sign up code goes here");
      createUserWithEmailAndPassword(
        firebaseAuth,
        enteredEmail,
        enteredPassword
      )
        .then((userCredential) => {
          // Signed in
          setIsLoading(false);
          // console.log(userCredential._tokenResponse.idToken);
          // console.log(userCredential._tokenResponse.expiresIn);
          const expirationTime = new Date(
            new Date().getTime() +
              +userCredential._tokenResponse.expiresIn * 1000
          );
          authCtx.login(
            userCredential._tokenResponse.idToken,
            firebaseAuth.currentUser.uid,
            expirationTime.toISOString(),
            firebaseAuth.currentUser.emailVerified,
            false
          );

          props.onLogin(emailState.value, passwordState.value);
          // ...
        })
        .catch((error) => {
          setIsLoading(false);

          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
          alert(errorCode + ": " + errorMessage);
          // ..
        });
    }
  };

  const setLogin = () => {
    setIsSignup((prevState) => !prevState);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">ایمیل</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">رمزعبور</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>

        {isSignup ? (
          <div className={classes.actions}>
            <Button
              type="submit"
              className={classes.signin}
              disabled={!formIsValid}
            >
              {!isLoading ? " ثبت نام" : " منتظر بمانید"}
            </Button>
            <button type="button" className={classes.signup} onClick={setLogin}>
              ورود
            </button>
          </div>
        ) : (
          <div className={classes.actions}>
            <Button
              type="submit"
              className={classes.signin}
              disabled={!formIsValid}
            >
              {!isLoading ? "ورود" : " منتظر بمانید"}
            </Button>
            <button type="button" className={classes.signup} onClick={setLogin}>
              ثبت نام
            </button>
          </div>
        )}
      </form>
    </Card>
  );
};

export default Login;
