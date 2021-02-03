import React from "react";
import Slider from "./Slider";

export default function Homepage() {
  const [login, setLogin] = React.useState(true);

  return (
    <div>
      <header>
        <h3>Aapdu Junagadh</h3>
        {!login ? <button onClick={setLogin}>Log in</button> : null}
        {login ? (
          <button
            onClick={() => {
              setLogin(false);
            }}
          >
            Log Out
          </button>
        ) : null}
      </header>
      {login ? <Slider /> : null}
    </div>
  );
}
