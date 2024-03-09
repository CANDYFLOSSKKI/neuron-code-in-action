// Symbol类型
// Symbol用于标识独一无二的值的原始数据类型,每个Symbol值都是不相等的

// 1-Symbol的定义方式
// Symbol值可以通过Symbol()定义，也可以使用ES6新增的内置Symbol值
// Symbol定义时可以指定字符串属性description用于输出时描述
// (即使两个Symbol值的description属性相同,它们也是不相等的)
let s1 = Symbol('foo');
let s2 = Symbol('bar');
s1.description      // "foo"
s2.description      // "bar"

// 1-1 Symbol值的类型转换
// Symbol变量支持类型转换为字符串和布尔值(始终为true),不支持转换为数值
s1.toString()       // "Symbol(foo)"
s2.toString()       // "Symbol(bar)"
Boolean(s1)         // true
Boolean(s2)         // true


// 2-Symbol隐藏属性
// Symbol通常作为对象的属性标识符,定义不会发生冲突的属性名,防止某个键在多模块系统中被改写或覆盖
// Symbol值作为对象属性名时,不能使用点运算符访问属性,必须在索引器中传递变量
// (点运算符默认识别为字符串类型,导致识别到的是Symbol()值对应的变量名字符串)
let mySymbol = Symbol();
// ①声明后定义隐藏属性
let a = {};
a[mySymbol] = 'Hello!';

// ②声明时定义隐藏属性
let a = {
    [mySymbol]: 'Hello!'
};

// ③Object.defineProperty()定义隐藏属性
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
a.mySymbol      // × 访问以'mySymbol'字符串为键的属性
a['mySymbol']   // × 访问以'mySymbol'字符串为键的属性
a[mySymbol]     // √ 访问以mySymbol = Symbol()的Symbol值为键的属性

// 2-1 获取隐藏的Symbol属性
// Symbol值作为对象属性名时,属性不会在通常的对象属性遍历方法中出现
// ①Object.getOwnPropertySymbols() 获取所有Symbol属性名组成的数组
const obj = {};
let a = Symbol('a');
let b = Symbol('b');
obj[a] = 'Hello';
obj[b] = 'World';
Object.getOwnPropertySymbols(obj);    // [Symbol(a), Symbol(b)]

// ②Reflect.ownKeys() 获取所有类型的键名组成的数组
let obj = {
    [Symbol('my_key')]: 1,
    enum: 2,
    nonEnum: 3
};
Reflect.ownKeys(obj)    // ["enum", "nonEnum", Symbol(my_key)]


// 3-魔术字符串
// 魔术字符串泛指在代码中多次出现,和代码耦合程度高的静态字符串或数值
// 要实现代码的可维护性,通常将魔术字符串封装为变量处理,实现变量的一次更改,处处生效
switch (shape) {
    case 'Triangle':  //Triangle为魔术字符串
        area = .5 * width * height;
        break;
}
// ①改写为普通对象属性
const shapeType = {
    triangle: 'Triangle'
};

// ②改写为Symbol值
// 改写为Symbol值的条件是,魔术字符串真正等于哪个值不重要,仅仅为了和其他的情况区分
const shapeType = {
    triangle: Symbol()
};


// 4-全局登记
// 全局登记机制的核心是Symbol.for()
// ①Symbol():参数description只作为描述使用,相同的参数仍然是不同的Symbol值
// ②Symbol.for():参数key以键名形式存储在全局环境,相同的key对应相同的Symbol值
// (Symbol.for()先检查是否存在相同key的Symbol值,存在该key则直接返回已有的Symbol值)
// Symbol()和Symbol.for()的Symbol值不互通
Symbol.for("bar") === Symbol.for("bar")         // true
Symbol("bar") === Symbol("bar")     // false

// 4-1 判断相同的Symbol值 Symbol.keyFor()
// Symbol.keyFor()传递Symbol值参数,如果有相同的就返回key;如果没有相同的返回undefined
let s1 = Symbol.for("foo");
Symbol.keyFor(s1)       // "foo"
let s2 = Symbol("foo");
Symbol.keyFor(s2)       // undefined
