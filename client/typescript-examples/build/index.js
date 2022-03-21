"use strict";
function sum(x, y) {
    return x + y;
}
const sumExample = sum(2, 5);
// Primitive types
let age = 35;
let userName = 'Joe';
let isValid = true;
let productNames = ['iphone', 'car'];
var States;
(function (States) {
    States["valid"] = "valid1";
    States["inValid"] = "inValid";
    States["pristine"] = "pristine";
})(States || (States = {}));
var StatesDefault;
(function (StatesDefault) {
    StatesDefault[StatesDefault["valid"] = 0] = "valid";
    StatesDefault[StatesDefault["invalid"] = 1] = "invalid";
    StatesDefault[StatesDefault["pristine"] = 2] = "pristine";
})(StatesDefault || (StatesDefault = {}));
console.log(StatesDefault.valid);
console.log(StatesDefault[0]);
let formState = States.valid;
const user = {
    userName: 'Joe',
    age: 25,
};
function wrapperSum(a, b, fn) {
    return fn.apply(null, [a, b]);
}
wrapperSum(3, 5, sum);
function customPush(arr, value) {
    return [...arr, value];
}
let arr1 = [1, 2, 3];
customPush(arr1, 45);
//# sourceMappingURL=index.js.map