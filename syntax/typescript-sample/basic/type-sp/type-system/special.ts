// 特殊类型

// ①顶层类型:所有其他类型的全集,包含所有的可能,包括any和unknown,可以接收任何类型
// ②底层类型:所有其他类型的共有类型,包括never,可以赋值给任何类型
// ③子类型和父类型:任何父类型可以出现的地方,子类型都可以出现

// 1-any类型
// any类型表示没有任何限制,变量可以赋予任意类型的值(常用于JS向TS迁移时变量的临时类型声明)
// TS不会对any类型变量进行类型检查,也不会对其可能产生的类型问题报错
let xa:any;
xa = 1;
xa = 'foo';
xa = true;

// 当变量无法推断出类型时,TS默认该变量的类型是any
// 使用let和var声明变量不赋值时,需要显式声明类型,避免推断为any类型
var x1;  // (var)无类型无初始化的声明,默认any类型
let y1;  // (let)无类型无初始化的声明,默认any类型

// any类型变量可以随意赋值给其他类型的变量,这样操作可能会引起变量污染
// 赋值操作之后对变量的操作依然遵循变量声明时的类型限制,容易发生错误
let x2:any = 'hello';
let y2:number;
y2 = x2;
y2 *= 123  // 类型检查仍然认为y2是声明时的number类型,不会报错


// 2-unknown类型
// unknown类型表示类型不确定,变量可能是任意类型
// 所有类型的值都可以分配给unknown类型
let xun:unknown;
xun = true;
xun = 42;

// unknown在any的基础上可防止变量污染,使用上存在如下的限制:
//  ①unknown类型的变量不能直接赋值给其他类型的变量
//  ②不能直接调用unknown类型变量的方法和属性
//  ③unknown类型变量只能进行比较运算,取反运算,typeof和instanceof,其他运算均报错

// unknown类型变量必须经过typeof显式类型缩小才能使用:
let aun:unknown = 1;
if (typeof aun === 'number') {  // 类型缩小为number类型
    let r = aun + 10;
}


// 3-never类型
// never类型表示空类型,不包含任何值,对never变量的赋值操作都会报错
// never主要用于类型判断中作为默认的选项:
function fn(x:string|number) {
    if (typeof x === 'string') {                  // x为string类型
    } else if (typeof x === 'number') {           // x为number类型
    } else { console.log("typeof x is never"); }  // (补集)x为never类型
}

// 当函数没有返回值时,可以设置其返回值类型为never
// TS规定任何类型都包含never类型,可以赋值never类型给其他类型
function f():never {
    throw new Error('Error');
}
let v1:number = f();


// 4-undefined和null类型
// TS中的undefined和null既是值又是类型,任何其他类型的变量都可以赋值为undefined和null
// (undefined和null在JS中表示的意义不同,和TS中的行为一致)
let xs:any     = undefined;
let ys:unknown = null;

// TS提供编译器选项strictNullChecks,开启后undefined和null不能赋值给其他类型的变量
// (any和unknown类型的变量不受影响,他们始终是所有类型的超集)
//      tsconfig.json:
//      {
//          "compilerOptions": {
//              "strictNullChecks": true
//          }
//      }


// 5-值类型
// TS中单个值也是一种类型,称为值类型
// 值类型限定了变量只能赋值为特定值,赋值相同类型的其他值也会报错
// const声明的值类型变量(对象例外)如果没有显式指定类型,默认为对应的值类型
const xc = { foo: 1 };  // 类型为{ foo: number }

// 值类型可以赋值给他的父类型,反之不成立
let xc1:5 = 5;
let yc1:number = xc1;
