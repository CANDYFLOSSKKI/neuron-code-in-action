// 类型转换

// 1-字符串转整数 parseInt()
// 2-字符串转浮点数 parseFloat()
// (见data-sp)
parseInt('123')     // 123
parseFloat('3.14')  // 3.14


// 3-任意类型转数值 Number()
// Number()转换时进行整体转换而不是逐个解析字符
// 只要有字符无法转换为数值,Number()就会返回NaN;空字符串''返回0
Number(324)         // 324
Number('324')       // 324
Number('324abc')    // NaN
Number('')          // 0
Number(true)        // 1
Number(false)       // 0
Number(undefined)   // NaN
Number(null)        // 0

// 转换参数是复合类型时,若为仅包含单个数值的数组时,Number()会返回这个元素
Number({a: 1})      // NaN
Number([1, 2, 3])   // NaN
Number([5])         // 5


// 4-任意类型转字符串 String()
// 注意JS中的toString()不能实现类型转换,他是用于输出类型字符串的
// ①数值:转为相应的字符串
String(123)         // "123"
// ②字符串:转换后还是原来的值
String('abc')       // "abc"
// ③布尔值:true转为字符串"true";false转为字符串"false"
String(true)        // "true"
// ④undefined:转为字符串"undefined"
String(undefined)   // "undefined"
// ⑤null:转为字符串"null"
String(null)        // "null"

// 转换参数为复合类型时:
//  ①如果是对象,则返回类型字符串
//  ②如果是数组,则返回数组的字符串形式
String({a: 1})      // "[object Object]"
                          // 等同于 String({a: 1}.toString())
String([1, 2, 3])  // "1,2,3"


// 5-任意类型转布尔值 Boolean()
// 所有对象类型参数都默认返回true
// 除以下特殊情况外,Boolean()的转换结果都是true:
Boolean(undefined)      // false
Boolean(null)           // false
Boolean(0)              // false(包括+0和-0)
Boolean(NaN)                  // false
Boolean('')             // false
Boolean(true)           // true
Boolean(false)          // false


// 6-数组转换
// 6-1 Array.from()
// 向Array.from()传递真数组参数,会返回全新的数组
// Array.from()支持函数表达式形式的可选函数,相当于在返回数组前对数组调用map()处理
// ①将类似数组的对象(要求有length属性)转换为数组
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
let arr2 = Array.from(arrayLike);  // ['a', 'b', 'c']

// ②将实现遍历接口Iterator的对象转换为数组
let namesSet = new Set(['a', 'b'])
Array.from(namesSet)  // ['a', 'b']

// 6-2 Array.of()
// Array.of()是Array()的改进型,用于将一组值转换为数组
// Array.of()不存在不同参数导致的重载类型问题,总是返回参数值组成的数组(没有参数时返回空数组)
Array.of()                  // []
Array.of(undefined)  // [undefined]
Array.of(1)          // [1]
Array.of(1, 2)       // [1, 2]
