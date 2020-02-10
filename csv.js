const fs = require('fs-extra');
const path = require('path');
const Excel = require("exceljs");

const fileLocation = path.join(__dirname, 'report.xlsx');

module.exports = class CSVService {
  async getStockCodes() {
    const workbook = new Excel.Workbook();
    return workbook.xlsx.readFile(fileLocation).then(() => {
      const worksheet = workbook.getWorksheet('stock');
      const codes = worksheet.getColumn('A').values;
      return codes;
    });
  }

  async writeStockPrices(codes, realtimeStocks) {
    const workbook = new Excel.Workbook();
    return workbook.xlsx.readFile(fileLocation).then(() => {
      const worksheet = workbook.getWorksheet('stock');
      realtimeStocks.forEach(stock => {
        const index = codes.findIndex(element => element === Number(stock.code));
        const name = worksheet.getCell(`B${index}`);
        const price = worksheet.getCell(`C${index}`);
        name.value = stock.name;
        price.value = Number(stock.price);
      });
      workbook.xlsx.writeFile(fileLocation); 
    });
  }
}