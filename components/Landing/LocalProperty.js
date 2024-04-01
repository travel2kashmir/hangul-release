import Router  from "next/router";

export default function LocalProperty(props) {
  window.localStorage.setItem("property", JSON.stringify(props.item));
    Router.push('./propertysummary');
  };