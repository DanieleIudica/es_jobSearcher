import { useState } from "react";
import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Job from "./Job";
import { useSelector } from "react-redux";

const MainSearch = () => {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const favLength = useSelector((state) => state.favourites.content.length);

  const baseEndpoint = "https://strive-jobs-api.herokuapp.com/jobs?search=";

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseEndpoint + query + "&limit=20");
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
        console.log(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={6} className="mx-auto my-3">
          <h1 className="text-light">Remote Jobs Search</h1>
        </Col>
        <Col xs={2} className="mx-auto mt-4">
          <Button variant="light" onClick={() => navigate("/favourites")}>
            Favourites
            <Badge className="ml-2 p-2" variant="success">
              {favLength}
            </Badge>
            {/* <span className="visually-hidden">unread messages</span> */}
          </Button>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="type and press Enter"
            />
          </Form>
        </Col>
        <Col xs={10} className="mx-auto mb-5">
          {jobs.map((jobData) => (
            <Job key={jobData._id} data={jobData} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
