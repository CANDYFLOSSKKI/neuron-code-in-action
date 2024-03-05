// 对象

// 1-对象的类型声明
// 对象的属性名是可以实现键值索引的,相较于元组来说非常重要
// 对象声明属性采用<属性名>:<属性类型>的方式,属性声明可以用;也可以用,结尾

// 对象中的方法使用函数类型描述
// ①普通函数类型: 如add(x:number, y:number): number;
// ②箭头函数类型: 如add: (x:number, y:number) => number;
const obj:{
    x: number;
    y: number;
    add:(x:number, y:number) => number;
} = {
    x: 1,
    y: 1,
    add:(x:number, y:number) => x+y,
};

// 对象的类型声明也可以提取到type或接口中
type MyObjByType = {
    x:number;
    y:number;
};
interface MyObjByInf {
    x: number;
    y: number;
}

// 2-对象的读取操作
// 对象声明类型后,赋值的属性不能多也不能少,赋值操作只能以逗号,结尾
// 读写对象中的属性可以使用点运算符.,也可以使用键值索引[],不能访问不存在的属性
const xfromobj = obj.x;      // 点运算符
const yfrompobj = obj["y"];  // 键值索引

// 对象类型中已经存在的属性不能删除,但可以进行修改
obj.x = 3;

// 对对象的类型使用键值索引,可以获取对象属性的类型
type User = {
    name: string,
    age: number
};
type Name = User['name'];  // string


// 3-对象属性的变体
// 3-1 可选属性
// 在对象的属性名后加问号?,可表标识该属性是可选属性
// 可选属性相当于允许该属性取undefined,但联合类型必须显式赋值,可选属性有默认值undefined
// (设置编译选项ExactOptionalPropertyTypes和strictNullChecks时,可选属性不能设为undefined)
type UserCanUnd = {
    firstName: string;
    lastName?: string;
};

// 获取可选属性时,通常使用??运算符判断默认值的情况(比三元运算符要简便)
const user:UserCanUnd = { firstName: 'Foo'};
let firstName = user.firstName ?? 'Foo';
let lastName = user.lastName ?? 'Bar';

// 3-2 只读属性
// 在对象的属性名前加readonly,可标识该属性是只读属性,不能修改
// 只读属性不是在任何时候都不能修改,而是只能在对象初始化的时候对其赋值
type Point = {
    readonly x: number;
    readonly y: number;
};
const p:Point = { x: 0, y: 0 };

// 在对象初始化后添加只读断言as const也可以实现只读的效果
// as const只在对象没有指定类型时生效,如果属性明确为可写的类型,as const不起作用
const myUser = {
    name: "Sabrina",
} as const;

// 只读属性的例外可修改情况如下:
// ①只读属性是对象类型,则除非完全替换该对象,对象属性内部的操作不会触发只读的报错
// ②只读属性引用外部的可写属性,对可写属性的修改会反映到只读属性上
let wCanP:{
    name: string;
    age: number;
} = {name:'Vicky',age:42};
let rOnlyP:{
    readonly name: string;
    readonly age: number;
} = wCanP;                // 引用可写对象为属性赋值
wCanP.age++;              // w.age = 43
console.log(rOnlyP.age);  // r.age = 43,w的修改会反映到引用的r上,使得只读属性值变化


// 3-3 属性名的索引属性
// 如果对象中有很多形式类似的属性时,可以使用属性名表达式代替,简化表达
// [property: string]: T    表示属性名为字符串,属性值类型为T的所有属性
// [property: number]: T    表示属性名为数字,属性值类型为T的所有属性
// [property: symbol]: T    表示属性名为symbol,属性值类型为T的所有属性
type MyObj = {
    [property: string]: string
};
const testObj:MyObj = {
    foo: 'a',   // property = 'foo'
    bar: 'b',   // property = 'bar'
    baz: 'c',   // property = 'baz'
};

// ①对象类型内部不能同时定义数值索引和字符串索引
//  (JS中所有数值属性名都会自动转为字符串属性名,因此都以字符串索引为准)
// ②对象类型内部不能出现属性名符合索引,属性值不符合的例外属性
type MyType = {
    // foo: boolean;  属性名符合字符串索引,属性值不是对应的string类型,产生冲突
    [x: string]: string;
}
// ③属性名索引属性可用于数组,但是数组相关的方法和属性(如长度length)无法使用
const arr: { [n:number]: number; } = [1, 2, 3];


// 4-对象的解构赋值
// 解构赋值用于从对象中提取属性,并声明外部与属性名同名的变量
const product = {
    id: 1,
    pname: 'product',
    price: 114514,
}
const {id, pname, price} = product;

// 解构赋值{}中的冒号:指定的是变量别名而非类型,指定类型通过{}外的冒号:进行
let { x: foo1, y: bar1 } = obj;      // 声明别名foo1和bar1的变量
let { x: foo2, y: bar2 }:{ x: any; y: number } = obj;  // 声明变量的同时指定类型


// 5-对象的结构类型
// 只要对象B满足对象A的结构特征,TS就认为对象B兼容对象A的类型
// 对象B类型兼容对象A类型时,可以使用A的地方就可以使用B(包括A的赋值语句),B是A的子类型
// TS检查某个值是否符合指定类型时,并不是检查值的类型名,而是检查值的结构类型是否符合要求
type AType = { x: number; };
type BType = { x: number; y: number; };  // B类型兼容A结构类型,属于A的子类型

// 5-1 结构类型的参数遍历错误
// 结构类型使得Object.keys()这类全局遍历语句可能出现预期之外的错误
// 原本设定的对象中属性都是相同类型的,传入结构类型后可能包含不同类型的属性,导致处理方法报错
function getSum(obj:BType) {
    let sum = 0;
    for (const n of Object.keys(obj)) {
        // const v = obj[n];  报错,obj[n]的类型不确定,导致v推断为any类型
    }
}

// 5-2 结构类型的最小可选属性规则
// 最小可选属性规则规定:如果某个类型的所有属性都是可选的,该类型的对象必须至少存在一个可选属性
// 规则防止了当属性都为可选属性时,对象可以为空对象,导致所有对象都与其结构相关的问题
type Options = {
    a?:number;
    b?:number;
    c?:number;
};

// 规避最小可选属性规则可以:
// ①类型内部添加索引属性[propName: string]: someType使属性数量不固定
// ②使用类型断言as T强行赋值不规范的对象
const objOpt:Options = {d: 123} as Options;


// 6-空对象
// 空对象{}是TS的特殊值,也是特殊的类型
// 空对象只能使用继承自Object.prototype的属性,不存在自定义属性
const objEmpty:{} = {};

// 空对象作为类型时等同于Object,可以接收任何类型的属性却又无法访问
interface Empty { }
const bEmpty:Empty = {myProp: 1, anotherProp: 2};  // 允许赋值但无法访问
// 可以使用值类型为never的索引属性,完全禁止对象的属性赋值操作
interface WithoutProperties {
    [key: string]: never;
}
const cEmpty:WithoutProperties = {};  // 不允许赋值任何属性(值类型限制)
