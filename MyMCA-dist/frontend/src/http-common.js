/*
* File name: http-common.js
* Purpose: Sets up axios to run the application on the specified URL
* Authors: Heather Miller
* Date Created: 2/20/22
* Last Modified: 4/22/22
*/

import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-type": "application/json"
  }
});