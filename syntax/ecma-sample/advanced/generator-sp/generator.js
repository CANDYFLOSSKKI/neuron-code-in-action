// 生成器函数

// 1-生成器函数与状态
// 生成器函数与普通函数相比有如下特征:
//  ①function和函数名间存在*
//  ②函数体中使用yield表达式定义不同内部状态
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}
hw = helloWorldGenerator();
hw.next()  // { value: 'hello', done: false }
hw.next()  // { value: 'world', done: false }
hw.next()  // { value: 'ending', done: true }
hw.next()  // { value: undefined, done: true }

// 调用生成器函数会返回函数的迭代器对象,迭代器的初始位置是函数体的最上方(语句头结点)
// 每调用一次next()方法,函数就会执行到下一个yield表达式后停止
// 执行到return语句后,返回的done设为true标识函数执行完毕
// (注意这里done = true的条件和普通的迭代器不同)


// 2-生成器和迭代器
// 生成器函数返回的迭代器对象的Symbol.iterator属性就是它自身
function* gen(){}
genIter = gen();
flag = genIter[Symbol.iterator]() === genIter  // true

// 生成器函数可以作为对象的迭代器使用
myIterable = {};
myIterable[Symbol.iterator] = function* foo() {
    yield 1;
    yield 2;
    yield 3;
}

// 生成器函数可以正常执行解构/循环遍历操作
arr = [...myIterable]    // [1, 2, 3]
for (let i of myIterable) {
    console.log(i);      // 1  2  3
}
for(let i of foo()){
    console.log(i);      // 1  2  3
}


// 3-yield和yield*
// 3-1 yield表达式
// yield表达式是生成器函数中的暂停标志
// 迭代器的next()方法每次执行到yield表达式就会暂停执行,并返回yield表达式的值作为value
// yield表达式遵循延迟加载机制,只有生成器函数执行到时才会对表达式求值返回
function* gen() {
    yield  123 + 456;
}
funcIter = gen();
funcIter.next();  // { value = 579, done = true }
                  // 此时才会计算123 + 456表达式

// 3-2 yield*表达式
// yield*表达式用于在生成器函数中执行另一个生成器函数
// yield*等同于对目标生成器函数的for-of循环,循环体内通过yield表达式声明状态
// yield*表达式可以对任何实现了迭代器接口的数据结构对象实现延迟加载的遍历
function* bar() {
    yield 'x';
    yield* gen();
    // yield*表达式等价于 =>
    for (let v of gen()) {
        yield v;
    }
    yield* ["a", "b", "c"]
    yield 'y';
}

// yield*调用的函数有返回值时,可以使用变量接收
// 返回值的赋值操作同样是延迟加载的(内部执行到return才会接收到返回值)
function *bars(){
    let value = yield* gen()
}


// 4-错误抛出 throw
// throw命令:用于在当前运行环境下抛出错误,错误的捕获从当前运行环境开始
// throw()方法:用于在生成器函数的当前运行状态下抛出错误,错误的捕获从生成器函数开始(外部抛出内部处理)
// ①throw()的抛出在函数内部被捕获,会额外自动执行一次next()
function* gen() {
    try {
        yield 1;
    } catch (e) {
        yield 2;
    }
    yield 3;
}
g = gen();
g.next();   // { value = 1, done = false }
g.throw();  // { value = 2, done = false }
g.next();   // { value = 3, done = true }

// ②throw()抛出的错误没有在函数内部捕获,则向调用堆栈传播错误到外部环境
// 传播错误后,即使生成器函数还有后续状态也无法执行,调用next()返回{undefined, true}
function* gen() {
    yield 1;
    yield 3;
}
try{
    var g = gen();
    g.throw();  // 错误传播到外部被捕获
} catch (e) {
    g.next();   // 生成器函数无法继续执行,{ value = undefined, done = true }
}


// 5-终止执行 return
// return()方法用于显式终止生成器函数的执行,默认返回对象{undefined, true}
// 如果return()方法指定了实参,返回对象中的value设为该实参值
function* gen() {
    yield 1;
    yield 2;
    yield 3;
}
g = gen();
g.next()                    // { value: 1, done: false }
g.return(undefined)   // { value: undefined, done: true }
                            // (参数为1时,返回{ value: 1, done: true})
g.next()                    // { value: undefined, done: true }

// 如果生成器函数中有try-finally代码块,且调用return()时函数处于try代码块内:
// 调用return()会令函数立即跳转到finally代码块中并额外自动执行一次next()方法,不会立即终止函数执行
// 通过return()执行完finally代码块后,生成器函数直接结束,
function* numbers () {
    yield 1;
    try {
        yield 2;
        yield 3;
    } finally {
        yield 4;
        yield 5;
    }
    yield 6;
}
g = numbers();
g.next()            // { value: 1, done: false }
g.next()            // { value: 2, done: false }
g.return(7)   // { value: 4, done: false }
g.next()            // { value: 5, done: false }
g.next()            // { value: 7, done: true }


// 6-获取内部属性
// 生成器函数内部定义的属性无法直接改变,因为this的指向发生了改变
// 可以使用绑定方法在调用函数前指定this,这样就可以获取属性了
function* F() {
    this.x = 2;
    this.y = 3;
    yield this.x;
    yield this.y;
}
fIterCall = F.call(F.prototype);
fIterCall.x;    // 2
fIterCall.y;    // 3
fIterCall.next();

// 7-异步生成器函数
// 异步生成器函数是使用async标记的生成器函数,内部既可以使用yield又可以使用await
// 调用异步生成器函数会返回异步迭代器对象,每次调用next()运行到下一个yield后输出:
//  ①如果yield右侧是await,返回该异步操作的Promise对象
//  ②如果yield右侧不是Promise对象,将该值作为value包装为Promise对象
async function* asyncGenerator() {
    console.log('Start');
    const result = await fetch('https://www.random.org');
    // 每当yield取到值,next()返回的Promise对象就变为fulfilled状态,暂停执行
    yield 'Result: ' + await result.text();
    console.log('Done');
}
const ag = asyncGenerator();
ag.next().then(({value, done}) => {
    console.log(value);
})

// 异步生成器函数可以配合for-await-of异步循环遍历使用
// (同步结构也可以使用异步生成器输出,此时不需要await关键字)
async function* prefixLines(asyncIterable) {
    for await (const line of asyncIterable) {
        yield '> ' + line;
    }
}




