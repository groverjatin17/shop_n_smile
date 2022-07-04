import axios from "axios";

const instance = axios.create({

  baseURL: "https://aqueous-brushlands-11393.herokuapp.com/"
});

export default instance;