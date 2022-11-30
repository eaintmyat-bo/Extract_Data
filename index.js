const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const { exportToExcel, searchFromExcel } = require("./exportToExcel");
const url = require("url");

const app = express();
app.use("/", express.static("public"));
app.use(fileUpload());

app.post("/extract-text", (req, res) => {
  if (!req.files && !req.files.pdfFile) {
    res.status(400);
    res.end();
  }

  pdfParse(req.files.pdfFile).then((result) => {
    let trimmed_result = result.text.trim().replace(/\n|\r/g, "").split(" ");
    exportToExcel(trimmed_result);
    res.send(trimmed_result);
  });
});

app.get("/search-text", (req, res) => {
  if (!req) {
    res.status(400);
    res.end();
  }

  const queryObject = url.parse(req.url, true).query;
  const searchedWords = searchFromExcel(queryObject.search);
  res.send(searchedWords);
});
app.listen(3000);
