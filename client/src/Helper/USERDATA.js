const USERDATA = () => {
  return (JSON.parse(localStorage.getItem("profile")));
};

export default USERDATA;
