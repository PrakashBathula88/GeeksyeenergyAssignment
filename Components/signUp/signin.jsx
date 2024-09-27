import React, { useState, useRef, useContext } from "react";
import "./signin.css";
import Auth from "../Auth/Auth";
import { useNavigate } from "react-router-dom";
function Signin() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const authCtx = useContext(Auth);
  const navigate = useNavigate();
  const switchHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitting = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    setLoading(true);
    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAOD-cVUQG4pIYE1uRNv-KFcDQFvXv7JVU";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAOD-cVUQG4pIYE1uRNv-KFcDQFvXv7JVU";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            const errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.Login(data.idToken);
        navigate("/");
        setTimeout(() => {
          authCtx.RemoveAutologout();
          navigate("/signin");
        }, 300000);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="img_1">
      <div className="All_sign_in">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitting}>
          {!isLogin && (
            <>
              <h3>Name</h3>
              <input
                type="text"
                placeholder="Enter Your Name"
                ref={nameRef}
                autoComplete="off"
                required
              />
              <h3>Phone Number</h3>
              <input
                type="number"
                placeholder="Enter Your Phone Number"
                ref={phoneRef}
                autoComplete="off"
                required
              />
            </>
          )}
          <h3>Email</h3>
          <input
            type="email"
            placeholder="testing123@gmail.com"
            ref={emailRef}
            autoComplete="off"
            required
          />
          <h3>Password</h3>
          <input type="password" ref={passwordRef} required />
          <div>
            <button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </button>
            {loading && <p className="Load">Loading...</p>}
            <button
              className="create_new"
              type="button"
              onClick={switchHandler}
            >
              {isLogin ? "Create new Account" : "Login with existing Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;

// import React, { useState, useRef, useContext } from "react";
// import "./Sign.css";
// import { useNavigate } from "react-router-dom";
// import Authcontext from "../LoginProvider/Loginprovider";

// function Signin() {
//   const navigate = useNavigate();
//   const [islogin, setislogin] = useState(true);
//   const [loading, setloading] = useState(false);
//   const emailref = useRef();
//   const passref = useRef();
//   const authCtx = useContext(Authcontext);
//   const switchhandler = () => {
//     setislogin((prevestate) => !prevestate);
//   };

//   const Submiting = (event) => {
//     event.preventDefault();
//     const enteredemail = emailref.current.value;
//     const enteredpassword = passref.current.value;
//     setloading(true);
//     let url;
//     if (islogin) {
//       url =
//         "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAOD-cVUQG4pIYE1uRNv-KFcDQFvXv7JVU";
//     } else {
//       url =
//         "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAOD-cVUQG4pIYE1uRNv-KFcDQFvXv7JVU";
//     }
//     fetch(url, {
//       method: "POST",
//       body: JSON.stringify({
//         email: enteredemail,
//         password: enteredpassword,
//         returnsecuretoken: false,
//       }),
//       headers: {
//         "content-type": "application/json",
//       },
//     })
//       .then((res) => {
//         setloading(false);
//         if (res.ok) {
//           return res.json();
//         } else {
//           return res.json().then((data) => {
//             const errormessage = "Authentication failed";

//             throw new Error(errormessage);
//           });
//         }
//       })
//       .then((data) => {
//         authCtx.Login(data.idToken);
//         navigate('/')
//         setTimeout(() => {
//           authCtx.RemoveAutologout();
//           navigate("/signin");
//         }, 300000);
//       })
//       .catch((err) => {});
//   };

//   return (
//     <div className="img_1">
//       <div className="All_sign_in">
//         <h1>{islogin ? "Login" : "Sign Up"}</h1>
//         <form onSubmit={Submiting}>
//           <h3>Your Mail</h3>
//           <input
//             type="email"
//             placeholder="testing123@gmail.com"
//             ref={emailref}
//             autoComplete="off"
//             required
//           ></input>
//           <h3>Your Password</h3>

//           <input type="password" ref={passref}></input>
//           <div>

//               <button type="submit">
//                 {islogin ? "Login" : "Create Account"}
//               </button>

//             {loading && <p className="Load">Loading...</p>}
//             <button className="create_new" onClick={switchhandler}>
//               {islogin ? "Create new Account" : "Login with existing Account"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signin;
