import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  get,
  fetchOtherProfile,
  adding,
  addNewReview,
} from "../../store/other-profile-srore";
import { Accordion, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const OtherReviews = (props) => {

  useEffect(() => {
    props.fetchOtherProfile();
  });

  const ratingAvvg2 = () => {
    let sum = 0;
    let count = 0;
    props.other.results.reviews.map((rev, idx) => {
      sum = sum + parseInt(rev.rating);
      count++;
    });
    let avg =  Math.ceil( sum / count);
    if( avg > 0 ){
	return avg;
    }else{
	return 'There is no Reviews to show';    
    }
  };


  if (props.other.results.reviews) {
    return (
      <>
        <Accordion>
          <Card>
            <Card.Header>
	  <div className="review-btn2">
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Reviews
              </Accordion.Toggle>
	    </div>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {props.other.results.reviews.map((rev, idx) => {
                  return (
		<ul key={idx}>
		<h3 key={idx + "name"}>{rev.reviewer_name}</h3>
                      <li key={idx + "rat"}>user rate: {rev.rating}</li>
                      <li key={idx + "des"}>{rev.review_description}</li>
                      <li key={idx + "dat"}>{rev.date}</li>
                    </ul>
                  );
                })}
                <h2> Rating: {ratingAvvg2()}</h2>
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
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Reviews
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>rev</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};

const mapStateToProps = (state) => ({
  other: state.otherProfile,
});

const mapDispatchToProps = { get, fetchOtherProfile, adding, addNewReview };

export default connect(mapStateToProps, mapDispatchToProps)(OtherReviews);
