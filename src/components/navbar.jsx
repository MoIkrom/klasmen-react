import React from "react";
import ucl from "../assets/ucl.png";
function Navbar() {
  return (
    <>
      <nav className="navbar ps-5 d-flex justify-content-start gap-3 navbar-light bg-light">
        <img src={ucl} style={{ width: "40px", height: "40px" }} alt="" />
       <h5 >Klasmen UEFA Champions League
        </h5> 
      </nav>
    </>
  );
}

export default Navbar;
