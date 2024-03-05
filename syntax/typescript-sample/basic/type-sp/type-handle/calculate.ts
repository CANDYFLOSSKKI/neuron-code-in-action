// 类型运算

// 1-keyof运算符
// keyof接受对象类型参数,返回对象所有键名组成的联合类型
// keyof不能用于数组和元素类型(会导致同时提取元素和属性)
// 可以通过keyof的返回结果,通过键值索引取所有键值类型组成的联合类型
type MyObjWithKeyof = {
    foo: number,
    bar: string,
};
type Keys = keyof MyObjWithKeyof;     // 'foo' | 'bar'
type Values = MyObjWithKeyof[Keys];   // number | string

// 1-1 keyof的特殊情况
// ①任意对象,返回的是string|number|symbol
type KeyTAll = keyof any;  // string | number | symbol

// ②没有键名的类型,返回的是never
type KeyTNon = keyof object;  // never

// ③索引对象,返回的是索引的联合类型
interface TInf {[prop: number]: number;}
type KeyTInf = keyof TInf;  // number

// ④联合类型,返回的是共有的键名
type AT = { a: string; z: boolean };
type BT = { b: string; z: boolean };
type KeyTCombine = keyof (AT | BT);  // z

// ⑤交叉类型,返回的是所有键名的联合类型
type KeyTComAll = keyof (AT & BT);  // 'a' | 'b' | 'z'

// 1-2 keyof泛型取值方法
// keyof可以为泛型的对象取值方法设置类型限定
//  ①对象类型:Obj
//  ②对象键名类型(参数):K = keyof Obj(联合类型)的子类型
//  ③对象键值类型(返回值):Obj[K]
function prop<Obj, K extends keyof Obj>(obj:Obj, key:K):Obj[K] {
    return obj[key];
}

// 1-3 keyof对象属性映射
// 通过keyof可以对某个type的属性类型作批量的属性映射
// 使用键值索引[]配合keyof,可以对应到目标type的所有属性
type NewProps<Obj> = {
    [Prop in keyof Obj]: boolean;  // 所有属性值改为boolean类型
};
type Mutable<Obj> = {
    -readonly [Prop in keyof Obj]: Obj[Prop];  // 所有属性删除只读修饰符
};
type Concrete<Obj> = {
    [Prop in keyof Obj]-?: Obj[Prop];  // 所有属性删除可选修饰符
};


// 2-in运算符
// 在JS中,in运算符可用于确定对象是否包含某个属性名
// 在TS中,in运算符可用于取出联合类型中的每个成员类型
type U = 'a'|'b'|'c';
type FooWithIn = {
    [Prop in U]: number;
};
// type FooWithIn = {
//     a: number,
//     b: number,
//     c: number
// };


// 3-[]运算符
// 方括号运算符[]可用于取出指定类型中特定键值的类型
// 通过[]访问不存在的属性会报错
type PersonWithGet = {
    age: number;
    name: string;
    alive: boolean;
};
type PersonA = PersonWithGet['age'];         // number
type PersonT = PersonWithGet['age'|'name'];  // number|string
type PersonK = PersonWithGet[keyof Person];  // number|string|boolean

// 当属性名以索引形式声明时,也可以通过这种方式获取(相当于数组的[number])
type Objs = {
    [key:string]: number,
};
type ObjsT = Objs[string];  // number


// 4-extends...?:条件运算符
// extends...?:相当于作用于属性的三目运算符,条件是属性类型的限定
interface AnimalExt { live(): void; }
interface DogExt extends AnimalExt { woof(): void; }

type TestT1 = DogExt extends AnimalExt ? number : string;  // number
type TestT2 = RegExp extends AnimalExt ? number : string;  // string

// 如果目标类型是联合类型,会根据分配律拆开成若干个条件(结果可能不止一个类型)
// 可以将目标的联合类型包装成泛型,不整体出现在条件运算符中:
type ToArray<Type> = Type extends any ? Type[] : never;
type TWithToArray = ToArray<string|number>;

// 条件运算符可以嵌套使用,实现多重判断:
type LiteralTypeName<T> =
    T extends undefined ? "undefined" :
        T extends null ? "null" :
            T extends boolean ? "boolean" :
                T extends number ? "number" :
                    T extends bigint ? "bigint" :
                        T extends string ? "string" :
                            never;
type Result1 = LiteralTypeName<123n>;  // bigint


// 5-infer关键字
// infer通常和条件运算符一同使用,表示TS类型推断出的类型
// infer的类型有如下作用:
//  ①当某个参数可以推断出来时,外部可以少传一个参数,交由infer处理
//  ②将类型推断出来的类型赋给一个实际的变量,后续仍然可以使用
type Flatten<Type> =
    Type extends Array<infer Item> ? Item : Type;
type Str = Flatten<string[]>;  // 符合Array,推断出元素Item = string
type Num = Flatten<number>;    // 不符合Array,直接返回泛型number

// ①推断函数的参数和返回值类型
type ReturnPromise<T> =
    T extends (...args: infer A) => infer R
        ? (...args: A) => Promise<R>
        : T;

// ②推断对象内部的属性值
type MyTypeObj<T> =
    T extends {
        a: infer M,
        b: infer N
    } ? [M, N] : never;
type TWithMyType = MyTypeObj<{ a: string; b: number }>;

// ③推断模版字符串中的类型参数
type StrModel = 'foo-bar';
type Bar = StrModel extends `foo-${infer rest}` ? rest : never  // 'bar'


// 6-is运算符
// is运算符可用于限定返回值与参数之间的关系
// is常用于限定返回值,实际的返回值类型是boolean,规则如下:
// x is T 表示返回值x的类型为T时返回true,否则返回false
type AWithIs = { a: string };
type BWithIs = { b: string };
function isTypeA(x: AWithIs|BWithIs): x is AWithIs {
    return 'a' in x;
}

// 在类中,is可以配合this关键字,限定方法内部的this类型(同样返回boolean)
class Student {
    isStudent():this is Student { return true; }
}


// 7-satisfies运算符
// satisfies运算符用来检测某个值是否符合指定类型
// 当对象不方便直接进行类型声明,又希望他满足指定的类型约束时,通常使用satisfies
// satisfies不改变既有的类型推断,自动检查推断类型是否满足给定的类型
type Colors = "red" | "green" | "blue";
type RGB = [number, number, number];
const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0, 255]
} satisfies Record<Colors, string|RGB>;
