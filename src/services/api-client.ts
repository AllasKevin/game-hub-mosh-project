import axios from "axios";

export default axios.create({
    baseURL: "/api",
    /*params: {
        myParameter: "foo"
    }*/
  // headers: { "Access-Control-Allow-Origin": "*"}
})

