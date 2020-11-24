import React, { useState, useEffect } from "react";
import "../css/Loader.css";

export default function Loader(props) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (props.hide) return setHide(true);
    return setHide(false);
  }, [props.hide]);
  return (
    <div className={hide ? "hide" : "loaderWrapper"}>
      <div id={hide ? "hideLoader" : "loader"}></div>
    </div>
  );
}
