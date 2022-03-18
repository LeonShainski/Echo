
import { Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';



function NewsItem(props) {

    const myStyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Sans-Serif"
      };

    const text = props.summary



    return (
        <li style={{padding: "10px"}}>
       
            <Row class="border border-dark">
                <Col><img src={process.env.PUBLIC_URL + '/capstone_logo.png'} height={80} width={80} /></Col>
                <Col>
                    <a href={props.link}>{text.slice(0, 100)}...</a></Col>
            </Row>
            
            </li>
            
    )
}

export default NewsItem;