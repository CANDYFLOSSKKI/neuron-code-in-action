// 命名空间

// 命名空间的出现在ES Module之前
// 在ES Module之后,命名空间可以作为内部模块使用,也可以被外部引用

// 1-命名空间的声明和引用
// 命名空间建立了一个容器,内部的所有变量和函数都必须在这个容器里面使用
// 在命名空间外使用内部成员,需要在内部标识某个成员为export
namespace Utils {
    function isString(value:any) {
        return typeof value === 'string';
    }
    isString('yes');
    export function log(msg:string) { console.log(msg); }
    export function error(msg:string) { console.error(msg); }
}
Utils.log('Call me');   // 外部引用log()
Utils.error('maybe!');  // 外部引用error()

// 在引用的目标命名空间外部,可以使用import设置别名
// 命名空间可以嵌套使用(引用时需要从最外层开始引用)
namespace ShapesP {
    export interface MyInterface{}
    export class MyClass{}
    export namespace Polygons {
        export class Triangle {}
        export class Square {}
    }
}
import polygons = ShapesP.Polygons;                  // 声明别名
const sq = new polygons.Square();  // 使用别名


// 2-命名空间的输出
// 在命名空间上export可以输出供其他文件使用,输入的语法和模块相同
export namespace Shapes {
    export class Triangle {}
    export class Square {}
}
// import { Shapes } from './shapes';


// 3-命名空间的合并
// ①命名空间和同名的命名空间合并
// 命名空间中的非export成员不会被合并,只能在各自的命名空间中使用
namespace Animals {
    export class Cat {}
}
namespace Animals {
    export interface Legged {
        numberOfLegs: number;
    }
    export class Dog {}
}

// ②命名空间和同名的函数合并
// 函数必须在命名空间之前声明,命名空间相当于为函数添加属性
function f() {
    return f.version;
}
namespace f {
    export const version = '1.0';
}
console.log(f())         // '1.0'
console.log(f.version)   // '1.0'

// ③命名空间和同名的类合并
// 类必须在命名空间之前声明,命名空间相当于为类添加属性
class C {
    foo = 1;
}
namespace C {
    export const bar = 2;
}
console.log(C.bar)  // 2

// ④命名空间和同名的枚举合并
// 命名空间相当于为枚举添加属性
// 两者导出的成员不允许重名
enum E { A, B, C, }
namespace E {
    export function foo() {
        console.log(E.C);
    }
}
E.foo()  // 2
