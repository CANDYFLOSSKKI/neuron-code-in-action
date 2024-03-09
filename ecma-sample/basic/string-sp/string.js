// 字符串类型

// 1-字符串的定义方式
// ①使用字面量定义的字符串是string类型
// ②使用String构造函数定义的字符串是object类型
// (String构造函数通常用于类型转换而不用于定义字符串,可以将其他类型的值强制转为字符串)

// 1-1 字面量定义
var s1 = 'abc'
typeof s1             // "string-sp"

// 1-2 String构造函数定义
var s2 = new String('abd')
typeof s2            // "object"
s2.valueOf()         // "abc"

// 1-3 使用String构造函数实现强转
String(true)  // "true"
String(5)     // "5"


// 2-多行字符串分行定义
// ①在每行的末尾使用反斜杠转义换行
var longString = 'Long \
long \
long \
string-sp';

// ②使用加号+连接多个单行字符串
var longString = 'Long '
    + 'long '
    + 'long '
    + 'string';

// ③多行注释函数转字符串(利用toString()方法,返回的字符串包含注释）
(function () { /*
line 1
line 2
line 3
*/}).toString().split('\n').slice(1, -1).join('\n')


// 3-模版字符串
// 模板字符串使用反引号``标识,是字符串的增强和扩展
// 模板字符串定义多行字符串时,将会保存从`开始的所有空格,缩进和换行符(也可以调用trim()处理换行符)
`string text`
`string text line 1
 string text line 2`

// 3-1 模版字符串嵌入动态结构
// 模板字符串中可以添加插值表达式${}结构,在大括号内可以嵌入变量,表达式和函数调用等
// 表达式内的值必须是字符串类型(否则自动转换)
let x = 1;
let y = 2;
`${x} + ${y * 2} = ${x + y * 2}`
function fn() {return "Hello World"}
`foo ${fn()} bar`

// 插值表达式${}内部还可以嵌套模版字符串
// 内部模板字符串中的``和外部的``不构成冲突,不需要进行转义操作
const tmpl = addr_s => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;

// 3-2 标签模版参数
// 标签模板是函数调用的特殊形式,调用时按规则解析模板字符串作为函数参数
// 标签模板要求目标函数包含两个参数:①字符串数组;②用...表示的剩余参数
// ①字符串数组:以模板字符串的插值表达式为间隔,按顺序依次截取字符串片段组成字符串数组
//            （如果插值表达式位于字符串开头或末尾，字符串数组中会包含空字符串元素）
// ②剩余参数:模板字符串中的每个插值表达式都看作单独的函数参数
function myTagFunction(strings, ...values) {
    console.log(strings);  // 字符串片段数组
    console.log(values);   // 包含插值表达式计算结果的数组
}
name = "John";
age = 30;
myTagFunction`Hello, ${name}! I'm ${age} years old.`;
// strings = ['Hello, ', '! I'm ', ' years old.']
// values[0] = name
// values[1] = age


// 4-字符串的遍历方式
// ①整数索引遍历
// 字符串可看作字符数组,可以通过整数索引器访问到字符串中的每个字符
// 字符串的字符数组只可读不可写,长度固定.访问非法的索引值时返回undefined
var s = 'hello';
s[0]  // "h"
s[1]  // "e"
s[4]  // "o"
s[-1] // undefined

// ②for-of
// for-of是ES6的新增特性,使用迭代器循环遍历字符串
// 原始的for循环无法识别大于OxFFFF的码点,会将该字符分割成两个不可打印的字符
// for-of循环可以识别大于0xFFFF的码点
let text = String.fromCodePoint(0x20BB7);
// ①采用原始for循环(无法识别该字符,改为打印两个字符)
for (let i = 0; i < text.length; i++) {
    console.log(text[i]);   // " "和" "
}
// ②采用for-of循环(可以识别该字符)
for (let i of text) {
    console.log(i);         // "𠮷"
}
