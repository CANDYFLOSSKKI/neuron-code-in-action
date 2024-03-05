// 注释和命令

// 1-双斜杠命令
// 双斜杠命令都是向编译器发出的命令
// 1-1 // @ts-nocheck
// 表示编译器不对当前脚本进行类型检查

// 1-2 // @ts-check
// 表示编译器强制对当前脚本进行类型检查

// 1-3 // @ts-ignore
// 表示编译器不对下一行代码进行类型检查

// 1-4 // @ts-expect-error
// 下一行出现类型错误时不显示报错信息,把错误留给代码处理(通常用于测试)
// 下一行没有出现类型错误时,给出提示Unused '@ts-expect-error' directive


// 2-三斜杠命令
// 当类型声明文件内容太多,进行拆分后,入口的类型声明文件就需要三斜杠命令引用其他文件
// 2-1 /// <reference path="" />
// 表示编译器在编译时需要包括的文件,常用于声明当前脚本依赖的类型文件
// 编译器会在预处理阶段找出所有三斜杠引用的文件,添加到编译列表中共同编译

// ①path参数必须指向一个存在的文件,文件不存在会报错
// ②path参数不允许指向当前文件

// 2-2 /// <reference types="" />
// 表示编译器当前脚本依赖某个类型库(相当于import)
// 类型库的根目录通常在node_modules/@types中,所以相当于指向@types/xxx/index.d.ts

// 2-3 /// <reference lib="" />
// 表示允许脚本文件显式包含内置lib库
// 库文件统一使用lib.[desc].d.ts的命名方式,所以相当于加载lib.xxx.d.ts类型库文件


// 3-JSDoc
// JSDoc用于TS无法推断类型时的注释使用
// ①JSDoc注释必须以/**开始,中间每行加*,以*/结束
// ②JSDoc注释必须与它描述的代码处于相邻的位置
// 3-1 @typedef
// @typedef用于创建自定义类型,相当于类型别名(可被TS语法替换)
/** @typedef {(number | string)} NumberLike */

// 3-2 @type
// @type用于定义变量的类型,相当于显式类型声明
// 可以引用@typedef中声明的类型,也可以使用TS语法声明类型
/** @type {NumberLike} */
let a = 0;
/** @type {(s: string, b: boolean) => number} */
let e;

// 3-3 @param
// @param用于定义函数参数的类型
// 可以将形参放在[]中设置可选参数,还可以设置其默认值
/** @param {string} [x="foo"] */
function foo1(x?:string) { console.log(x); }

// 3-4 @return/@returns
// 两者都用于定义函数返回值的类型
/** @return {boolean} */
function foo2() { return true; }

// 3-5 类相关的修饰符
// @extends用于定义类继承的基类
// @public/@protected/@private/@readonly用于修饰成员的访问权限
class Base {
    /**
     * @public
     * @readonly
     */
    x = 0;

    /** @protected */
    y = 0;
}

/** @extends {Base} */
class Derived extends Base {}
