// declare

// 1-declare关键字适用场景
// declare关键字用来告诉编译器某个类型是存在的,可以在当前文件中使用
// declare通常用于声明外部结构的类型,使脚本内部使用外部类型不会报错
// declare可以描述的类型有:
//  ①const/let/var声明的变量
//  ②type/interface声明的类型
//  ③class类
//  ④enum枚举
//  ⑤function函数
//  ⑥module模块
//  ⑦namespace命名空间

// declare只描述类型,而不给出实现(特别是对函数而言)
// declare只能描述已经存在的变量和数据结构,不能声明新的变量和数据结构


// 2-declare描述变量类型
// declare描述变量必须显式给出类型,不允许设置变量初始值
declare let x1d:any;
declare let x2d:number;


// 3-declare描述函数类型
declare function sayHello(
    name:string
):void;


// 4-declare描述类类型
declare class CCl {
    public static s0():string;      // ①静态成员
    private static s1:string;
    public a:number;                // ②属性
    private b:number;
    constructor(arg:number);        // ③构造函数
    m(x:number, y:number):number;   // ④方法
    get c():number;                 // ⑤存取器
    set c(value:number);
    [index:string]:any;             // ⑥属性索引
}


// 5-declare描述模块和命名空间类型
// 模块和命名空间本质上都属于模块,描述语法相同
// 由于仅仅是类型声明,export的输出声明是可有可无的
declare module AnimalLib {
    class Animal {
        constructor(name:string);
        eat(): void;
        sleep(): void;
    }
    type Animals = 'Fish' | 'Dog';
}

// declare不能新增结构的规定仅限于顶级结构,可以声明同名的结构与模块合并
// 模块名必须和模块输入/输出时的命名相同;不能对default默认接口扩展
// @ts-ignore
declare module 'moduleA' {
    interface Foo {
        custom: { prop1: string; }  // 为Foo新增属性custom,模块输入时合并
    }
}

// declare可以使用通配符,匹配多个满足规则的模块/命名空间
// @ts-ignore
declare module 'my-plugin-*' {
    interface PluginOptions {
        enabled: boolean;
        priority: number;
    }
}


// 6-declare描述枚举类型
// 描述枚举类型时允许为枚举成员指定成员(如下方式均可用于描述枚举)
declare enum E1 { A, B, }
declare enum E2 { A = 0, B = 1, }
declare const enum E3 { A, B, }
declare const enum E4 { A = 0, B = 1, }


// 7-declare描述原生对象类型
// declare global可用于为JS原生对象添加属性和方法(必须在模块中声明)
// 该操作本质上是对原生对象的原型prototype上添加属性和方法
export{};
declare global {
    interface String {
        toSmallString(): string;
    }
}
