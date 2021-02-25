import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

export default function mount(el) {
  ReactDOM.render(<App />, el);
}
