// 运算符

// 1-数值运算符+/-
// +运算符可以将任何值转换为数值输出,不改变原变量的值
// -运算符可以将任何值转换为+相反的数值,连续使用两个-时等同于数值运算符(两个-之间用括号隔开)
var x = 1;
x = +true   // 1
x = +[]     // 0
x = +{}     // NaN
x = -x      // -1
x = -(-x)   // 1


// 2-指数运算符**
// 指数运算符的运算规则为<底数>**<指数>
// 多个**可以结合运算,结合顺序从右向左(最右侧的两个操作数指数运算结果作为新的指数,参与下一步运算)
2 ** 3 ** 2    // 2 ** (3 ** 2) = 512


// 3-比较运算符<>
// ①比较的两个值都是字符串时,按照首字符的Unicode码点值比较,相等则比较下个字符
// ②比较的两个值都是原始类型时,转换为数值再比较(注意只要有NaN比较结果就为false)
// ③比较的两个值中有对象时,先将对象转换为原始类型再比较
// (先调用对象的valueOf()方法,如果返回值还是对象,再调用toString()方法转换为字符串)
// ①比较两个字符串
'cat' > 'dog'       // false
'cat' > 'catalog'   // false

// ②比较两个原始类型
true > false        // (Number(true) > Number(false)) => true
5 > '4'             // 5 > 4 => true

// ③比较两个对象
var x = [2];
x > '11'            // x.valueOf().toString()='2' > '11' => true


// 4-相等和严格相等运算符==/===
// 相等运算符==比较两个值是否相等,不同类型会转换为相同类型比较(建议只使用严格相等)
// 严格相等运算符===比较它们是否为同一个值,不同类型直接返回false,特殊规则如下:
//  ①NaN和任何值都不相等
//  ②+0和-0相等
//  ③undefined和null只有互相比较或者和自身比较时才相等
//  ④复合类型(对象/数组/函数等)的比较结果取决于是否指向相同的引用地址
i = NaN === NaN                           // false
i = +0 === -0                             // true
i = undefined === undefined               // true
i = null === null                         // true
i = {} === {}                             // false
i = [] === []                             // false
i = (function () {} === function () {})   // false


// 5-表达式求值运算符,
// 表达式求值运算符(逗号运算符)用于对两个表达式求值,返回后一个表达式的值
// 通常用于将表达式操作和返回值绑定,先执行操作再返回逗号后的值
var value = (console.log('Hi!'), true);
value   // 输出Hi! 返回true


// 6-链判断运算符
// 链判断运算符?.可以用于短路判断对象是否存在并执行对应策略
//  ①obj?.prop         访问对象属性前判断属性是否存在,不存在则返回undefined
//  ②obj?.[expr]       访问数组元素前判断元素是否存在,不存在则返回undefined
//  ③func?.(...args)   调用方法前判断方法是否存在,不存在则返回undefined
a?.b     // 等同于=>
a == null ? undefined : a.b

a?.[x]  // 等同于=>
a == null ? undefined : a[x]

a?.b()  // 等同于=>
a == null ? undefined : a.b()

a?.()   // 等同于=>
a == null ? undefined : a()


// 7-null判断运算符??
// null判断运算符??可以指定表达式的默认值
// 运算符左侧为null或undefined时,返回右侧的值作为代替
const headerText = response.settings.headerText ?? 'Hello, world!';
const animationDuration = response.settings.animationDuration ?? 300;
const showSplashScreen = response.settings.showSplashScreen ?? true;


// 8-扩展运算符
// 扩展运算符和剩余参数使用相同的运算符,可以看作剩余参数的逆运算
// ①在数组变量或字面量前标识扩展运算符,可以将数组转换为逗号分隔的参数序列
// ②在函数参数中共同使用扩展运算符和剩余参数,可以实现灵活的参数传递
console.log(...[1, 2, 3])           // 1 2 3
console.log(1, ...[2, 3, 4], 5)     // 1 2 3 4 5
i = [...document.querySelectorAll('div')]   // [<div>, <div>, <div>]
function f(v, w, x, y, z) { }
const args = [0, 1];
f(-1, ...args, 2, ...[3]);      // -1 0 1 2 3

// 8-1 扩展运算符实现解构赋值
// 扩展运算符用于数组的解构赋值时,只能放在参数列表的末尾
const [first, ...rest] = [1, 2, 3, 4, 5];
first   // 1
rest    // [2, 3, 4, 5]

const [first, ...rest] = [];
first   // undefined
rest    // []

const [first, ...rest] = ["foo"];
first   // "foo"
rest    // []
