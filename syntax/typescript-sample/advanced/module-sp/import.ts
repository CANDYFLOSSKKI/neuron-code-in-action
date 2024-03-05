// 模块和模块输入

export{}
// 1-模块输入
// TS提供语法用来区分输入的是类型还是正常接口
// 在输入的变量前添加type即可表示该结构是类型参数(type可以放在{}中):
//  ①type { ... }       内部只能是类型参数,正常接口报错
//  ②{ type ..., ... }  只有type标识的是类型参数,可以包含其他正常接口
import type { IA } from './export';
let b:IA = {
    foo: "hello",
}

// 可以将所有的type提取出来通过as取别名
// 调用别名中的特定类型,可以使用点运算符.(相当于包装成对象)
import type * as DefaultType from './export'
let c:DefaultType.Bool = true;

// 对于类的不同形式输出,输入后也有着不同的使用方法:
// ①export {Point} 可以当做类使用实例化对象
import { Point } from './export'
const point = new Point();

// ②export type { Point as PType }; 只能当做类型使用
// 只要和类的类型结构兼容,就满足该类型约束
import type { PType } from "./export";
const pLike1:PType = new Point();
const pLike2:PType = {
    x: 0,
    y: 1,
}


// 2-相对模块和非相对模块
// 相对模块指路径以/ ./ ../开头的模块,模块定位从当前位置开始,通常用于加载本地模块
// 非相对模块指不带有路径信息的模块,通常用于加载外部模块
import { Component } from "@angular/core";

// 非相对模块的定位由baseUrl属性或模块映射确定(tsconfig)
// {
//     "compilerOptions": {
//          "baseUrl": "."  -> baseUrl单个点.代表基准目录是tsconfig所在目录
//          "paths": {      -> 指定非相对路径的模块与实际脚本的映射
//                          -> paths可以指定多个路径,路径不存在时依次查找
//              "jquery": ["node_modules/jquery/dist/jquery"]
//          }               -> rootDirs指定模块定位时必须查找的其他目录
//          "rootDirs": ["src/zh", "src/de", "src/#{locale}"]
//     }
// }
