import Axios from "axios";
import type { FC, useEffect } from "react";
import { useState } from "react";
import React from "react";

import Agent from "../Agents/Agent";
import { IAgent } from "../../types/Agent";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Review.css'



const Review: FC<{ agent: IAgent }> = () => {
    //modal
    const [show, setShow] = useState(false);
    // const [agent, setAgent] = useState<IAgent[]>([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [review, setReview] = useState("");


    // const [agents, setAgents] = useState<IAgent[]>([]);

    const submit = () => {
        console.log(Agent)
        Axios.defaults.baseURL = 'http://localhost:3001/agents';
        Axios.put('/', {


            review: review
        })

            .then((response) => {
                console.log(response)

                setReview(response.data);
            });
        handleClose();
    };

    return (
        <>
            <button className="reviewButton" onClick={handleShow}>
                Review
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <input className="reviewInput" placeholder="LEAVE A REVIEW"
                        onChange={(e) => {
                            setReview(e.target.value)
                        }} />


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submit}>
                        SUBMIT!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Review;