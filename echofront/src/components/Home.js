import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import Header from './Header'
import Newsfeed from './Newsfeed'
import { auth, database } from "../firebase-config";
import { set, ref, onValue, remove, update } from 'firebase/database'
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);



  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getData = () => {
    const data = ref(database, 'articles/');
    onValue(data, (snapshot) => {
      const feed = snapshot.val();
      Object.values(feed).map(item => {
        if (item.link !== '0') {
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
    <div>
    <Header />
      <Container>
        <Row>
          <Col lg={10}>
            <Newsfeed news={news}/></Col>
          <Col lg={1}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;