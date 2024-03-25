export default function LocalProperty(props) {
    localStorage.setItem("property", JSON.stringify(props.item));
    router.push('./propertysummary');
  };