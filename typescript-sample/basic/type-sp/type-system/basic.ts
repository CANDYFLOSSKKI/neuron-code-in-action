// 内置基本类型

// 1-boolean类型
// boolean类型只包含true和false两个布尔值
const xb:boolean = true;
const yb:boolean = false;


// 2-string类型
// string类型包含所有字符串(包括普通字符串和模版字符串)
const xst:string = 'hello';
const yst:string = `${xst} world`;

// 模板字符串以``声明,可以使用${}引用变量
// 模版字符串变量可以引用string,number,bigint,boolean,null,undefined共6种类型
// ①模版字符串引用单个联合类型=>分配律展开
type MultiType = 'A'|'B';
type UType = `${MultiType}_id`;  // "A_id"|"B_id"

// ②模版字符串引用多个联合类型=>取交集(交叉展开)
type MultiTypeB = '1'|'2';
type VType = `${MultiType}${MultiTypeB}`;  // 'A1'|'A2'|'B1'|'B2'


// 3-number类型
// number类型包含所有整数和浮点数
const xn:number = 123;
const yn:number = 3.14;
const zn:number = 0xffff;


// 4-bigint类型
// (ES2020或更高版本)bigint类型包含所有的大整数
// bigint类型和number类型不兼容(不能存储范围内的整数和小数)
const xbi:bigint = 123n;
const ybi:bigint = 0xffffn;


// 5-symbol类型
// symbol类型包含所有的Symbol值
const xsym:symbol = Symbol();


// 6-包装类型
// 每个原始类型的值都有包装对象和字面量两种情况,类型分为大写和小写
// 通常只使用小写类型而不使用大写类型,只使用字面量而不使用包装对象(API多兼容小写而不兼容大写)

// 大写类型:同时可以接收字面量和包装对象的值
// 小写类型:只能接收字面量的值
//  ①Boolean <-->  boolean  包装对象:new Boolean()
//  ②String  <-->  string   包装对象:new String()
//  ③Number  <-->  number   包装对象:new Number()
//  ④BigInt  <-->  bigint   包装对象(无构造函数):Object(BigInt())
//  ⑤Symbol  <-->  symbol   包装对象(无构造函数):Object(Symbol())
const s1a:String = 'hello';                    // 字面量
const s2a:String = new String('hello');  // 包装对象
const s3a:string = 'hello';                    // 字面量


// 7-对象类型
// 7-1 广义对象Object类型
// Object类型代表广义对象,除undefined和null外其他任何值都可以赋值给Object类型
// 空对象{}是Object类型的简写形式,通常用空对象代替Object
let obj1:{};
obj1 = true;
obj1 = 'hi';
obj1 = 1;
obj1 = { foo: 123 };
obj1 = [1, 2];
obj1 = (a:number) => a + 1;

// 7-2 狭义对象object类型
// object类型代表狭义对象,即可以用字面量表示的对象
// object只包含对象,数组和函数,不包括原始类型的值.通常使用object表示和值类型区分的对象
let obj2:object;
obj2 = { foo: 123 };
obj2 = [1, 2];
obj2 = (a:number) => a + 1;

// Object和object类型的对象都不支持添加自定义的属性和方法,只能使用原生属性方法
const o1:Object = { foo: 0 };   // o1不包含foo属性
const o2:object = { foo: 0 };   // o2不包含foo属性
