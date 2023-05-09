import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";
import Spinner from "react-bootstrap/Spinner";

function UpdateScore() {
  const [klub_id, setKlub_id] = useState("");
  const [klub_id2, setKlub_id2] = useState("");
  const [skor1, setSkor1] = useState("");
  const [skor2, setSkor2] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(false);

  const inputNumber = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const createScore = (e) => {
    e.preventDefault();
    setIsLoading2(true);
    axios
      .post(`http://localhost:3001/api/v1/skor`, {
        klub1: klub_id,
        skor1: klub_id,
        klub2: klub_id2,
        skor2: klub_id2,
      })
      .then((res) => {
        console.log(res);
        setIsLoading2(false);
        setKlub_id("");
        setKlub_id2("");
        setSkor1("");
        setSkor2("");
        swal("Good job!", "Sukses Buat Klub Baru!", "success");
        setTimeout(() => {
          window.scrollTo({
            top: 0,
          });
        }, 2000);
      })
      .catch((err) => {
        setIsLoading2(false);
        console.log(err);
      });
  };
  const getDataBase = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3001/api/v1/club`)
      .then((res) => {
        setData(res.data.data);

        setIsLoading(false);
        // console.log(res.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    getDataBase();
  }, []);
  return (
    <>
      {" "}
      {isLoading === true ? (
        <>
          <div className="col-12 d-flex flex-column justify-content-center align-items-center mt-5">
            <div className="spinner-border text-success" role="status"></div>
            <h5 className="text-dark">Loading . . .</h5>
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <Card className=" bg-success bord  col-8 p-4">
            <Form onSubmit={createScore}>
              <Row>
                <Col className="col-5 pe-0">
                  <Form.Group className="text-center mb-5" controlId="formBasicEmail">
                    <Form.Label>Nama Klub</Form.Label>
                    <Form.Select
                      aria-label="Silahkan Pilih klub"
                      as="select"
                      value={klub_id}
                      onChange={(e) => {
                        setKlub_id(e.target.value);
                      }}
                    >
                      <option>Silahkan Pilih Klub</option>;
                      {data.length > 0
                        ? data.map((item, idx) => {
                            return <option value={item.id}>{item.klub}</option>;
                          })
                        : "Tidak Ada Klub"}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="text-center mb-3" controlId="formBasicPassword">
                    <Form.Label>Skor</Form.Label>
                    <Form.Control
                      className="text-center"
                      onKeyPress={inputNumber}
                      value={skor1}
                      onChange={(e) => {
                        setSkor1(e.target.value);
                      }}
                      type="text"
                    />
                  </Form.Group>
                </Col>
                <Col className="d-flex justify-content-center align-items-center p-0">
                  <strong>
                    <h4>VS</h4>
                  </strong>
                </Col>
                <Col className="col-5 ps-0">
                  <Form.Group className="text-center mb-5" controlId="formBasicEmail">
                    <Form.Label>Nama Klub</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      as="select"
                      value={klub_id2}
                      onChange={(e) => {
                        setKlub_id2(e.target.value);
                      }}
                    >
                      <option>Silahkan Pilih Klub</option>;
                      {data.length > 0
                        ? data.map((item, idx) => {
                            return <option value={item.id}>{item.klub}</option>;
                          })
                        : "Tidak Ada Klub"}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="text-center mb-3" controlId="formBasicPassword">
                    <Form.Label>Skor</Form.Label>
                    <Form.Control
                      className="text-center"
                      onKeyPress={inputNumber}
                      type="text"
                      value={skor2}
                      onChange={(e) => {
                        setSkor2(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-center mt-5 ">
                <Button className="col-5" variant="primary" type="submit">
                  {isLoading2 === true ? (
                    <>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        Loading . . .
                      </div>
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      )}
    </>
  );
}

export default UpdateScore;
