/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import swal from "sweetalert";
// import { toast } from "react-hot-toast";
import Spinner from "react-bootstrap/Spinner";

function BasicExample() {
  const [klub, setKlub] = useState("");
  const [kota, setKota] = useState("");
  const [allKlub, setAllKlub] = useState([]);
  const [isLoading2, setIsLoading2] = useState(false);

  const handleKlub = (e) => {
    setKlub(e.target.value);
  };
  const handleKota = (e) => {
    setKota(e.target.value);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    setIsLoading2(true);
    axios
      .post(`http://localhost:3001/api/v1/club`, {
        klub,
        kota,
      })
      .then((res) => {
        setIsLoading2(false);
        setKlub("");
        setKota("");
        console.log(res.data.data[0]);
        swal("Good job!", "Sukses Buat Klub Baru!", "success");
      })
      .catch((err) => {
        setIsLoading2(false);
        console.log(err);
      });
  };

  const getAllClub = () => {
    axios
      .get(`https://node-aptavis.vercel.app/api/v1/club`)
      .then((res) => {
        setAllKlub(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllClub();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <Card className=" bg-success bord col-6 p-4">
          <Form onSubmit={HandleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nama Klub</Form.Label>
              <Form.Control
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Masukkan Nama Klub"
                value={klub}
                onChange={handleKlub}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Kota Klub</Form.Label>
              <Form.Control
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Masukkan Kota Klub "
                value={kota}
                onChange={handleKota}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
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
          </Form>
        </Card>
      </div>
    </>
  );
}

export default BasicExample;
