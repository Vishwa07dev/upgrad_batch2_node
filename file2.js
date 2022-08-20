/** 
const operatorObj = require("./file1");

const res = operatorObj.add(5,6); //I want to re-use the add function defined in file1.js
const mult  = operatorObj.mul(5,6);
console.log(res);
console.log(mult);

**/

const add = require("./file1");
console.log(typeof add);

console.log(add(5,6));