import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  get,
  fetchOtherProfile,
  adding,
  addNewReview,
} from "../../store/other-profile-srore";
import { Accordion, Card, Button,Toast } from "react-bootstrap";
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
          <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">Average Rating: </Typography>
                        <Rating name="read-only" value={ratingAvvg2()} readOnly />
                      </Box>
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
                    <Toast className='review-container' key={idx}>
                    <Toast.Header closeButton={false}>
                      <strong className="mr-auto">{rev.reviewer_name}</strong>
                      <small>{`${rev.date.split('T')[0]}`}</small>
                    </Toast.Header>
                    <Toast.Body>{rev.review_description}</Toast.Body>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                      <Typography component="legend">User rate:</Typography>
                      <Rating name="read-only" value={rev.rating} readOnly />
                    </Box>
                  </Toast>
                  );
                })}
              
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
