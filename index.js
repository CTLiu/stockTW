const StockService = require('./stock');
const CSVService = require('./csv');

const stock = new StockService();
const csv = new CSVService();

async function start() {
  const codes = await csv.getStockCodes();
  const queryParam = stock.formatRequest(codes);
  const data = await stock.getData(queryParam);
  console.log(data);
  await csv.writeStockPrices(codes, data);
}

start();
