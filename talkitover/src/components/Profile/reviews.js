import React, { useEffect } from "react";
import { connect } from "react-redux";
import { get, fetchData } from "../../store/profile-store";
import { Accordion, Card, Button, Toast } from "react-bootstrap";
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
    let avg = Math.ceil(sum / count);
    if (avg > 0) {
      return avg;
    } else {
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
                    <Toast className='review-container' key={idx}>
                      <Toast.Header closeButton={false}>
                        <strong className="mr-auto">{rev.reviewer_name}</strong>
                        <small>{`${rev.date.split('T')[0]} / ${rev.date.split('T')[1].split('.')[0]}`}</small>
                      </Toast.Header>
                      <Toast.Body>{rev.review_description}</Toast.Body>
                      <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">User rate:</Typography>
                        <Rating name="read-only" value={rev.rating} readOnly />
                      </Box>

                    </Toast>

                  );
                })}
                <h2>Rating Average:  {ratingAvvg()}</h2>
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
