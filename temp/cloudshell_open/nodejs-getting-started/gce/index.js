'use strict';

const express = require('express');
const path = require('path');
const fs = require("fs");

const app = express();

app.use(express.static(__dirname+'/website'));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html'));
})

const PORT = process.env.PROT || 8080;
app.listen(PORT, _ =>{
    console.log(`app started at port${PORT}`);
})

async function DataHandler(items, data, date) {
  const newData = {
    // Define the new data that you want to append to the users array
    "Sản phẩm": items,
    "Thông tin khách hàng": data,
    "Thời gian": date
  };

  let existingData = {};
  try {
    // Read the existing data from the file, or initialize it with an empty users array
    const fileData = fs.readFileSync("data.json", "utf-8");
    existingData = JSON.parse(fileData);
  } catch (err) {
    existingData = { users: [] };
  }

  // Append the new data to the users array
  existingData.users.push(newData);

  // Write the updated data to the file
  fs.writeFileSync("data.json", JSON.stringify(existingData));

  console.log("New data has been appended to data.json");
}

module.exports = app;