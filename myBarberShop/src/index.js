const app = require('./app');
// const path = require('path');
require('./datebase');



const PORT = process.env.PORT || 2000;
async function init() {
  await app.listen(PORT);
  console.log('Server on port 2000');
}
init();


