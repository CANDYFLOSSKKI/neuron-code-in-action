// symbol类型

// 1-symbol值的生成
// 每个symbol值都是独一无二的,与其他任何值都不相等
// symbol值通过Symbol()函数生成
let x:symbol = Symbol();
let y:symbol = Symbol();


// 2-Symbol值类型unique symbol
// unique symbol用于表示具体的symbol值,它是symbol的子类型
// unique symbol值必须使用const声明(默认的类型推断就是unique symbol,可以省略类型声明)
const xu:unique symbol = Symbol();
const yu:symbol = xu;   // 子类型值赋给父类型

// 不同的unique symbol类型之间不能互相赋值
// 要想创建相同类型的unique symbol,可以使用typeof实现
const a:unique symbol = Symbol();
const b:typeof a = a;

// 使用Symbol.for()创建unique symbol值,可能会出现不同类型但值相同的情况
const as:unique symbol = Symbol.for('foo');
const bs:unique symbol = Symbol.for('foo');


// 3-symbol值的应用
// 和JS的应用方式相同,通常使用unique symbol类型变量作为属性值
// (symbol类型包含所有的symbol值,作为属性值没有特定值的特性)
const xusp:unique symbol = Symbol();
interface Foo {
    [xusp]: string;
}
class C {
    // 作为类属性时,修饰符必须是static readonly的,保证属性固定不变
    static readonly foo:unique symbol = Symbol();
}


// 4-symbol的类型推断
let s1 = Symbol();  // ①let声明的变量,推断类型为symbol
const s2 = Symbol();         // ②const声明的变量,推断类型为unique symbol
const s3 = s1;      // ③const声明的变量赋值为另一个symbol,推断类型为symbol
let s4 = s2;        // ④let声明的变量赋值为另一个unique symbol,推断类型为symbol

