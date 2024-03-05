// this关键字

// 1-this的指向
// 笼统上来讲,this始终指向当前代码处所在的运行环境
// ①全局环境下的this:总是指向顶层对象window
// ②构造函数中的this:总是指向当前创建的实例对象
// ③箭头函数中的this:总是指向定义时所在的对象

// 1-1 对象方法中this的动态指向
// 当属性值为方法时,方法会被单独保存在内存中,属性描述对象的value值保存该方法的内存地址
var a = {
    p: 'HelloA',
    b: {
        m: function() {
            console.log(this.p);  // b保存了m方法的内存地址(运行环境是b)
        },                        // m()输出b下的p属性值HelloB
        p: 'HelloB'
    }
}

// 当方法地址被赋给其他变量时,运行环境也会发生变化
var func1 = a.b.m;
func1();      // func1直接对应方法地址,运行环境为func1所在的window,输出undefined
var func2 = a.b;
func2.m();    // func2对应b,和对象中的情况相同,运行环境为func_2(包含m和p),输出HelloB

// 当方法参与表达式运算时,方法地址会优先取出,运行环境始终为windows
false || a.b.m()     // window
1, a.b.m()           // window


// 2-this的嵌套与回调
// 在函数内部定义内层函数时,内层的this会直接指向全局环境
// 如果要实现让内层函数引用外层的this,可以先在外层用变量捕获this,内部引用该变量
// 回调函数也会发生运行环境的改变,需要显式绑定this
var o = {
    f1: function () {
        console.log(this);          // this指向o
        var that = this;            // 捕获this
        // noinspection JSVoidFunctionReturnValueUsed
        var f2 = function () {
            console.log(this);      // 直接调用this指向全局环境window
            console.log(that);      // that为外层的that变量,指向外层的this = o
        }();
    }
}


// 3-this相关的绑定方法(作用在方法上)
// ①call(<目标指向>, arg1, arg2, ...)
//      call()改变当前函数的this指向,同时传递列举参数为实参执行该函数
// ②apply(<目标指向>, [argsArray])
//      apply()改变当前函数的this指向,同时传递参数数组为实参执行该函数
// ③bind(<目标指向>, arg1, arg2)
//      bind()返回函数体相同但this指向不同的新函数,同时指定前n个参数值为列举参数

// 3-1 实例方法的改写
// 通常实例方法的调用都可以看成是原型方法的call()特殊形式
// 组合使用call()和bind()可以改写实例方法为直接调用函数:       Function.prototype.call.bind(<实例方法>)
// 改写后调用方法的首个参数是之前的调用者,后续参数是之前的参数:  <实例方法>(<调用者>,<...原参数>)
'123'.toString()
Object.prototype.toString.call('123')  // 两者等效

// 改写方法为直接调用的函数:
var toString = Function.prototype.call.bind(Object.prototype.toString)
// 改写后的方法调用方式:
i = toString('123')  // [object String]
