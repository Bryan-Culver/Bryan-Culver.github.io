import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../App.css'

/*
This function has been developed to display a pop-up modal to display the standard Psyche disclaimer to the user
when she first views the webpage.
@author Bryan Culver
 */

function Disclaimer() {
    const[show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    return (
        <React.Fragment>
            <Modal show={show} animation={false}>
                <Modal.Header>
                    <Modal.Title>Disclaimer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This work was created in partial fulfillment of Arizona State University
                    Capstone Course "SER 401 and SER 402". The work is a result of the Psyche Student
                    Collaborations component of NASA’s Psyche Mission (psyche.asu.edu).
                    “Psyche: A Journey to a Metal World” [Contract number NNM16AA09C] is part
                    of the NASA Discovery Program mission to solar system targets. Trade names
                    and trademarks of ASU and NASA are used in this work for identification only.
                    Their usage does not constitute an official endorsement, either expressed or
                    implied, by Arizona State University or National Aeronautics and Space Administration.
                    The content is solely the responsibility of the authors and does not necessarily
                        represent the official views of ASU or NASA.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        I Understand
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default Disclaimer;