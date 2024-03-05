// 模块和模块输出

// 1-模块的输入输出
// ①模块:包含import或export语句的文件
// ②脚本文件:不包含export语句的文件

// 模块作用域不属于全局作用域,模块内部的变量,函数,类只在内部可见,模块外部不可见
// ->暴露给外部的接口,必须用export命令声明
// ->使用其他模块的接口,必须用import命令来导入
// 编译包含import命令的模块(称为入口模块),会自动编译其关联的导出模块

// 当文件不包含export语句,又希望当做模块来处理(对外不可见)时,可添加空export语句:
export {};

// 2-模块输出
// TS支持所有ES模块的语法,同时允许输出和输入类型参数
export let a:number = 123;        // 输出变量
export type Bool = true | false;  // 输出type类型
export interface IA {             // 输出接口类型
    foo: string;
}

// export可以使用type显式标识输出的是类型参数
// (下方输出Point的方式不同,使用方法也不同,见import)
class Point {
    x: number|undefined;
    y: number|undefined;
}
export { Point }                 // 输出类本身
export type { Point as PType };  // 输出类类型(只能作为类型声明使用)
