const axios = require('axios');
const querystring = require('querystring');

module.exports = class StockService {
  constructor() {
    this.stockData = axios.create({
      baseURL: 'http://mis.twse.com.tw'
    });
  }

  async getData(stocks) {
    const request = await this.stockData.get(
      '/stock/api/getStockInfo.jsp',
      { params: { ex_ch: stocks }}
    );
    return this.formatResponse(request);
  }

  formatResponse(request) {
    const stocks = request.data.msgArray;
    return stocks.map(stock => {
      return {
        name: stock.n,
        code: stock.c,
        price: stock.v
      }
    })
  }

  formatRequest(codesFromExcel) {
    const stockCodes = codesFromExcel.slice(2);
    return stockCodes
      .map(code => `tse_${code}.tw`)
      .join('|');
  }
}