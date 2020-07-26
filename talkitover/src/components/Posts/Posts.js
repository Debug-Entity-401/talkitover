import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col } from 'react-bootstrap';

function Post(props) {
    return (
        <div>
            <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>User POST</Form.Label>
                    <Form.Check
                        type='checkbox'
                        id={`default-$checkbox`}
                        label={`default checkbox`}
                    />
                    <Form.Control as="textarea" rows="3" />
                    <Button></Button>
                </Form.Group>
            </Form>
        </div>
    )
}