// Set型集合(不允许存储重复元素)

// 1-Set的定义和初始化
// Set的构造函数可以接受数组和类似数组的对象作为参数,数组中的重复元素将会被忽略
// Set内部判断两个值是否相同的规则类似于严格相等运算符===,特殊情况如下:
//  ->两个NaN在Set中相等
//  ->两个对象在Set中总是不相等
// ①Set()构造函数创建和初始化
const s = new Set();
const set = new Set([1, 2, 3, 4, 4]);
const set = new Set(document.querySelectorAll('div'));

// ②DOM对象操作集合初始化
let set = new Set();
document
    .querySelectorAll('div')
    .forEach(div => set.add(div));

// 1-1 扩展运算符实现数组到Set的去重操作
// ①去除数组的重复成员
set = [...new Set(array)]

// ②去除字符串的重复成员
set = [...new Set('ababbc')].join('')


// 2-Set的操作方法
// ①add(value) 向Set添加指定值,返回添加值后的新Set
// ②delete(value) 从Set删除指定值,返回布尔值标识删除操作是否成功
// ③has(value) 判断Set中是否包含指定值
// ④clear() 清空Set
set = set.add(1)
flag = set.delete(1)
flag = set.has(2)
set.clear()


// 3-Set的遍历方法
// ①获取迭代器对象
// ->keys()     键名迭代器对象
// ->values()   键值迭代器对象
// ->entries()  键值对迭代器对象
// Set中只有键值,因此Set对象调用keys()和values()返回的迭代器相同,entries()成对的元素相同
// Set迭代器遍历的顺序是元素插入的顺序
let set = new Set(['red', 'green', 'blue']);
for (let item of set.keys()) {console.log(item);}
    // red green blue
for (let item of set.values()) {console.log(item);}
    // red green blue
for (let item of set.entries()) {console.log(item);}
    // ["red", "red"] ["green", "green"] ["blue", "blue"]

// ②for-of
// for-of内部默认调用迭代器，不需要提前获取迭代器对象
// (因为Set从适用性上存储的不是键值对类型数据,更推荐使用for-of实现遍历)
let set = new Set(['red', 'green', 'blue']);
for (let x of set) {console.log(x);}
    // red green blue

// ③forEach()
// forEach()是针对键值对元素的操作方法,接收参数为value,key,set的方法,对集合元素批量操作
let set = new Set([1, 4, 9]);
set.forEach((value, key,set) => console.log(key + ' : ' + value))
    // 1 : 1
    // 4 : 4
    // 9 : 9


// 4-Set的集合运算
// Set中不允许添加重复元素,因此适合进行交集、并集、差集等集合操作
// Set对象没有集合相关的实例方法,实现集合运算借助扩展运算符和过滤完成:
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// ①a和b的并集
// 将a和b都用扩展运算符拆解为列表,再通过Set()构造函数合成为新的Set
let union = new Set([...a, ...b]);
    // Set {1, 2, 3, 4}

// ②a和b的交集
// 将a用扩展运算符拆解为列表,对a列表的每个元素判断b中是否也存在,过滤后再合成新的Set
let intersect = new Set([...a].filter(x => b.has(x)));
    // set {2, 3}

// ③a相对于b的差集
// 和求交集的步骤类似,判断条件置反即可
let difference = new Set([...a].filter(x => !b.has(x)));
    // Set {1}
