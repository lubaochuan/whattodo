var filename = './env/' + process.env.NODE_ENV + '.js';
console.log("filename:"+filename);
var obj = require(filename);
console.log("obj:"+JSON.stringify(obj, null, 2));
module.exports = obj;