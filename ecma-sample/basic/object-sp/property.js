// 对象属性

// 1-属性键名的命名规则
// 属性键名必须符合标识名条件,键名通常会被自动识别为字符串形式
// 如果键名本身不是数字,但首字符是数字或键名中含有空格和运算符时,必须添加引号标识
// 如果键名是Symbol类型,必须使用方括号[]避免Symbol被识别为字符串
var obj = {
    123: 'Hello World',
    '1p': 'Hello World',
    'h w': 'Hello World',
    'p+q': 'Hello World',
    [Symbol.asyncDispose]: 'Hello World'
};


// 2-属性的访问
// ①点运算符.       点运算符默认将右侧看作字符串     ->适用于键名属性
// ②方括号运算符[]  方括号运算符默认将括号内看作变量  ->适用于变量/表达式/Symbol属性
var obj = {
    p: 'Hello World'
};
obj.p       // "Hello World"
obj['p']    // "Hello World"

// 访问数值键名的属性时不能使用点运算符(会被识别为小数点)
// (如下方访问属性不能使用obj.123)
var obj = {
    123: 'hello world'
};
obj[123]    // "hello world"


// 3-属性的查找
// in运算符可以检查对象是否包含指定键名的属性
// in运算符无法判断属性是对象自身的还是继承的,可以调用hasOwnProperty()判断属性是否由对象定义
var obj = {};
if ('toString' in obj) {                             // true,原型对象继承的属性
    console.log(obj.hasOwnProperty('toString'))   // false,不是对象定义的属性
}


// 4-属性的遍历
// 属性遍历的方法:
// ①for-in                          遍历对象自身和继承的可遍历属性
// ②Object.keys()                   返回对象自身所有可遍历属性的键名(不包括Symbol属性)
// ③Object.getOwnPropertyNames()    返回对象自身所有属性的键名(包括不可遍历属性;不包括Symbol属性)
// ④Object.getOwnPropertySymbols()  返回对象自身所有Symbol属性的键名
// ⑤Reflect.ownKeys()               返回对象自身所有属性的键名(包括不可遍历属性和Symbol属性)

// 属性遍历的次序:
// ①按数值的大小遍历所有数值键名属性
// ②按定义的先后顺序遍历所有字符串键名属性
// ③按定义的先后顺序遍历所有Symbol属性
var obj = {a: 1, b: 2, c: 3};
Object.keys(obj)
for (var i in obj) {
    console.log('键名：', i);
    console.log('键值：', obj[i]);
}


// 5-属性的删除
// delete命令可以删除指定的对象属性,属性删除后再对其读取会返回undefined
// delete命令删除成功或删除不存在的属性都返回true;删除不可删除的属性时返回false
// delete命令只能删除对象定义的属性而不能删除继承的属性(返回false)
var obj = { p: 1 };
delete obj.p    // true
obj.p           // undefined


// 6-属性批量操作
// with语句可用于操作相同对象的多个属性
// with括号()中声明对象名后,{}内该对象的属性可以直接被访问而无需引用对象名
// with语句的{}不属于块作用域,访问对象没有的属性时会视为操作当前作用域内的全局变量
var obj = {};
with (obj) {
    p1 = 4;
    p2 = 5;
}
obj.p1      // undefined
p1          // 4


// 7-构造函数
// 构造函数的声明形式和普通函数相同(也有多种表示方法),通常将构造函数名的首字母大写以作区分
// 构造函数的函数体内部使用this关键字代表当前的实例对象,为其属性赋值
// 构造函数不需要返回值,调用构造函数时自动返回this指代的实例对象
var Vehicle = function () {this.price = 1000;};
function Vehicle(p) {this.price = p;}
var v1 = new Vehicle();         // price = 1000
var v2 = new Vehicle(2000);  // price = 2000

// 使用构造函数创建实例对象必须使用new命令
// 函数内部可以使用new.target属性判断外部是否以new的形式调用
// ①使用new时:new.target为当前构造函数(严格相等)
// ②不使用new时:new.target为undefined
function f() {
    console.log(new.target === f);
}
f()         // false
new f()     // true


// 8-属性描述对象
// 实例对象的属性信息使用单独的属性描述对象保存,属性描述对象中的属性被称为元属性
//  ①value          目标属性的值
//  ②writable       标识目标属性是否可写
//  ③enumerable     标识目标属性是否可遍历
//  ④configurable   标识目标属性的属性描述对象是否可写和目标属性是否可被删除
//  ⑤get            属性的取值函数getter,默认为undefined
//  ⑥set            属性的存值函数setter,默认为undefined

// 8-1 获取属性描述对象
// Object.getOwnPropertyDescriptor()可以获取指定属性的属性描述对象(继承的属性除外)
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }

// 8-2 修改属性描述对象
// Object.defineProperties()可以修改指定属性的属性描述对象
// get和set元属性称为存取器,对他们的赋值要遵守一定的规则:
// get方法必须没有参数且有返回值;set方法必须有value参数且无返回值(相当于对赋值运算符的重载)
Object.defineProperty(obj, 'foo', {
    value: 123,
    writable: true,
    enumerable: true,
    configuration: true,
    get: function() {
        return this.foo
    },
    set: function(value) {
        this.foo = value;
    }
});

// 属性的get和set元属性也可以直接在对象内部定义
var obj = {
    get foo() {
        return this.foo;
    },
    set foo(value) {
        this.foo = value;
    }
}


// 9-属性拷贝
// 向目标对象拷贝实例对象,通常选择拷贝属性描述对象(存取器也会被拷贝)而非属性值:
// ①for-in遍历实例对象的所有属性
// ②判断目标对象是否包含当前属性
// ③拷贝当前属性的属性描述对象到目标对象
function copyTo(to, from) {
    for (var property in from) {
        if (!from.hasOwnProperty(property)) continue;
        Object.defineProperty(to, property,
            Object.getOwnPropertyDescriptor(from, property)
        );
    }
    return to;
}
