// 元组类型

// 1-元组的类型声明
// 元组使用[]声明类型,不同成员类型使用逗号,隔开
// 元组必须要给出完整的类型声明,否则会类型推断为联合类型的数组
// 区分元组和数组的特点就是:数组的类型声明写在[]外;元组的类型声明写在[]内
const s:[string, string, boolean] = ['a', 'b', true];

// 1-1 可选成员
// 在成员类型后添加问号?,可表示成员是可选的,赋值时可以忽略
// 必须先声明必须的成员,再声明可选的成员(必选成员的位置在前)
let atp:[number, number?] = [1];
type myTuple = [number, number, number?, string?];

// 1-2 可变数量成员
// 使用扩展运算符...加数组/元组类型可以声明成员数量不确定的元组
// 扩展运算符不要求在末尾,可以插在类型声明的中间进行
type NamedNums = [string, ...number[], boolean];
const ann:NamedNums = ['A', 1, 2, true];
const bnn:NamedNums = ['B', 1, 2, 3, false];

// 1-3 命名成员
// 声明类型时可以为元组成员添加成员名,但是实际上无法调用,仅作提示使用
type Color = [
    red: number,
    green: number,
    blue: number
];


// 2-元组的访问
// 对元组的访问使用数值索引进行,不能使用成员的自定义名
// 不使用可选成员和扩展运算符时,元组的长度是固定的,越界访问会报错
const c:Color = [255, 255, 255];
console.log(c[0]);  // 255

// 对元组类型使用数值索引,可以获取对应位置成员的类型
// 将数值索引改为number,返回的将是所有成员组成的联合类型
type Tuple = [string, number, Date];
type TuplePa = Tuple[1];        // number
type TupleEl = Tuple[number];   // string|number|Date


// 3-只读元组
// 只读元组和只读数组相同,可以用readonly声明也可以用内置泛型声明
// 只读元组是元组的父类型,因此元组可以替代只读元组,反之则不行
type tuplero1 = readonly [number, string]   // readonly关键字声明
type tuplero2 = Readonly<[number, string]>  // 内置泛型类型声明


// 4-元组和数组
// 对于特定参数个数的函数,由于数组的元素个数不固定,通常不能作为参数
function add(x:number, y:number){}
const tupt:[number, number] = [1, 2];   // 含两个成员的元组,可传参到add()中
const arrt = [1, 2];          // 含两个成员的数组,不能传参到add()中
add(...tupt);

// 当元组的类型声明带:①可选参数;②扩展运算符时,即使数量正确也无法传参
// 使用扩展运算符时,TS会将元组当做数组看待
const tupt2:[number,number?] = [1,2];

// 要让数组传参成功,除了以元组方式声明外,还可使用as const断言固定参数个数
const arrt2 = [1,2] as const;
add(...arrt2);

