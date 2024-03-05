// 迭代器

// 1-迭代器的遍历流程
// ①创建指向当前数据结构起始位置的指针对象,指针对象的初始值不指向任何成员(相当于头结点)
// ②调用指针对象的next()方法,可以向后移动指针,直到指向数据结构的结束位置
// ③每次调用next()都会返回当前成员的信息对象,包括成员值的value和标识遍历结束的done
// (遍历到最后一个元素时done仍为true,只有value为undefined时done才会变false)


// 2-迭代器接口的实现
// 2-1 外部的迭代器接口函数
// ①迭代函数接收需要遍历的数组参数,在函数内部初始化一个索引值变量nextIndex
// ②内层函数next()通过闭包返回数组元素的同时自增索引值,索引值=数组长度时done设置为true,标识遍历结束
function makeIterator(array) {
    // 索引值变量初始化
    let nextIndex = 0;
    return {
        next: function() {
            // 索引值=数组长度时遍历结束,返回(undefined,true)
            return nextIndex < array.length ?
                {value: array[nextIndex++], done: false} :
                {value: undefined, done: true};
        }
    };
}

// 2-2 对象的迭代器接口方法
// ①接口方法不接收参数,仅用于遍历实例对象自身的数据结构
// ②接口方法必须使用内置的Symbol值Symbol.iterator作为属性标识
// ③next()方法属于内层函数,this指向全局环境,需要提前捕获this供next()方法指向实例对象自身
let dData = {
    data: [],
    // 内置Symbol标识符
    [Symbol.iterator]() {
        // 在next()之前捕获当前运行环境(即实例对象自身)
        const self = this;
        let index = 0;
        return {
            next: function() {
                return index < self.data.length ?
                    {value: self.data[index++], done: false} :
                    {value: undefined, done: true};
            }
        };
    }
}


// 2-3 内置的迭代器接口方法
// 常用的数据结构都内置Iterator实现(Array,Set,Map,String,arguments...)
// (对象不能确定属性遍历的顺序,因此对象类型没有内置的迭代器,也不推荐显式定义)
// 解构赋值,扩展运算符,for-of,Array.from()等常见的遍历场合都会默认调用迭代器
// 可以显式提取他们的迭代器属性[Symbol.iterator]自定义遍历业务
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }


// 3-for-of迭代器循环遍历
// for-of是使用迭代器遍历的方法,在处理数组时和for-in的逻辑有很大不同:
//  ①for-of每次循环读取的是键值value;for-in每次循环读取的是0~n的键名key
//  ②for-of只会遍历数字索引的数组元素;for-in会遍历所有数组元素和数组对象的自定义属性
let arr = [3, 5, 7];
arr.foo = 'hello';
// ①使用for-in遍历数组
for (let i in arr) {
    console.log(i); // "0", "1", "2", "foo"
}
// ②使用for-of遍历数组
for (let i of arr) {
    console.log(i); //  "3", "5", "7"
}


// 4-异步遍历器
// 异步遍历器中,调用next()得到value和done的过程是异步的
// 4-1 同步遍历转换异步遍历
// 同步遍历接口转为异步遍历接口使用如下的原生方法(使用生成器函数异步给出元素):
async function* createAsyncIterable(syncIterable) {
    for (const elem of syncIterable) {
        yield elem;
    }
}
// ①调用createAsyncIterable()可将已经实现同步迭代器的对象转换为异步迭代器对象
// ②获取异步迭代器对象的[Symbol.asyncIterator]属性(属性名固定)得到异步迭代器
const asyncIterable = createAsyncIterable(['a', 'b']);
const asyncIterator = asyncIterable[Symbol.asyncIterator]();

// 4-2 异步遍历的回调函数
// 异步遍历的next()返回Promise对象,需要使用回调函数处理
// 使用嵌套的回调函数then(),在then()的结尾再次调用next()即可实现异步遍历
asyncIterator
    .next()
    .then(iterResult1 => {
        console.log(iterResult1);  // { value: 'a', done: false }
        return asyncIterator.next();
    })
    .then(iterResult2 => {
        console.log(iterResult2);  // { value: 'b', done: false }
        return asyncIterator.next();
    })
    .then(iterResult3 => {
        console.log(iterResult3);  // { value: undefined, done: true }
    });

// 可以传递异步迭代器参数,在async异步方法中await输出遍历结果从而代替then()嵌套结构
async function f(asyncIterator) {
    console.log(await asyncIterator.next());  // { value: 'a', done: false }
    console.log(await asyncIterator.next());  // { value: 'b', done: false }
    console.log(await asyncIterator.next());  // { value: undefined, done: true }
}

// 异步的next()可以多次调用(使用Promise包装对象组合),遍历结果可以积累起来一并获取
const [{value: v1}, {value: v2}] = await Promise.all([
    asyncIterator.next(), asyncIterator.next()
]);


// 5-for-await-of异步迭代器循环遍历
// for-await-of需要在async异步方法内部调用
// 给出实现异步迭代器的对象,for-await-of会自动调用该对象[Symbol.asyncIterator]属性获取异步迭代器
// 如果对象只包含同步迭代器,for-await-of会当做for-of使用
async function f() {
    for await (const x of createAsyncIterable(['a', 'b'])) {
        console.log(x);
    }
}

// for-await-of遍历的Promise对象不能是rejected状态(报错),需要给出try-catch块捕获错误
async function f() {
    try {
        for await (const x of createAsyncIterable(['a', 'b'])) {
            console.log(x);
        }
    } catch (e) {
        console.error(e);
    }
}
