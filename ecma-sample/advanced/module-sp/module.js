// 模块化

// 1-模块化方案
// 模块化方案中,每个文件都是一个模块,文件中的顶级作用域是自己的模块作用域
// 模块作用域中定义的结构仅当前文件可见,模块之间的交互通过显式的模块输出和模块加载进行

// ①CommonJS
// 针对服务端的模块化规范,服务端通常采用同步加载的方式
// 模块文件中需要某个模块时,服务器会进行加载操作导致阻塞,直到加载完毕再继续执行

// ②AMD/CMD
// 针对浏览器端的模块化规范,浏览器端通常采用异步加载的方式(需要预处理阶段解决模块的加载问题)
// AMD是预加载,在模块定义时指定模块间的依赖关系,加载模块文件的同时进行解析执行
// CMD是懒加载,模块间的依赖关系在模块代码中才会给出,需要的时候才会解析执行

// ③ES Module
// ES Module异步加载模块的方式是静态的,在编译时就已经完成模块的加载定义
//  -> CommonJS模块输出值的拷贝,模块输出后对变量的更改不会影响到输出值
//  -> ES Module模块输出值的只读引用,加载模块时根据引用去目标模块中取值


// 2-ES Module模块输出
// export命令可以对外输出:函数,类和var/let/const定义的变量
// export输出的接口和模块变量之间一一对应,且动态绑定模块中实时的变量值(变量的变化反映到接口的变化)
// export不允许对外直接输出变量名和值,必须输出和内部变量建立关系的接口,且必须在全局作用域中输出
// 2-1 变量输出示例
export var n = 1;   // ①输出变量定义和初始化
const m = 1;
export {m};                  // ②输出变量组成的对象
export {m as m1};            // ③输出变量的导出别名

// 2-2 函数输出示例
export function f() {};      // ①输出函数定义和初始化
function f() {}
export {f};                  // ②输出函数组成的对象

// 2-3 默认输出
// export default命令用于指定模块的默认输出,单个模块中只能存在一个默认输出
// 默认输出的意义在于:让模块加载时无需知道模块有哪些接口可供加载
// 默认输出将输出结构赋值给default变量,因此后跟的不能是声明语句,而应该是变量名/值/表达式
export default function crc32() {}
export default 32;
export default a;

// 默认输出的原理是default命名的接口,因此可以通过as显式设置default别名实现相同效果
add = 1
export {add as default};


// 3-ES-Module模块加载
// import命令用于模块加载,在接收的大括号{}中指定需要导入的变量名,使用from关键字指定模块文件的位置
// import加载的接口都是只读的输入接口,不允许修改
// 加载操作具有变量提升特性,在加载前就可以进行调用
import { lastName as surname } from './profile.js';
import {a} from './xxx.js'
foo();
import { foo } from 'my_module';

// 3-1 特殊的模块加载情况
// ①使用*代替指定加载接口的{},表示整体加载目标模块中所有接口
// ②模块有默认输出时可不用{}直接引用默认输出名
import * as circle from './circle';     // 加载所有接口
import crc32 from 'crc32';              // 加载默认输出

// 3-2 模块的转发输出
// 模块的转发输出是结合export和import命令实现接口的对外转发
// 对外转发的接口在当前模块中不可用,可以对其修改别名,修改默认输出等操作
export { foo, bar } from 'my_module';
// 等价于 =>
import { foo, bar } from 'my_module';
export { foo, bar };

// 定制转发的逻辑:
export { foo as myFoo } from 'my_module';
export * from 'my_module';
export { es6 as default } from './someModule';
