import './App.css';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from 'react';
import { auth, database } from "./firebase-config";
import { set, ref, onValue, remove, update } from 'firebase/database'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Link } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import React from 'react';
import Header from './components/Header'
import NewsFeed from './components/Newsfeed';

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const [news, setNews] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };


  const getData = () => {
    const data = ref(database, 'articles/');
    onValue(data, (snapshot) => {
      const feed = snapshot.val();
      Object.values(feed).map(item =>{
        if (item.link !== '0'){
        //console.log(item.link);
        setNews((oldArray) => [...oldArray, [item.link, item.summary, item.fact_score]])
        }
      })
      
    })
      
    
  }
  
  useEffect(() => {
    setTimeout(() => {
      setData(getData);
      setLoading(true);
    }, 1000);
  }, []);


  return (
    <div className="App">
   <Header user={user?.email} aut={auth}/>
     <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

        <button onClick={register}> Create User</button>
      </div>

      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={login}> Login</button>
      </div>

      

      {/* <button onClick={logout}> Sign Out </button> */}
      <br></br>

      <NewsFeed news={news} />

      {/* <div>
        {news.map((item) => (
          <p>{item}</p>
        ))}
      </div> */}




     


    </div>
  );
}


export default App;
