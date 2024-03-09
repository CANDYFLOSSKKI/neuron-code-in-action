// 接口

// 1-interface和type
// interface在TS中和type类似,用于表示指定的类型结构,作为对象的类型模版
// interface和type都可以为对象类型命名:
type Country1 = {
    name: string;
    capital: string;
}
interface Country2 {
    name: string;
    capital: string;
}

// interface和type的区别体现在:
// ①type可以表示非对象类型;interface只能表示对象类型
// type还可对原始类型构造交叉类型和联合类型,用于扩展原始类型的作用范围
type NonObjectType = number | boolean;

// ②type和interface添加属性的语法不同
// type在已有类型上添加属性,通常使用&运算符实现
type Animal = { name: string }
type Bear = Animal & { honey: boolean }     // &运算作用于type
type Bear2 = IAnimal & { honey: boolean }   // &运算作用于Interface

// interface可以通过继承添加属性,同样interface和type都可以作为继承的对象
interface IAnimal {name: string}
interface IBear extends IAnimal {honey: boolean}  // 继承接口添加属性
interface IBear2 extends Animal {honey: boolean}  // 继承type添加属性

// ③同名的interface可以实现自动合并操作;type不允许同名多次定义
interface IA { foo:number }
interface IA { bar:number }  // IA自动合并后同时拥有foo和bar属性
const objIA:IA = {foo: 1, bar: 1};

// ④type支持属性映射;interface不支持属性映射
interface IPoint {x: number;y: number;}
type PointCopy1 = {
    [Key in keyof Point]: Point[Key];
};

// ⑤interface支持this关键字(多用于类中);type不支持this关键字
interface IFoo {
    add(num:number): this;
}


// 2-接口的成员声明
// 2-1 对象属性
// 接口的对象属性声明使用分号/逗号结束
// 和对象相同,接口可以指定特定属性为可选属性(问号?)或只读属性(readonly)
interface IPoint {
    x: number;
    y: number;
    z?:string;
    readonly m: string;
}

// 2-2 对象属性索引
// 属性索引同对象的构造方式,共有string/number/symbol三种类型
// 属性索引的限制参考对象一节(如数值索引不能和字符串共存等)
interface IAProp {
    [prop: string]: number;
}

// 2-3 对象方法
// 对象方法可以使用:①普通方法;②箭头函数;③对象类型三种方式声明
interface IAFunc {
    f1(x: boolean): string;         // 普通方法声明方式
    f2: (x: boolean) => string;     // 箭头函数方法声明方式
    f3: { (x: boolean): string };   // 对象类型方法声明方式
}

// 接口中的对象方法可以引用外部变量构造属性名表达式
const funcp = 'f';
interface IAExpFunc {
    [funcp](x: boolean): string;
}

// 接口中声明方法重载时,不需要最后的联合类型方法及其实现,列举可能的方法签名即可
interface IAOverride {
    f(): number;
    f(x: boolean): boolean;
    f(x: string, y: string): string;
}

// 2-4 函数和构造函数
// 接口中可以声明独立的函数
// 构造函数相较于普通函数,在参数列表前添加new关键字标识
interface ErrorConstructor {
    (x:number, y:number): number;
    new (message?: string): Error;
}


// 3-接口继承
// 3-1 接口继承接口
// 在接口名后使用extends关键字即可继承其他接口,支持多重继承
// 继承会从目标接口拷贝属性类型,父子接口中有同名属性时必须类型兼容,此时子属性覆盖父属性
interface Style {color: string;}
interface Shape {name: string;}
interface Circle extends Style, Shape {radius: number;}

// 3-2 接口继承type
// 接口可以继承type定义的对象类型(无法继承type定义的非对象类型)
type Country = {
    name: string;
    capital: string;
}
interface CountryWithPop extends Country {population: number;}

// 3-2 接口继承类
// 接口可以通过继承操作继承目标类的所有成员
// 当目标类拥有私有成员和保护成员时,继承会导致这些成员无法实现从而报错
class AClass {
    x:string = '';
    y():boolean {return true;}
}
interface IB extends AClass {z: number}


// 4-接口合并
// 多个同名接口的声明会合并成一个接口,最终接口同时具有这些声明的属性
// 多个声明块内不能有属性名相同但类型不兼容的属性
// 多个声明块内不同类型的方法将构成函数重载,重载的优先级:字面量参数>声明位置靠后>声明位置靠前
interface IAFoo {f(x:'foo'): boolean;}
interface IAFoo {f(x:any): void;}
interface IAFoo {         // 等价的接口类型声明
    f(x:'foo'): boolean;  // 字面量参数,因此声明位置靠前的同时重载优先级更高
    f(x:any): void;
}
