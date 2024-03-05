// 错误处理

// 1-原生错误类型
// 所有的错误类型都派生于Error,Error类型包含如下3个属性:
// ①message   表示错误的提示信息(实例化时不能为空)
// ②name      表示错误的名称
// ③stack     表示错误的调用堆栈信息
var err = new Error('出错了');
err.message     // "出错了"

// 1-1 SyntaxError
// SyntaxError表示语法错误,发生的原因通常包括:
// ①变量名错误
//      var 1a -> Uncaught SyntaxError: Invalid or unexpected token
// ②缺少括号
//      console.log 'hello') -> Uncaught SyntaxError: Unexpected string-sp

// 1-2 TypeError
// TypeError表示参数不是预期类型,发生的原因通常包括:
// ①以函数形式调用非函数结构
//      new 123 -> Uncaught TypeError: 123 is not a constructor
// ②访问null或undefined对象的属性
// ③调用不存在的方法
//      obj.unknownMethod() -> Uncaught TypeError: obj.unknownMethod is not a function

// 1-3 ReferenceError
// ReferenceError表示引用不存在的变量,发生的原因通常包括:
// ①变量名错误
// ②引用其他块作用域中的局部变量
//      sVariable -> Uncaught ReferenceError: sVariable is not defined
// ③向非变量结构赋值
//      console.log() = 1 -> Uncaught ReferenceError: Invalid left-hand side in assignment

// 1-4 RangeError
// RangeError表示值超出有效范围,发生的原因通常包括:
// ①数组索引或长度为负数或过长、
//      new Array(-1) -> Uncaught RangeError: Invalid array length
// ②向数字方法传递错误值
//      num.toFixed(200) -> Uncaught RangeError: toFixed() digits arguments must be between 0~100
// ③函数堆栈已满


// 2-自定义错误类型
// 自定义错误派生类型使用实例对象的原型链继承方法:
//  ①设置构造函数的原型为Error实例对象
//  ②重定向Error实例对象的构造函数为自定义错误类型的构造函数
// 自定义错误类型也是Error的派生类型,构造函数需要提供message形参设置提示信息
function UserError(message) {
    this.message = message || '默认信息';
    this.name = 'UserError';
}
UserError.prototype = new Error();
UserError.prototype.constructor = UserError;
new UserError('这是自定义的错误！');


// 3-错误处理机制
// JS的错误处理机制同样是在try-catch-finally代码块中处理错误
// ①try代码块      通过throw显式抛出错误的匿名实例对象
// ②catch代码块    捕获错误后程序继续执行
// ③finally代码块  存放最后必定运行的语句
openFile();
try {
    writeFile(Data);
} catch(e) {
    handleError(e);
} finally {
    closeFile();
}

// 3-1 错误类型判断
// JS中的catch默认捕获所有类型的错误
// 如果要实现不同错误的不同处理逻辑,在catch内部通过instanceof运算符进行分支判断
// 可以将多个catch块并列分别负责不同错误的处理(不推荐,错误对象会被反复抛出)
try {
    foo.bar();
} catch (e) {
    if (e instanceof EvalError) {
        console.log(e.name + ": " + e.message);
    } else if (e instanceof RangeError) {
        console.log(e.name + ": " + e.message);
    }
}

// 3-2 错误处理的执行顺序
// finally无论错误有没有被捕获都会执行,而错误会导致程序中断,因此finally的执行顺序先于错误的传播
// 如果在finally中显式返回,函数会忽略等待finally执行的throw语句而直接返回,不会向堆栈上层传播错误
function f() {
    try {
        throw '出错了！';
    } catch(e) {
        console.log('捕捉到内部错误');
        throw e;        // 等到finally结束再执行
    } finally {
        return false;   // 直接返回,不会返回去执行throw
    }
}

// 如果在try中显式返回,返回值先存储当前状态再去执行finally
// finally中对变量的修改会正确生效,但不会影响到函数的返回值
var count = 0;
function countUp() {
    try {
        return count;
    } finally {
        count++;
    }
}
countUp()   // 0,返回值在进入finally之前就已经存储了值为0的状态
count       // 1,返回值在finally处正常自增,反映到全局变量的修改上
