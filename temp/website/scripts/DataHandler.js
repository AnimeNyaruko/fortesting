// const fs = require("fs");

// export async function DataHandler(items, data, date) {
//   const newData = {
//     // Define the new data that you want to append to the users array
//     "Sản phẩm": items,
//     "Thông tin khách hàng": data,
//     "Thời gian": date
//   };

//   let existingData = {};
//   try {
//     // Read the existing data from the file, or initialize it with an empty users array
//     const fileData = fs.readFileSync("data.json", "utf-8");
//     existingData = JSON.parse(fileData);
//   } catch (err) {
//     existingData = { users: [] };
//   }

//   // Append the new data to the users array
//   existingData.users.push(newData);

//   // Write the updated data to the file
//   fs.writeFileSync("data.json", JSON.stringify(existingData));

//   console.log("New data has been appended to data.json");
// }