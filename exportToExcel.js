const XLSX = require("xlsx");
const path = require("path");
const fileP = "./data.xlsx";

const exportToExcel = (
  data,
  sheetName = "Data_Extracted",
  filePath = fileP
) => {
  const workBook = XLSX.utils.book_new();

  const workSheetData = [];

  data.forEach((i) =>
    workSheetData.push({
      Extracted_data: i,
    })
  );
  const workSheet = XLSX.utils.json_to_sheet(workSheetData);
  XLSX.utils.book_append_sheet(workBook, workSheet, sheetName);
  XLSX.writeFile(workBook, path.resolve(filePath));
  return true;
};

const searchFromExcel = (word) => {
  const file = XLSX.readFile(fileP);

  let data = [];

  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      data.push(res.Extracted_data);
    });
  }

  filteredData = data.filter((k) => k.includes(word));
  return filteredData;
};
module.exports = { exportToExcel, searchFromExcel };
