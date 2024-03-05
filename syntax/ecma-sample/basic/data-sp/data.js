// 数值和特殊数值类型

// 1-null和undefined
// null表示空值和空的对象(通常是人为或函数指定的值)
// undefined表示此处未定义(通常时未经任何变化的原始值)
function f(x) {return x;}
function g() {}
var  o = {}
var i   // 声明但未赋值的变量,变量值默认为undefined
f()     // 参数值为空,参数值默认为undefined
o.p     // 对象没有赋值的属性,默认为undefined
g()     // 函数体为空,返回值默认为undefined

// 1-1 null和undefined参与的判断
// 在if判断语句中,null和undefined都会被自动转换为false
if (!undefined) {}  // 不会执行
if (!null) {}       // 不会执行
undefined == null   // true

// 1-2 null和undefined参与的计算
// null转为数值时为0
// undefined转为数值时为NaN
Number(null)       // 0
i = 5 + null             // 5
Number(undefined)  // NaN
i = 5 + undefined        // NaN


// 2-布尔值
// JS的布尔值支持自动转型,转型规则如下:
// 只有①undefined;②null;③false;④0;⑤NaN;⑥空字符串""/''视为false,其他值均视为true
// 空数组[]和空对象{}同样视为true
if ('') {}  // false
if ([]) {}  // true
if ({}) {}  // true


// 3-数值类型
// JS底层所有数值都以浮点数形式存储,大于2^53将无法表示,因此JS只能精确表示15位十进制数:
//  第1位:            符号位,0表示正数,1表示负数
//  2~12位(共11位):   指数部分
//  13~64位(共52位):  小数部分(即有效数字)
// 浮点数计算的结果是不精确的
0.1 + 0.2 === 0.3;            // false
0.3 / 0.1;                    // 2.9999999999999996
(0.3 - 0.2) === (0.2 - 0.1);  // false

// 3-1 数值溢出
// 正向的数值溢出(数值太大)返回Infinity
// 负向的数值溢出(数值太小(接近0))返回0
// 可以使用预定义的MAX_VALUE和MIN_VALUE调取可表示的最大/最小值
Math.pow(2, 1024)   // Infinity
Math.pow(2, -1075)  // 0
i = Number.MAX_VALUE      // 1.7976931348623157e+308
i = Number.MIN_VALUE      // 5e-324

// 3-2 数值进制表示法
// ①十进制:    没有前导0的数值
// ②八进制:    有前缀0o或0O的数值;或者有前导0且只用到0-7的八个阿拉伯数字的数值(ES6不支持八进制)
// ③十六进制:  有前缀0x或0X的数值
// ④二进制:    有前缀0b或0B的数值
i = 0xff    // 255
i = 0o377   // 255
i = 0b11    // 3


// 4-特殊数值
// 4-1 正零+0和负零-0
// 只有当做分母时,+0和-0才不等价,绝大多数场合他们都是相等的
i = -0 === +0;          // true
i = 0 === -0;           // true
i = 0 === +0;           // true
(-0).toString()         // '0'
(+0).toString()         // '0'
(1 / +0) === (1 / -0)   // false

// 4-2 非数字NaN
// 虽然用来表示非数字,但NaN仍然是number数值类型
// NaN通常出现在字符串解析数字错误,或数学函数计算错误的场合
5 - 'x'           // NaN(字符串解析数字错误)
Math.acos(2)   // NaN(数学函数无法计算)
Math.log(-1)      // NaN
Math.sqrt(-1)  // NaN
0 / 0             // NaN(0除以0)

// NaN的特殊运算规则如下:
NaN === NaN         // false
[NaN].indexOf(NaN)  // -1
Boolean(NaN)        // false
NaN + 32            // NaN
NaN - 32            // NaN
NaN * 32            // NaN
NaN / 32            // NaN

// 4-3 无穷Infinity
// 当数值溢出无法表示,或非零数除以0时就会返回Infinity
// Infinity有正负之分,两者不相等,由除运算的分子符号和分母符号(+0/-0)共同决定
Math.pow(2, 1024)   // Infinity(数值正向溢出)
1 / 0                     // Infinity(非零数除以0)
1 / -0                    // -Infinity
-1 / -0                   // Infinity

// Infinity的特殊运算规则如下:
Infinity === -Infinity    // false
Infinity > 1000           // true
-Infinity < -1000         // true
Infinity > NaN            // false(和NaN相比始终返回false)
5 * Infinity              // Infinity
5 - Infinity              // -Infinity
Infinity / 5              // Infinity
5 / Infinity              // 0
0 * Infinity              // NaN
0 / Infinity              // 0
Infinity / 0              // Infinity
Infinity + Infinity       // Infinity
Infinity * Infinity       // Infinity
Infinity - Infinity       // NaN
Infinity / Infinity       // NaN
null * Infinity           // NaN(和null运算等同于和0运算)
null / Infinity           // 0
Infinity / null           // Infinity
undefined + Infinity      // NaN(和undefined运算始终返回NaN)


// 5-数值方法(源生)
// ①字符串转整数 parseInt()
// 如果中途无法继续转换,只返回已经转换好的部分
// 如果第一个字符就转换失败,返回NaN
// 可以指定第二个参数radix,表示转换后指定的进制(转换规则同上)
parseInt('123')    // 123
parseInt('   81')  // 81
parseInt('12**')   // 12
parseInt('abc')    // NaN
parseInt('0x10')   // 16(0x开头按照十六进制解析)
parseInt('011')    // 11(0开头按照十进制解析)
parseInt('1000', 10)  // 1000
parseInt('1000', 2)   // 8
parseInt('1546', 2)   // 1(只转换了开头的1)
parseInt('546', 2)    // NaN(无法转换返回NaN)

// ②字符串转浮点数 parseFloat()
// 自动忽略字符串前导的空格,且支持科学计数法
// 转换失败时的规则同parseInt()
parseFloat('3.14')            // 3.14
parseFloat('314e-2')          // 3.14
parseFloat('\t\v\r12.34\n ')  // 12.34
parseFloat('3.14more')        // 3.14
parseFloat([])                // NaN

// ③判断NaN isNaN()
// 函数只对数值参数有效
// 字符串,对象和数组参数都会返回true;空数组或只有一个成员的数组返回false
isNaN(NaN)              // true
isNaN(123)      // false
isNaN({})       // true
isNaN(['xzy'])  // true
isNaN([])       // false
isNaN([123])    // false
isNaN(['123'])  // false

// ④判断正常数值 isFinite()
// 除Infinity,-Infinity,NaN和undefined外,其他数值均返回true
isFinite(Infinity)            // false
isFinite(-Infinity)           // false
isFinite(NaN)                 // false
isFinite(undefined)   // false
isFinite(null)       // true
isFinite(-1)         // true


// 6-数值方法(ES6)
// ①判断数值是否有限 Number.isFinite()
// 如果参数类型不是数值或是NaN,Infinity,始终返回false
Number.isFinite(15);      // true
Number.isFinite(0.8);     // true
Number.isFinite(NaN);             // false
Number.isFinite(Infinity);        // false
Number.isFinite(-Infinity);       // false
Number.isFinite('foo');  // false
Number.isFinite('15');   // false
Number.isFinite(true);   // false

// ②判断数值是否为NaN Number.isNaN()
// 如果参数不是NaN,始终返回false
Number.isNaN(NaN)                      // true
Number.isNaN(15)               // false
Number.isNaN('15')             // false
Number.isNaN(true)             // false
Number.isNaN(9/NaN)            // true
Number.isNaN('true' / 0)       // true
Number.isNaN('true' / 'true')  // true

// ③数值转换(仅转化为Number对象的方法,行为保持不变)
// Number.parseInt()
// Number.parseFloat()
Number.parseInt === parseInt        // true
Number.parseFloat === parseFloat    // true

// ④判断数值是否为整数 Number.isInteger()
// 由于JS的特殊数值表示法,相同数值的浮点数和整数都会识别为整数
// 参数不是数值类型时,始终返回false
Number.isInteger(25)    // true
Number.isInteger(25.0)  // true
Number.isInteger(25.1)  // false
Number.isInteger()              // false
Number.isInteger(null)  // false
Number.isInteger('15')  // false
Number.isInteger(true)  // false

// ⑤最小误差常量Number.EPSILON
// Number.EPSILON可用来表示误差范围,比如*Math.pow(2,2)就表示2^-50的误差范围
// 引入最小误差常量后,浮点数之间的运算结果判断就可以变得准确了
function withinErrorMargin (left, right) {
    return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}
0.1 + 0.2 === 0.3                              // false
withinErrorMargin(0.1 + 0.2, 0.3)   // true
1.1 + 1.3 === 2.4                              // false
withinErrorMargin(1.1 + 1.3, 2.4)   // true
