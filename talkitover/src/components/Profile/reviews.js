import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {get, fetchData } from '../../store/profile-store';
import {Accordion, Card, Button } from 'react-bootstrap'

const Reviews = props => {

    useEffect(() => {
        props.fetchData()
    }, []);

return (
          <div>
<Accordion defaultActiveKey="0">
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Click me!
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>Hello! I'm the body</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="1">
        Click me!
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="1">
      <Card.Body>Hello! I'm another body</Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
          </div>
        )
}
const mapStateToProps = state => ({
    profile: state.createSlice
});

const mapDispatchToProps = {get, fetchData };

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);