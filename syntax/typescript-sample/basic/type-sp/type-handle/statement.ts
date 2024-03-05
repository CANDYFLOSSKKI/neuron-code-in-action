// 类型声明与组合

// 1-类型声明
// 变量后使用冒号可以声明它的类型,函数参数和返回值也可以标识类型(返回值类型在参数()之后)
// 变量实际值的类型应该与声明的类型一致,且通常变量被赋值后才能被使用
function toString(num:number):string {
    return String(num);
}
let foo:string;  // 无法使用,需要赋同为string类型的值


// 2-类型推断
// 如果变量没有进行类型声明,TS会推断其类型
// 类型声明是可选的(兼容JS),即使不加类型声明,依然是有效的TS代码,但类型推断不一定正确
// (实际上TS代码只涉及类型,不涉及值,所有跟值相关的处理都由JS完成)
function toString2(num:number) {
    return String(num);  // 推断返回值为string类型
}


// 3-联合类型
// 联合类型指的是多个类型组成的一个新类型,使用符号|表示
// 联合类型的匹配是或关系:任何类型只要属于A或B,就属于联合类型A|B
let xmt:string|number;
xmt = 123;    // 正确(匹配到number类型)
xmt = 'abc';  // 正确(匹配到string类型)

// 联合类型可以和值类型组合,标识变量的可选值(同枚举)
let setting:true|false;
let gender:'male'|'female';
let rainbowColor:'赤'|'橙'|'黄'|'绿'|'青'|'蓝'|'紫';

// 联合类型可能导致对某种特定类型的方法无法生效,此时需要缩小类型范围
function printId(id:number|string) {
    // 缩小类型范围为string,使toUpperCase()方法生效
    if (typeof id === 'string') {
        console.log(id.toUpperCase());
    } else {
        console.log(id);
    }
}


// 4-交叉类型
// 交叉类型指多个类型组成的一个新类型,使用符号&表示
// 交叉类型的匹配是与关系:任何类型必须同时属于A和B,才属于交叉类型A&B
let xx:number&string;  // 不存在既属于number又属于string的类型,因此xx实际是never类型

// 交叉类型可以为对象添加已有的属性(组合)
type A = { foo: number };
type B = A & { bar: number };  // B同时具有foo和bar两个属性


// 5-类型别名type
// type命令用于定义类型的别名,别名不允许重名
type Age = number;
let age:Age = 55;

// 类型别名可以使用表达式定义
type World = "world";
type Greeting = `hello ${World}`;  // 模版字符串读取别名World

// 类型别名的定义不是全局作用域的,只存在当前的块作用域内
// 可以定义单独的块级类型声明,仅对代码块内部有效
{
    type T = number;
    let v:T = 5;
}


// 6-类型获取typeof
// typeof运算符返回一个字符串,代表操作数的类型,TS中typeof会返回变量的TS类型
// typeof的参数只能是标识符,不能是需要运算的表达式,也不能对类型取类型
const atf = { x: 0 };
type T0 = typeof atf;    // { x: number }
type T1 = typeof atf.x;  // number


// 7-子类型和类型兼容
// 如果类型A的值可以赋值给类型B,那么类型A就称为类型B的子类型
// 父子类型之间有类似多态的调用规则:使用父类型的地方也可以换成子类型,反之不一定
let a1:'hi' = 'hi';
let b1:string = 'hello';
b1 = a1;  // 字符串的值类型被识别为string的子类型
