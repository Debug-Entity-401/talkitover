import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { get, fetchData } from "../../store/profile-store";
import { Accordion, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Reviews = (props) => {
  useEffect(() => {
    props.fetchData();
  }, []);
  const ratingAvvg = () => {
    let sum = 0;
    let count = 0;
    props.profile.results.reviews.map((rev, idx) => {
      sum = sum + parseInt(rev.rating);
      count++;
    });
    let avg =  Math.ceil( sum / count) ; 
    if( avg > 0 ){
	return avg;
    }else{
	return 'There is no Reviews to show';    
    }
  };

  if (props.profile.results.reviews) {
    return (
      <>
        <Accordion>
          <Card>
            <Card.Header>
		<div className="review-btn">
              <Accordion.Toggle as={Button} variant="link" eventKey="0" >
                Reviews
              </Accordion.Toggle>
	    </div>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {props.profile.results.reviews.map((rev, idx) => {
                  return (
		  <ul key={idx}>
		   <h3 key={idx + "name"}> {rev.reviewer_name}</h3>
                      <h6 key={idx + "rat"}>user rate: {rev.rating}</h6>
                      <li key={idx + "des"}>{rev.review_description}</li>
                      <li key={idx + "dat"}>{rev.date}</li>
                    </ul>
                  );
                })}
	      <h2>{ratingAvvg()}</h2>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </>
    );
  }
  return (
    <>
      <Accordion>
        <Card>
          <Card.Header>
	<div className="review-btn">
              <Accordion.Toggle as={Button} variant="link" eventKey="0" >
                Reviews
              </Accordion.Toggle>
	    </div>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>There is no Reviews to show !!</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.createSlice,
});

const mapDispatchToProps = { get, fetchData };

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
