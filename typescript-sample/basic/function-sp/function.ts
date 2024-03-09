// 函数

// 1-函数的类型声明
// 函数的类型声明需要给出参数类型和返回值类型
function hello(
    txt:string  // 参数类型
):void {}       // 返回值类型(可以交由TS类型推断)

// 1-1 变量赋值形式类型声明
// 使用箭头函数分别指定参数类型(左侧)和返回值类型(右侧)
// ①声明类型时必须为参数设置参数名,函数赋值时不强制使用该参数名
// ②声明类型时的参数不是都要使用的,函数赋值时允许传入的参数不足
const helloP2: (txt:string) => void
    = function (txt) {};

// 1-2 外部类型声明
// 如果函数的类型声明较为复杂,可以提取到外部的type变量中
// 使用typeof套用已有函数的类型也是可以的
type MyFunc = (txt:string) => void;
const helloP3:MyFunc = function (txt) {};
const helloP4:typeof helloP3 = function (txt) {};

// 1-3 对象/接口类型声明
// 使用对象和接口也可以声明函数类型(内部不能有别的变量,否则将识别为对象类型)
let addFunc:{
    (x:number, y:number):number
};
interface myfn {
    (a:number, b:number): number;
}

// 1-4 内置Function类型声明
// Function类型标识变量是可以直接执行的函数
// Function类型的函数可以接受任意数量的any类型参数,返回类型也是any
function doSomething(f:Function) {
    return f(1, 2, 3);
}


// 2-箭头函数
// 箭头函数是普通函数的一种简化写法,在不同的场景下有不同的写法
// ①箭头函数用于表示函数类型:返回值写在箭头=>右侧
function greet(
    fn:(a:string) => void
):void {
    fn('world');
}

// ②箭头函数用于表示函数体:返回值写在箭头=>左侧
type Person = { name: string };
const people = ['alice', 'bob', 'jan'].map(
    // 左侧的name外部的括号()是必须的,表示箭头函数的参数整体
    (name:string):Person => ({name})
);


// 3-函数参数的变体
// 3-1 可选参数
// 在参数名后加问号?可标识参数可以忽略
// 可选参数的底层类型是联合类型<原始类型>|undefined(显式设置为该联合类型的参数不能忽略)
// 可选参数必须在参数列表的尾部
function f(x?:number) {
    // 通常定义了可选参数时,需要在函数内显式判断该参数是否正确传入
    if(x === undefined){
        return x;
    }
}
f(undefined)

// 3-2 默认值参数
// 默认值参数是可选参数的进阶形式,当参数被忽略或传入undefined时会触发默认值
// 默认值参数不强制在参数列表的末尾,如果在末尾则可以直接省略,不在末尾需要显式传递undefined
// 默认参数和可选参数不能同时使用
function add(
    x:number = 0,
    y:number
) {
    return x + y;
}
add(undefined, 1)

// 3-3 解构参数
// 参数解构通常配合外部的类型定义使用
type ABC = { a:number; b:number; c:number };
function sum({ a, b, c }:ABC) {
    console.log(a + b + c);
}

// 3-4 剩余参数
// 剩余参数可以是数组类型,也可以是元组类型
// 剩余参数还可以和其他形式的参数相嵌套,使用起来较为灵活
function joinNumbers(...nums:number[]) {}  // 数组类型剩余参数
function f1(...args:[boolean, number]) {}  // 元组类型剩余参数
function f2(...args:[boolean, ...string[]]) {}


// 4-函数返回值的变体
// 4-1 void返回值
// void类型表示函数没有返回值,除undefined和null外的返回值都会报错
// (开启编译选项strictNullChecks后,返回null也会报错)
function f3():void {
    return undefined;
}

// 函数字面量上声明void代表函数体不能有显式的返回值
// 当外部声明函数类型上指定void返回值时,该类型变量实际上可以接收任意返回值的函数
// 声明类型上的void返回值代表不关心函数返回值,执行该类型函数时使用返回值才会报错
type voidFunc = () => void;
const f4:voidFunc = () => {
    return 123;
};

// 当函数的运行结果是抛出错误时,也可以设为void返回值
function throwErr():void {
    throw new Error('something wrong');
}

// 4-2 never返回值
// never返回值代表函数不会正常执行结束,不会执行返回操作
// 如果函数能正常退出,即使没有返回值也不能设置为never,以下情况可以使用never返回值:

// ①抛出错误的函数可以使用never返回值
// (不能是return错误,必须是throw错误)
function fail(msg:string):never {
    throw new Error(msg);
}

// ②无限循环的函数可以使用never返回值
const sing = function():never {
    while (true) {
        console.log('sing');
    }
};

// 调用never返回值的函数意味着程序将在此处终止,后续的程序会有所变化
function fTestNever(x:string|undefined) {
    // 当x为undefined时,执行never返回值函数,程序终止
    if (x === undefined) {
        neverReturns();
    }
    // 只有程序正常执行才会到此处,故x会被类型推断为string而非联合类型
    console.log(typeof x);  // string
}
function neverReturns():never {
    throw new Error();
}
fTestNever("123");


// 5-构造函数
// 构造函数的类型声明需要在参数列表之前添加new命令,调用也使用new命令进行
function create(c:new() => object):object {
    return new c();  // c为object的构造函数类型
}

// 构造函数的类型也可以写成对象形式
type FuncCreate = {
    new (s:string): object;
}


// 6-函数重载
// (函数重载的声明非常复杂,通常使用联合类型代替)
// 函数重载的实现包括两个部分:
//  ①所有参数和返回值可能类型的列表
//  ②适配上述所有参数类型的函数体实现
function reverse(str:string):string;  // 可能的重载形式1
function reverse(arr:any[]):any[];    // 可能的重载形式2
// 实现重载时,类型需要适配上述的所有类型
// 内部还需要实现对不同重载情况的判断逻辑
function reverse(stringOrArray:string|any[]):string|any[] {
    if (typeof stringOrArray === 'string')
        return stringOrArray.split('').reverse().join('');
    else
        return stringOrArray.slice().reverse();
}

// 函数重载通常用于精确值的判断,这样可以避免在实现中使用联合类型
function createElement(tag:'a'):HTMLAnchorElement;       // tag='a'的对应返回值
function createElement(tag:'canvas'):HTMLCanvasElement;  // tag='canvas'的对应返回值
function createElement(tag:'table'):HTMLTableElement;    // tag='table'的对应返回值
function createElement(tag:string):HTMLElement {  // 实现时使用3个tag的共用类型string
    return new HTMLElement();
}

// 函数重载的声明也可以放在type对象内部
// 对象形式的声明可以取代函数声明,只需要最终的实现函数
type CreateElement = {
    (tag:'a'): HTMLAnchorElement;
    (tag:'canvas'): HTMLCanvasElement;
    (tag:'table'): HTMLTableElement;
    (tag:string): HTMLElement;
}
