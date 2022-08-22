/** 
const operatorObj = require("./file1");

const res = operatorObj.add(5,6); //I want to re-use the add function defined in file1.js
const mult  = operatorObj.mul(5,6);
console.log(res);
console.log(mult);

**/

const operators = require("./file1");
console.log(typeof operators);
console.log(operators);

console.log(operators.add(5,6));