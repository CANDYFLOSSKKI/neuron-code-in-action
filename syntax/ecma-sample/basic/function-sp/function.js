// 函数

// 1-函数的定义方式
// ①function命令定义
function print(s) {
    console.log(s);
}

// ②函数表达式变量赋值
// 函数表达式中指定的函数名(如下方的myFunc)只能在函数内部使用
var print = function myFunc(s) {
    console.log(s);
};

// ③Function()构造函数
// 前n-1个参数是函数的形参,最后一个参数是函数体
var add = new Function(
    'x',
    'y',
    'return x + y'
);


// 2-函数名提升
// 函数名的地位等同于变量名,使用function命令声明函数时,函数的声明会被提升到代码头部
// ->允许使用function命令声明同名函数覆盖之前的定义
// ->不允许使用函数表达式赋值方式声明同名函数
function f() {}         //首次定义,函数名提升
function f() {}         //第二次定义，覆盖函数体
var f = function (){};  //不允许再使用函数表达式形式赋值,报错

// 特殊情况:
// 分别使用function命令和函数表达式赋值方式定义函数体
// 最终将会使用函数表达式赋值方式定义的函数体
function f1() { console.log("function"); };
var f1 = function () { console.log("var"); }
f1()    // 被函数表达式赋值方式覆盖,输出var


// 3-函数的属性和方法
// 3-1 函数名 name
// 如果函数通过函数表达式赋值声明:
//  ①没有设置函数名时name属性会返回变量名
//  ②设置函数名时name属性会返回内部的函数名
function f1() {}
f1.name     // "f1"

var f2 = function () {};
f2.name     // "f2"
var f3 = function myName() {};
f3.name     // 'myName'

// 3-2 形参长度 length
// length属性返回函数预期传入的参数个数
function f(a, b) {}
f.length    // 2

// 3-3 源码字符串 toString()
// toString()方法返回函数的源码字符串(注释部分也会输出到toString()中)
// 若目标函数属于原生函数,函数体部分会被省略为[native code]
Math.sqrt.toString()  // "function sqrt() { [native code] }"
function f() {/*
  这是一个
  多行注释
*/}
f.toString()  // "function f(){/*//   这是一个//   多行注释// */}"

// 3-4 实参数组 arguments
// arguments属性是数组类型,包含函数运行时的所有参数,数组的实际长度为调用函数传递的实参个数
// (由于arguments数组类型的特性,可以通过<函数>.arguments.length获取实参个数)
// 默认情况下,对arguments数组的修改会反映到函数参数上
// 严格模式(use scrict)下,对arguments数组的修改不会影响到实际的函数参数
var f = function (one) {
    console.log(arguments[0]);
    console.log(arguments[1]);
    console.log(arguments[2]);
}
f(1, 2, 3)      // 1 2 3
var f = function(a, b) {
    'use strict';    // 开启严格模式
    arguments[0] = 3;
    arguments[1] = 2;
    return a + b;
}
f(1, 1)       // 5(未开启严格模式)
f(1, 1)       // 2(开启严格模式)


// 4-函数的特殊参数形式
// 4-1 默认参数
// 声明函数时使用=运算符可以为形参赋默认值,没有默认参数的默认值为undefined
// JS函数调用可以传递任意数量的参数,当参数数量少于预期数量时,靠后的参数会使用默认值代替
function sayHi(name="小明", age=18) {}
sayHi();                            // 小明,18
sayHi('小红');                // 小红,18
sayHi('小刚', 21);       // 小刚,21

// 4-2 同名参数
// 声明函数时如果存在同名参数,以声明顺序最后的同名参数为准
// 被忽略的同名参数同样会匹配不同位置的实参,如果最后的同名参数没有实参,那么直接使用最后的默认值
function f(a, a) {
    console.log(a);
}
f(1, 2)     // (1,2) => 2
f(1)           // (1,undefined) => undefined

// 4-3 剩余参数
// 可以使用...标记最后一个函数形参,用于获取调用函数时传递的多余参数
// 剩余参数在函数中视为真数组
function config(baseURL, ...other) {
    console.log(baseURL)
    console.log(other)
}
config('baidu.com', 'get', 'json');  // 'baidu.com' ['get', 'json']

// 5-箭头函数
// 箭头函数在逻辑上和普通函数相同,可以省略函数声明时的组成部分
// 箭头函数没有function关键字，因此没有函数名提升的特性
// 箭头函数不能使用arguments属性获取实参,只能通过标识剩余参数来实现相同效果
const getSum = (...arr) => {
    let sum = 0
    // 通过剩余参数获取实参列表
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum
}

// 6-立即执行函数
// 在函数定义后添加括号(),可以实现函数定义之后被立即调用
// 立即执行函数的function关键字不能放在该行代码的顶格,因为function关键字既可以当做语句,也可以当做表达式
var f = function f(){}();

// 通常我们不希望定义一个变量存放立即执行函数
// 可以使用括号,表达式等配合立即执行函数解决问题(使用括号是常见的选择):
(function(){})();
(function(){}());
true && function(){}();
0, function(){}();
