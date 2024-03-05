// 类型断言

// 1-类型断言的语法
// ①<Type>value
// ②value as Type
let fooas = 'a';
let baras1:string = <string>fooas;
let baras2:string = fooas as string;

// 1-1 类型断言的常见应用场景
// 类型断言可用于忽略部分对象属性的类型转换(以下两种方式均可通过)
const p0:{ x: number } =
    { x: 0, y: 0 } as { x: number };
const p1:{ x: number } =
    { x: 0, y: 0 } as { x: number; y: number };

// 类型断言可用于指定unknown/联合类型等不确定类型变量的具体类型
const values1:unknown = 'Hello World';
const values2:string = values1 as string;       // unknown类型

const combines1:number|string = 'hello';
const combines2:string = combines1 as string;   // 联合类型

// 1-2 类型断言的使用前提
// 类型断言要求两个类型之间存在父子关系(谁是父类型取决于场景)
// 如果要将变量断言为完全无关的类型,可经过下面两次转换实现:
//  ①第一次转换,转换为顶层类型any或unknown(和所有类型都有父子关系)
//  ②第二次转换,转换为目标类型T
const p0str:string = p0 as unknown as string;


// 2-常量断言
// as const可将let定义的变量的推断类型更改为值类型(使得变量不可更改)
// let定义变量默认为更高层次的父类型,有些时候可能导致父类型不能代替子类型的错误
let str1 = 'JavaScript';                 // string
let str2 = 'JavaScript' as const;  // 'JavaScript'

// as const只能跟在字面量值后,不能跟在变量后(比如str as const)
// as const不能用于表达式

// 常量断言广泛用于基本数据类型中:
const v3 = {
    x: 1,
    y: 2,
} as const;  // { readonly x: 1; readonly y: 2; }

const a11 = [1, 2, 3];          // number[]
const a21 = [1, 2, 3] as const;  // readonly [1, 2, 3]

enum FooEnum {X, Y,}
let e1 = FooEnum.X;              // FooEnum
let e2 = FooEnum.X as const;   // FooEnum.X

const nums = [1, 2] as const;
const total = add(...nums);


// 3-非空断言
// 在变量后添加感叹号x!可表示此处的变量不会为空(undefined或null)
// 使用非空断言可以减少变量非空检查的判断逻辑
function validateNumber(e?:number|null) {}
function f(x?:number|null) {
    validateNumber(x);
    console.log(x!.toFixed());
}


// 4-断言函数
// 断言函数指的是判断参数是否是特定类型的一种函数类型
// TS为断言函数添加了新的类型写法,返回值类型设置为:assert value is T
//  ①value是函数的参数名,标识断言函数要判断的参数
//  ②T是预期的参数类型,标识参数为什么类型时满足断言函数要求
// 使用assert式的断言函数写法后,返回值必须是void(不满足时直接抛出错误)
function isString(value:unknown):asserts value is string {
    if (typeof value !== 'string')
        throw new Error('Not a string');
}

// ①断言函数判断参数非空(不为undefined或null)时,更改类型为NonNullable<T>:
function assertIsDefined<T>(value:T):asserts value is NonNullable<T> {}

// ②断言函数判断参数为真(不为false,undefined或null)时,简写类型:
function assertIsTrue(x:unknown):asserts x {}
