import React from "react";
import fire from '../firebase-config'
import NewsItem from "./NewsItem";
import { Button } from 'react-bootstrap';
import { useState } from "react";


function NewsFeed(props) {

    const [numItems, setNumItems] = useState(5)
    const [news, setNews] = useState()

    function loadMore(){
        numItems+=5
    }

    return (

       
            <ul style ={{listStyle:'none'}}>
            {props.news.slice(0,numItems).map((item) => (     
                
                <NewsItem link = {item[0]} summary={item[1]}/>
                 
            ))}
            <Button onCLick={() => setNumItems(numItems+5)}>more</Button>
            </ul>
            

        

    )
}

export default NewsFeed