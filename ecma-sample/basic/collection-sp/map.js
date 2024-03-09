// Map型集合(键值对方式存储元素)

// 1-Map的定义和初始化
// Map的键不要求为字符串类型,包括对象在内的各种类型都可以作为Map中的键
// Map中的键和内存地址绑定,只要内存地址不同,即使同名也会视为两个不同的键
// ①构造函数传递数组参数
let map = new Map([
    ['name', '张三'],
    ['title', 'Author']
]);

// ②构造函数传递Set参数
const set = new Set([
    ['foo', 1],
    ['bar', 2]
]);
const m = new Map(set);


// 2-Map的操作方法
// ①set(key,value)  设置指定键名对应的键值,返回设置后的新Map
// ②get(key)        查找指定键名对应的键值,若查找失败返回undefined
// ③has(key)        判断Map包含指定键对应的元素
// ④delete(key)     删除指定的键名,返回布尔值标识是否删除成功
// ⑤clear()         清空Map元素
map = map.set("age",18)
map.get("name")
map.has("name")
map.delete("age")
map.clear()


// 3-Map的遍历方法
// ①获取迭代器对象
// ->keys()     键名迭代器对象
// ->values()   键值迭代器对象
// ->entries()  键值对迭代器对象
// Map迭代器遍历的顺序是元素插入的顺序
const map = new Map([
    ['F', 'no'],
    ['T',  'yes'],
]);
for (let key of map.keys()) {console.log(key);}
    // "F", "T"
for (let value of map.values()) {console.log(value);}
    // "no", "yes"
for (let item of map.entries()) {console.log(item[0], item[1]);}
    // ("F","no"), ("T","yes")
for (let [key, value] of map.entries()) {console.log(key, value);}
    // (键值对元素解构)("F","no"), ("T","yes")

// ②for-of
// for-of循环遍历内部默认调用迭代器,不需要提前获取迭代器对象
for (let [key, value] of map) {console.log(key, value);}
    // ("F","no"), ("T","yes")

// ③forEach()
// forEach()是针对键值对元素的操作方法,接收参数为value,key,map的方法,对集合元素批量操作
map.forEach(function(value, key, map) {
    console.log("Key: %s, Value: %s", key, value);
});


// 4-Map类型转换
// ①Map转换为数组
// Map对象可以通过扩展运算符...转换为数组
// 每个键值对转换后都是数组类型的元素,因此相当于在转换的目标数组中嵌套键值对数组
const myMap = new Map()
    .set(true, 7)
    .set({foo: 3}, ['abc']);
[...myMap]
    // [
    //   [ true, 7 ],
    //   [ { foo: 3 }, [ 'abc' ] ]
    // ]

// ②Map转换为对象
// ①如果Map的键名都是字符串类型,转换为对象后不会有任何变化
// ②如果Map的键名存在非字符串类型,转换为对象时键名需要通过toString()自动转换
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {obj[k] = v;}
    return obj;
}
const myMap = new Map()
    .set('yes', true)
    .set('no', false);
strMapToObj(myMap)
    // {
    //    yes: true,
    //    no: false
    // }
