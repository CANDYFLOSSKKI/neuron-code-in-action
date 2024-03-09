// 泛型

// 1-函数的泛型声明
// 函数的泛型声明语法包括三种情况:①function函数;②箭头函数;③对象类型函数
function GetId<T>(arg:T):T { return arg; }  // function命令声明的函数泛型
const GetId2:<T>(arg:T) => T = GetId;       // 箭头函数的泛型
const GetId3:{ <T>(arg:T): T } = GetId;     // 对象类型的函数泛型


// 2-接口的泛型声明
// 接口的泛型可以在接口名后声明,在整个接口内部均生效
// 泛型参数定义在整个接口上时,使用接口作为类型时,需要给出泛型类型参数
interface Box<T> { contents: T; }
let box:Box<string>;

// 接口可以单独定义带泛型参数的成员,作为类型使用时无需给出泛型参数
interface Fn { <Type>(arg:Type): Type; }
function FnIdFunc<Type>(arg:Type): Type { return arg; }
// 为单独带泛型参数的成员赋值时,也要是带泛型的,而不能给出实际类型
let fnMyId:Fn = FnIdFunc;


// 3-类的泛型声明
// 类的泛型参数在类名后声明,使用new实例化类对象时要给出泛型类型参数
// 泛型类描述的是类的实例,不包括静态属性和静态方法(不能使用泛型)
const Container = class<T> {
    constructor(private readonly data:T) {}
};
const contA = new Container<boolean>(true);
const contB = new Container<number>(0);

// 继承泛型类时,可以选择是否给出泛型类型参数
// 选择保持泛型参数不变时,继承类也需要声明该泛型参数,也可以添加自己额外的泛型参数
class AClassGen<T> {}
class BClassGen<K,V> extends AClassGen<K>{}
class CClassGen extends BClassGen<string,string>{}

// 可以定义泛型的构造函数返回泛型类的实例
type MyClassByType<T> = new (...args: any[]) => T;     // type声明泛型构造函数
interface MyClassByInf<T> { new(...args: any[]): T; }  // 接口声明泛型构造函数


// 4-type的泛型声明
// type的泛型参数声明在类型别名之后
// 带泛型参数的type可以构成更灵活的联合类型和数据结构
type Nullable<T> = T | undefined | null;
type Tree<T> = {
    value: T;
    left: Tree<T> | null;
    right: Tree<T> | null;
};


// 5-泛型参数的默认值
// 泛型类型参数可以在<>内部使用=指定默认值,通常使用在类中
// 当TS可以推断出泛型类型时,将覆盖掉泛型参数的默认值;类不会受类型推断影响
function getFirst<T = string>(arr:T[]):T {
    return arr[0];
}
getFirst([1, 2, 3]);

// 如果有多个泛型类型参数,带默认值的参数必须放在后面(相当于可选参数)
class MultiGenericClass<T, U = boolean>{
    foo?: T;
    bar?: U;
}


// 6-泛型参数的约束条件
// 泛型参数的约束可以限制传入的类型,通过extends继承语法实现
// 只要是指定类型的子类型,都可以作为泛型参数被传入(包括值类型),默认值也要遵循类型
// 缩小泛型的类型范围可以让泛型结构内部调用这部分类型特有的属性和方法
type FnGeneric<A extends string, B extends string = 'world'> =  [A, B];
type Result = FnGeneric<'hello'>  // ["hello", "world"]

// 约束类型还可以写成对象形式,限定传入类型必须包含指定的属性
function comp<T extends { length: number }>(a: T, b: T) {
    return a.length >= b.length?a:b;
}
comp([1, 2], [1, 2, 3]);   // 数组有length属性
comp('ab', 'abc');         // 字符串有length属性

// 有多个泛型参数时,可以引用另一个泛型参数作为限定条件,限制如下:
// ①不能引用自身作为约束条件
// ②不能循环引用约束(A extends B的同时B extends A)
class ClassGenericHasExt<T extends U,U>{}
