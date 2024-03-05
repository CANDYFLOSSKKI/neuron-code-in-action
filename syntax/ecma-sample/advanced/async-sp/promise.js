// Promise异步操作

// 1-Promise的状态变化
// Promise对象用于封装异步操作,对象的状态不受外界影响,共有三种状态:
//  ①pending待定状态:标识异步操作还未执行完毕(异步操作执行完毕之前始终处于待定状态)
//  ②fulfilled已成功状态:标识异步操作执行完毕且成功(显式调用resolve(value)时)
//  ③rejected已失败状态:标识异步操作执行完毕但失败(显式调用reject(error)时)
// Promise对象的状态只可能从pending转换为fulfilled或rejected,转换之后状态不会再发生改变


// 2-异步操作的实例化
// Promise对象通过构造函数实例化,构造函数接收包含两个参数resolve和reject的内置函数用于状态转换
// 异步操作的函数体中不需要添加返回值,而是对异步操作执行的结果作响应:
//  ①执行成功:显式调用resolve(),参数为值类型或对象类型
//  ②执行失败:显式调用reject(),参数为错误对象
// resolve()和reject()通常放在代码末尾,因为他们没有让函数结束的功能(可以结合return强制返回)
const promise = new Promise(function(resolve, reject) {
    let flag = true
    if (flag){
        // 异步操作执行成功,显式调用resolve()返回值
        resolve(value);
    } else {
        // 异步操作执行失败,显式调用reject()返回错误
        reject(new SyntaxError());
    }
});


// 3-异步操作的回调函数
// 3-1 then回调函数
// then()方法可以指定异步操作不同状态的回调函数(在前的参数匹配成功情况,在后的参数匹配失败情况)
promise.then(function(value) {
    // success(通常以value为参数)
}, function(error) {
    // failure(通常以error为参数)
})

// 3-2 catch回调函数
// 如果Promise没有指定reject()的回调函数,异步操作中抛出的错误仅会中断自己的执行,对外不会有反应
// catch()方法专门用于指定reject()的回调函数,只接受单个回调函数作为参数
p.then((val) => console.log('fulfilled:', val))
    .catch((err) => console.log('rejected', err));
// 等效于 =>
p.then((val) => console.log('fulfilled:', val))
    .then(null, (err) => console.log("rejected:", err));

// 3-3 finally回调函数
// finally()方法用于指定无论如何都会执行的回调函数,回调函数的要求如下:
//  ①不接收任何参数,也不需要显式返回
//  ②函数体内存放then()中两个回调函数中共有的,与异步操作的状态无关的部分
server.listen(port)
    .then(function () {})
    .finally(server.stop)

// 如果异步操作只定义了finally回调函数,则相当于对resolve()参数直接返回;对reject()错误直接抛出
promise.finally(() => {})
// 等效于 =>
promise.then(
    result => {return result;},
    error => {throw error;}
);


// 4-回调函数的状态依赖
// 在异步函数中引用另一个异步函数作为参数,将会以目标参数的状态执行回调函数,而忽略原对象的状态
// 回调函数也会等待目标参数对象的异步操作结束后再执行
const p1 = new Promise(function (resolve, reject) {});
const p2 = new Promise(function (resolve, reject) {
    resolve(p1);  // 以p1的状态执行回调函数
                  // 等待p1执行
})


// 5-回调函数的链式调用
// 当回调函数的返回值是Promise对象时,then()方法也可以看成待处理的Promise对象
getJSON("/post/1.json").then(
    post => getJSON(post.commentURL)
).then(
    comments => console.log("resolved: ", comments),
    err => console.log("rejected: ", err)
);


// 6-Promise组合对象
// Promise支持接收一组Promise实例对象及其回调方法组成的数组,组合成新的Promise对象
// ①Promise.all([p1, p2, p3])
// 所有异步操作都fulfilled时转换为fulfilled,返回值是所有返回值组成的数组
// 存在异步操作rejected时转换为rejected,返回值是最先转换为rejected的返回值

// ②Promise.any([p1, p2, p3])
// 存在异步操作fulfilled时转换为fulfilled,返回值是最先转换为fulfilled的返回值
// 所有异步操作都rejected时转换为rejected,返回值是AggregateError(errors属性是所有返回值组成的数组)

// ③Promise.race([p1, p2, p3])
// 状态和返回值始终和最先转换状态的异步操作相同

// ④Promise.allSettled([p1, p2, p3])
// 等待所有异步操作都发生状态转换后才会返回,且始终转换为fulfilled状态
// 返回值包含每个异步操作,格式如下:
Promise.allSettled([p1, p2]).then(
    function (results) {
        console.log(results);
    }
);
// {
//   单个异步操作成功时记录
//   {status: 'fulfilled', value: <返回值>}
//   单个异步操作失败时记录
//   {status: 'rejected', reason: <返回值>}
// }

// 当p1,p2,p3是带回调函数的异步操作时,异步操作的状态取决于回调函数:
//  ①进入then()回调函数,且返回值类型->fulfilled
//  ②进入then()回调函数,且抛出错误->rejected
//  ③进入then()回调函数,且返回Promise对象->状态依赖
//  ④进入catch()回调函数->fulfilled


// 7-Promise包装对象
// ①Promise.resolve():返回无异步操作,状态固定为fulfilled的Promise对象
// ②Promise.reject():返回无异步操作,状态固定为rejected的Promise对象
// 方法参数作为resolve()或reject()方法的参数
const ps = Promise.resolve();                        // (resolve, reject) => resolve()
const pj = Promise.reject();                        // (resolve, reject) => reject()
const psArg = Promise.resolve("成功");  // (resolve, reject) => resolve("成功")
const pjArg = Promise.reject("失败");       // (resolve, reject) => reject("失败")

// 包装对象允许通过then属性添加指定的异步操作
Promise.resolve({
    then: function (resolve, reject) {
        resolve();
    }
}).then(r  =>{})
