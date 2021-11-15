import Axios from "axios";
import type { FC } from "react";
import { useState } from "react";
import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Join.css'



const Join: FC = () => {
    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //create agent
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [photoUrl, setPhoto] = useState("https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg")

    const [agentLicence, setAgentLicense] = useState("");
    const [address, setAddress] = useState("");
    const [practiceAreas, setPracticeAreas] = useState("");
    const [aboutMe, setAboutMe] = useState("");

    const [agents, setAgents] = React.useState(null);

    const submit = () => {
        Axios.defaults.baseURL = 'http://localhost:3001/agents';

        if (firstName && photoUrl && lastName && agentLicence && address && practiceAreas && aboutMe !== '') {


            Axios.post('/', {

                firstName: firstName,
                lastName: lastName,
                photoUrl: photoUrl,
                agentLicence: agentLicence,
                address: address,
                practiceAreas: practiceAreas,
                aboutMe: aboutMe

            })
                .then((response) => {
                    setAgents(
                        response.data
                    );

                    handleClose()
                });
        }
        else { console.log("fill out all of the forms") }
    };


    return (
        <>
            <div >
                <button className="joinButton" onClick={handleShow}>
                    JOIN NOW!
                </button>
            </div>
            <Modal className="modal" show={show} onHide={handleClose}>
                <Modal.Body className="modalBody">
                    <div className="forms">
                        <input className="firstName inputs" placeholder="First Name"
                            onChange={(e) => {
                                setFirstName(e.target.value)

                            }} />

                        <input className="lastName inputs" placeholder="Last Name"
                            onChange={(e) => {

                                setLastName(e.target.value)


                            }} />
                        <input className="photoUrl inputs" placeholder="Photo URL"
                            onChange={(e) => {

                                setPhoto(e.target.value)

                            }} />
                        <input className="agentLicense inputs" placeholder="Agent License"
                            onChange={(e) => {

                                setAgentLicense(e.target.value)

                            }} />
                        <input className="address inputs" placeholder="Address"
                            onChange={(e) => {

                                setAddress(e.target.value)

                            }} />
                        <input className="practiceAreas inputs" placeholder="Practice Areas"
                            onChange={(e) => {

                                setPracticeAreas(e.target.value)

                            }} />
                        <textarea className="aboutMe inputs" placeholder="About Me"
                            onChange={(e) => {

                                setAboutMe(e.target.value)

                            }} />

                    </div>







                </Modal.Body>
                <Modal.Footer className="modalFooter">
                    <Button className="closeButton" variant="secondary" onClick={handleClose}>
                        CLOSE
                    </Button>
                    <Button className="submitButton" variant="primary" onClick={submit}>
                        SUBMIT
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Join