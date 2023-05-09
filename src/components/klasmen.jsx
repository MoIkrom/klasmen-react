/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

function Klasmen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getDataBase = () => {
    setIsLoading(true);
    axios
      .get(`https://node-aptavis.vercel.app/api/v1/klasmen`)
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
      {isLoading === true ? (
        <>
          <div className="col-12 d-flex flex-column justify-content-center align-items-center mt-5">
            <div className="spinner-border text-success" role="status"></div>
            <h5 className="text-dark">Loading . . .</h5>
          </div>
        </>
      ) : data.length === 0 ? (
        <>
          <div className="d-flex justify-content-center align-items-center mt-5">
            <h5>Tidak Ada Data</h5>
          </div>
        </>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              {data.length === 0 ? (
                ""
              ) : (
                <>
                  <tr className="text-center">
                    <th>No</th>
                    <th>Klub</th>
                    <th>Ma</th>
                    <th>Me</th>
                    <th>S</th>
                    <th>K</th>
                    <th>GM</th>
                    <th>GK</th>
                    <th>Point</th>
                  </tr>
                </>
              )}
            </thead>
            {isLoading === true
              ? ""
              : data.map((item, idx) => (
                  <tbody>
                    <tr key={item.id} className="text-center">
                      <td>{idx + 1}</td>
                      <td>{item.klub}</td>
                      <td>{item.game}</td>
                      <td>{item.menang}</td>
                      <td>{item.seri}</td>
                      <td>{item.kalah}</td>
                      <td>{item.goal}</td>
                      <td>{item.kebobolan}</td>
                      <td>{item.point}</td>
                    </tr>
                  </tbody>
                ))}
          </Table>
        </>
      )}
    </>
  );
}

export default Klasmen;
