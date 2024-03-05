// 数组类型

// 1-数组的定义方式
// 1-1 字面量定义
var arr = [
    {a: 1},
    [1, 2, 3],
    function() {return true;}
];

// 1-2 Array构造函数动态定义
// 使用构造函数定义数组时,不同的实参个数和类型对应不同的定义和初始化行为(建议使用字面量形式定义数组)
// ①无参数时,返回一个空数组
new Array()                         // []
// ②单个正整数参数,表示返回的新数组的长度
new Array(1)            // [ empty ]
new Array(2)            // [ empty x 2 ]
// ③非正整数的数值作为参数,报错
new Array(3.2)          // RangeError: Invalid array length
new Array(-3)           // RangeError: Invalid array length
// ④单个非数值（比如字符串、布尔值、对象等）作为参数时,该参数是返回的新数组的成员
new Array('abc')             // ['abc']
new Array([1])               // [Array[1]]
// ⑤多参数时,所有参数都是返回的新数组的成员
new Array(1, 2)              // [1, 2]
new Array('a', 'b', 'c')     // ['a', 'b', 'c']


// 2-数组的键名
// JS中数组是特殊的对象,数组元素的类型可以各不相同
// 数组初始化后,按照声明顺序有着0~n的默认键名,访问数组元素可以通过整数索引器,也可以通过键值索引器
// 数组初始化后可以显式指定任意键名下的数组元素值,键名不要求连续,但是必须是非负整数或其字符串形式
var arr = ['a', 'b', 'c'];
Object.keys(arr)  // ["0", "1", "2"]
arr['0']          // 'a'
arr[0]            // 'a'

arr[999] = 'd';   //键名为非负整数,作为数组元素保存
arr['op'] = 'e';  //键名不是非负整数及其字符串形式,作为数组属性保存


// 3-数组的空位元素
// 当数组的某个位置是空元素时(通常位于两个逗号之间)称为空位(数组定义时末尾的逗号会被忽略)
// 计算数组长度时,空位也会被考虑其中
// 空位被索引器读取时返回undefined,但空位和值为undefined的数组元素是不同的
// 通常遍历数组使用的方法:①forEach;②for-in;③Object.keys会跳过空位
var a = [1, , 1];   // length = 3, [1, <空位>, 3]
var a = [1, 2, 3,]; // length = 3, [1, 2, 3]

// 4-数组的长度
// 数组的长度是动态的,数组长度属性length的值始终等于键名中的最大整数+1
// 因为长度取决于键名,定义键名不连续的数组元素时,可能会使得length的值失去意义
var arr = ['a', 'b'];   // 初始化,arr.length = 2
arr[2] = 'c';                   // arr.length = 3
arr[9] = 'd';                   // arr.length = 10
arr[1000] = 'e';                // arr.length = 1001

// 数组长度length的值可以被显式更改,更改可能会反馈到数组元素上,规则如下:
// ①length的值设为小于当前元素个数时,数组会自动截断
// ②length的值设为0时,数组会自动清空
// ③length的值设为大于当前元素个数时,数组会自动向后添加空位元素
var arr = [ 'a', 'b', 'c' ];  // 初始化,arr.length = 3
arr.length = 2;     // 数组自动截断,arr = ['a', 'b']
arr.length = 3;     // 数组自动添加空位元素,arr = ['a', 'b', <空位>]
a.length = -1;      // 数组长度非法,报错


// 5-数组的遍历方式
// ①for-in
// 数组作为特殊的对象,也可以使用对象遍历的方法实现遍历
// 使用for-in遍历的缺陷是不仅会遍历到键名对应的数组元素,还会遍历到数组中的自定义属性
var a = [1, 2, 3];
a.foo = true;
for (var i in a) {
    console.log(key);  //0 1 2 foo(遍历到foo属性)
}

// ②while
// while需要以键名的整数索引值作为循环变量遍历
// 使用while的缺陷是数组中的键名可以是非连续的,while可能浪费时间在遍历空位元素上
var a = [1, 2, 3];
var i = 0;
while (i < a.length) {
    console.log(a[i]);
    i++;
}

// ③forEach
// forEach()方法接收指定参数的遍历函数作为参数,实现自定义遍历逻辑
// 遍历函数包含三个参数:①当前遍历元素值element;②当前遍历位置index;③目标数组array
function log(element, index, array) {
    console.log('[' + index + '] = ' + element);
}
[2, 5, 9].forEach(log);
