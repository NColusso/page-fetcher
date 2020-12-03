const fs = require('fs');
const request = require("request");
const net = require("net")
const readLine = require("readline")

const pageURL = process.argv[2];
const fileName = process.argv[3]

// console.log("Your http request to: ", pageURL);
// console.log("Request to write data info file: ", fileName);

function getFileSize(fileName) {
  let stats = fs.statSync(fileName);
  let fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}


const getPage = (url, callback) => {
  request(url, (error, response, body) => {
    if (error !== null) {
      console.log("Youve got an error!!")
      return error
    }
    return callback(body);
  })
}

// Downloaded and saved 3261 bytes to ./index.html

const writingFile = function (fileName, contentToWrite) {
  fs.writeFile((fileName), (contentToWrite), function (err) {
  if (err) throw err;
  console.log(`Downloaded and saved ${getFileSize(fileName)} bytes to ${fileName}`)
  })
}

getPage(pageURL, function (body) {
  writingFile(fileName, body)
})

  