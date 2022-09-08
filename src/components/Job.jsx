import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Job = ({ data }) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.content);

  return (
    <Row
      className="mx-0 mt-3 p-3"
      style={{ border: "1px solid #00000033", borderRadius: 4, backgroundColor: "white" }}
    >
      <Col xs={1}>
        {favourites.find((favourite) => data.company_name === favourite.company_name) ? (
          <FaHeart
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => {
              console.log("ora faccio il dispatch di un'action");
              dispatch({
                type: "REMOVE_FROM_FAVOURITES",
                payload: data._id,
              });
            }}
          />
        ) : (
          <FaRegHeart
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => {
              console.log("ora faccio il dispatch di un'action");
              dispatch({
                type: "ADD_TO_FAVOURITES",
                payload: data,
              });
            }}
          />
        )}
      </Col>
      <Col xs={3}>
        <Link className="text-dark" to={`/${data.company_name}`}>
          {data.company_name}
        </Link>
      </Col>
      <Col xs={8}>
        <a className="text-dark" href={data.url} target="_blank" rel="noreferrer">
          {data.title}
        </a>
      </Col>
    </Row>
  );
};

export default Job;
