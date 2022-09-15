import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Job from "./Job";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Favourites = () => {
  const favourites = useSelector((state) => state.favourites.content);
  const navigate = useNavigate();

  return (
    <>
      <Row>
        <Col xs={2} className="mx-auto mt-4">
          <Button variant="light" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={10} className="mx-auto mb-5">
          {favourites.map((jobData) => (
            <Job key={jobData._id} data={jobData} />
          ))}
        </Col>
      </Row>
    </>
  );
};
