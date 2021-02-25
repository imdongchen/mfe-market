import React from "react";
import { Contacts } from "p2p/contacts";

export default function App() {
  return (
    <div>
      <h2>Market app</h2>
      <div>This is marketing content</div>
      <div
        style={{
          width: 500,
          border: "1px solid #9da3a6",
          padding: 20,
          marginTop: 20,
        }}
      >
        <h3>Quick send</h3>
        <Contacts />
      </div>
    </div>
  );
}
