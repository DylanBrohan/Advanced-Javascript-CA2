import React from "react";
import spinner from "./spinner.gif";
export default () => {
  return (
    <div>
      {/* Pulls in Gif Image that was created */}
      <img
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};
