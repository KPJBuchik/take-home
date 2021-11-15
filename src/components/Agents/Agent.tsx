import type { FC } from "react";
import { useState } from "react";
import Axios from "axios";

import { IAgent } from "../../types/Agent";
import Review from "../Review/Review";

import './Agent.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Agent: FC<{ agent: IAgent }> = ({ agent }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [show, setShow] = useState(false);
  // const [agent, setAgent] = useState<IAgent[]>([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [review, setReview] = useState("");

  const submit = () => {
    Axios.defaults.baseURL = 'http://localhost:3001/agents';
    Axios.put('?/id=' + agent.id, {

      review: review
    })

      .then((response) => {

        setReview(response.data);
      });
    handleClose();
  };


  return (
    <div className="container">

      <header>
        <button className="accordionButton" onClick={() => setIsExpanded(!isExpanded)} > +
        </button>

        <div className="avatar-holder">
          <img src={agent.photoUrl} className="avatar" alt={agent.firstName} />
        </div>
        <h2 className="agent-name">{agent.firstName + " " + agent.lastName}</h2>
      </header>
      {isExpanded && <div className="body">{agent.aboutMe}       <div className="reviews">"{agent.review}"</div>
      </div>}
      <footer>
        <div className="full-width-flex-box">
          <div className="one-third-flex-box">
            <span>{agent.address}</span>
          </div>
          <div className="one-third-flex-box">
            <span>Areas of Practice: {agent.practiceAreas}</span>
          </div>
          <button className="reviewButton" onClick={handleShow}>
            Review
          </button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Body className="modalBody">
              <textarea className="reviewInput" placeholder="LEAVE A REVIEW"
                onChange={(e) => {
                  setReview(e.target.value)
                }} ></textarea>


            </Modal.Body>
            <Modal.Footer className="modalFooter">
              <Button className="closeButton" variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button className="submitButton" variant="primary" onClick={submit}>
                SUBMIT!
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

      </footer>
    </div>

  );
};

export default Agent;
