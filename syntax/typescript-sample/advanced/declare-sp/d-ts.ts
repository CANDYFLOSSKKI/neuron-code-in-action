// 类型声明文件

export{};
// 1-模块与类型声明文件的组织
// 单独使用的模块通常提供单独的类型声明文件<模块名>.d.ts
// 模块中外部接口的所有类型都写在类型声明文件中,可便于模块使用者了解接口
// ①模块输出(本模块文件中)
const maxInterval = 12;
function getArrayLength(arr:any[]) {
    return arr.length;
}
module.exports = {
    getArrayLength,
    maxInterval,
};

// ②类型声明(模块类型声明文件中)
// 变量的类型描述必须使用declare命令(接口不强制要求)
// export function getArrayLength(arr: any[]): number;
// declare const maxInterval: number;
// export maxInterval;

// ③多模块类型声明(模块类型声明文件中)
// 通常使用declare关键字声明多个模块,使单个d.ts文件中可包含多个模块的类型声明:
// declare module "url" {       ->模块url类型声明组合
//     export interface Url {
//         protocol?: string;
//         hostname?: string;
//         pathname?: string;
//     }
//     export function parse(
//         urlStr: string,
//         parseQueryString?,
//         slashesDenoteHost?
//     ): Url;
// }
// declare module "path" {      ->模块path类型声明组合
//     export function normalize(p: string): string;
//     export function join(...paths: any[]): string;
//     export var sep: string;
// }


// 2-类型声明文件的生成
// ①编译器自动生成
// {
//     "compilerOptions": {
//         "declaration": true
//     }
// }

// ②内置声明文件
// {
//     "compilerOptions": {
//         "lib": ["dom", "es2021"]  指定加载的内置声明文件
//     }
// }

// ③外部声明文件
// 默认在node_modules/@types目录加载类型模块
// {
//     "compilerOptions": {
//         "typeRoots": ["./typings", "./vendor/types"],  指定加载模块的目录
//         "types" : ["jquery"]                           指定需要加载的类型模块
//     }
// }

// 若外部模块不包含类型声明文件,可以设置某个模块的类型是any:
// ①隐式表示外部模块($表示外部引入)
declare var $:any

// ②显式表示外部模块
declare type JQuery = any;
declare var $:JQuery;

// ③声明指定模块名的模块类型
declare module 'assert';
