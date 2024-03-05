// 定时器

// 1-事件循环机制
// JS是单线程的,语句按照代码文件中出现的顺序执行.语句的类型不同,处理的方式也有所不同:
// ①同步任务:在主线程中立即执行
// ②异步任务:事件立即执行,回调函数注册到任务队列中,等待主线程中的同步任务执行完毕才会执行
//   1->宏任务(定时器):计时立即执行;回调函数被注册到下一轮次的宏任务队列
//   2->微任务(Promise):事件立即执行并改变对象状态;回调函数被注册到当前轮次的微任务队列

// 事件循环是按照轮次执行的,每轮的执行顺序是先执行宏任务队列回调函数,再执行微任务队列回调函数
// 事件循环的起始点是主线程中的同步任务,同步任务被视为第一轮次的宏任务(因此第一轮的微任务比宏任务快)
// 结合下面的例子理解(字符串内容表示输出的顺序)
console.log('->1');
setTimeout(()=>{
    console.log('->6')
},0);
(async function start() {
    console.log('->2')
    await Promise.resolve().then(()=>{
        console.log('->4')
    })
    console.log('->5')
})();
console.log('->3');


// 2-延迟执行定时器 setTimeout
// setTimeout()函数用于指定回调函数在规定的时间后执行
// setTimeout()包括如下参数:①受控的回调函数;②规定的延迟时间(ms);③回调函数的实参(可选)
// setTimeout()返回标识定时器编号的整数值
// 如果回调函数是对象的方法,调用时this指向会变为全局环境,需要提前绑定this指向
timeOut = setTimeout(function() {
    console.log(2);
}, 1000);

// clearTimeout()函数可以取消指定编号的延迟执行定时器,被取消的定时器不会执行回调函数
id = setTimeout(f, 1000);
clearTimeout(id);


// 3-间隔执行定时器 setInterval
// setInterval()函数用于指定回调函数每隔规定的一段时间就执行一次,无限循环
// setInterval()的参数,返回值,取消和回调函数的执行都与setTimeout保持一致
timeInterval = setInterval(function() {
    console.log(2);
}, 1000)

// setInterval()计算的是回调函数两次执行之间的时间,时间要小于规定值
// 要想设定为严格的间隔时间,可以使用setTimeout()嵌套
var timer = setTimeout(function f() {
    // 重新设定定时器为新的2s后执行,间隔为本轮回调函数结束->下轮回调函数开始
    timer = setTimeout(f, 2000);
}, 2000);
