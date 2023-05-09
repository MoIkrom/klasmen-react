import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Klasmen, Navbar, NewClub, UpdateScore } from "../components";

import "../index.css";

function HomePage() {
  const [showKlasmen, setShowklasmen] = useState(true);
  const [showScore, setShowScore] = useState(false);
  const [showTeam, setShowTeam] = useState(false);

  const klasmenClick = () => {
    setShowklasmen(true);
    setShowScore(false);
    setShowTeam(false);
  };
  const UpdateScoreClick = () => {
    setShowklasmen(false);
    setShowScore(true);
    setShowTeam(false);
  };
  const NewClubClick = () => {
    setShowklasmen(false);
    setShowScore(false);
    setShowTeam(true);
  };

  return (
    <>
      <Navbar />
      <div className="px-5 pt-5">
        <Row>
          <Card className="heith col-3">
            <Card.Body>
              <div className="text-center">
                <h4>App Menu</h4>
              </div>
              <hr />
              <h5 className={showKlasmen === true ? "bg-success p-3 bord pointer" : "pointer"} onClick={klasmenClick}>
                Klasmen
              </h5>
              <hr />
              <h5 className={showScore === true ? "bg-success p-3 bord pointer" : "pointer"} onClick={UpdateScoreClick}>
                {" "}
                Update Score
              </h5>
              <hr />
              <h5 className={showTeam === true ? "bg-success p-3 bord pointer" : "pointer"} onClick={NewClubClick}>
                {" "}
                Add Team
              </h5>
            </Card.Body>
          </Card>
          <Col>
            {showKlasmen === true ? <h4>Klasmen</h4> : showScore === true ? <h4>Update Skor</h4> : showTeam === true ? <h4>Add Team</h4> : <h4>Klasmen</h4>}

            <hr />

            {showKlasmen === true ? <Klasmen /> : showScore === true ? <UpdateScore /> : showTeam === true ? <NewClub /> : <Klasmen />}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default HomePage;
