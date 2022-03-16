import React from "react";
import fire from '../firebase-config'

function NewsFeed(props) {

    return (

        <div>
            {props.news.map((item) => (
                <p><a href={item[0]}>{item[1]}</a></p>
            ))}
        </div>

    )
}

export default NewsFeed