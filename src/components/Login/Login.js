import { useContext, useState } from 'react';
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { handleGoogleSingIn, initializeLoginFramework, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';







function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })
  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };



  
  
  

  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);

    }
    if (event.target.name === 'password') {
      isFieldValid = event.target.value.length > 6 && /\d{1}/.test(event.target.value);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  const googleSignIn = () => {
      handleGoogleSingIn()
      .then(res => {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from);
      })

  }

  const fbSignIn = () => {
      handleFbSignIn()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
    })
  }

  const signOut = () => {
      handleSignOut()
      .then(res => {
          setUser(res);
          setLoggedInUser(res);
      })
  }

  const handleSubmit = (e) => {
    //sign up
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }
    //sign in
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
        
      })
    }

    e.preventDefault();
  }

  

  return (
    <div style={{textAlign: 'center'}}>

      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign in with google</button>
      }
      <br />
      <button onClick={fbSignIn}>Sign in with facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>

      }

      <h1>Own Authentication</h1>

      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up</label>

      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} required placeholder="your name" />}
        <br />
        <input type="email" onBlur={handleBlur} name="email" id="" placeholder="abc@mail.com" required />
        <br />
        <input onBlur={handleBlur} type="password" name="password" id="" placeholder="Password" required />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign in"} />
      </form>


      
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>{newUser ? 'Sign up' : 'Log in'} Successful</p>
      }



    </div>
  );
}

export default Login;
