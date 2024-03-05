// 代理

// 1-代理对象的执行过程
// Proxy在目标对象之前设立拦截器并定义部分对象操作的改写逻辑
// ①对目标对象target的操作:不经过拦截器,直接生效
// ②对代理对象proxy的操作:经过拦截器执行且this指向发生改变(原来指向proxy,捕获后指向handler)

// 代理对象也可以作为其他对象的原型对象
// 对象调用自己的属性不受影响;调用不存在的属性,经过原型链查找到代理对象时才会被拦截器捕获


// 2-代理对象的实例化
// ①Proxy()
// 构造函数需要传递目标对象target和拦截器handler两个参数
var proxy = new Proxy(target, {
    get: function(target, propKey) {
        return 35;
    }
});

// ②Proxy.revocable()
// Proxy.revocable()也可以接收目标对象target和拦截器handler参数创建代理对象
// 方法返回包含如下两个属性的对象:
//  -> proxy:创建的代理对象
//  -> revoke:代理对象的撤销方法(调用revoke()后代理对象失效,对代理对象的任何操作都会抛出错误)
let {proxy, revoke} = Proxy.revocable(target, handler);
proxy.foo = 123;  // 正常执行
revoke();
proxy.foo = 123;  // 抛出错误->TypeError: Revoked


// 3-拦截器的常用拦截方法
// 3-1 属性读取 get(target, propKey, receiver)
// get方法用于拦截对代理对象属性的读取操作
// get方法参数应该包含:①目标对象target;②属性名propKey;③代理对象(可选)
// get方法返回值应该是键值(读取成功)或抛出错误(读取失败)
var proxy = new Proxy({}, {
    get: function(target, propKey) {
        if (propKey in target) {
            // 读取成功情况:返回读取的目标键值
            return target[propKey];
        } else {
            // 读取失败情况:抛出错误
            throw new ReferenceError("not exist");
        }
    }
})

// 3-2 属性赋值 set(target, propKey, value, receiver)
// set方法用于拦截对代理对象属性的赋值操作
// set方法参数应该包含:①目标对象target;②属性名propKey;③属性值propValue;④代理对象(可选)
// set方法返回值应该是true(赋值成功)或抛出错误(赋值失败),不需要显式返回false
var proxy = new Proxy({}, {
    set: function(obj, prop, value) {
        if (prop === 'age') {
            // 赋值失败直接抛出错误而不是返回false
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
            }
        }
        obj[prop] = value;
        // 赋值成功显式返回true
        return true;
    }
})

// 3-3 属性查找 has(target, propKey)
// has方法用于拦截对象是否有某属性的判断操作(对in运算符生效;对for-in循环不生效)
// has方法参数应该包含:①目标对象target;②属性名propKey
// has方法返回值应该是显式的判断结果(true/false)
// has方法不关心属性是对象自身定义的还是继承的;可以有意返回false从而隐藏某个属性
let stu = {name: '张三', score: 59};
let proxy = new Proxy(stu, {
    has(target, prop) {
        if (prop === 'score' && target[prop] < 60) {
            console.log(`${target.name} 不及格`);
            return false;
        }
        return prop in target;
    }
})

// 3-4 属性删除 deleteProperty(target, propKey)
// deleteProperty方法用于拦截对象属性的删除操作
// deleteProperty方法参数应该包含:①目标对象target;②属性名propKey
// deleteProperty方法返回值应该是true(删除成功)或抛出错误(删除失败),不需要显式返回false
var target = { _prop: 'foo' };
var proxy = new Proxy(target, {
    deleteProperty (target, key) {
        if (key[0] === '_') {
            throw new Error(`Invalid property`);
        }
        delete target[key];
        return true;
    }
});

// 3-5 属性键名读取 ownKeys(target)
// ownKeys方法拦截对对象自身所有属性的读取操作,拦截的方法如下:
//  ①Object.getOwnPropertyNames()
//  ②Object.getOwnPropertySymbols()
//  ③Object.keys()
//  ④for-in循环
// ownKeys方法参数应该是目标对象target
// ownKeys方法应该返回属性键名组成的数组,数组成员只能是字符串或Symbol值
var obj = {a: 1, b: 2};
var p = new Proxy(obj, {
    ownKeys: function(target) {
        // 返回属性键名组成的数组
        return ['a', 'b'];
    }
});

// 3-6 原型对象读取 getPrototypeOf(target)
// getPrototypeOf方法用于拦截原型对象的读取操作,拦截的方法如下:
//  ①Object.prototype.isPrototypeOf()
//  ②Object.getPrototypeOf()
//  ③Reflect.getPrototypeOf()
//  ④instanceof
// getPrototypeOf方法参数应该是目标对象target
// getPrototypeOf方法应该显式返回原型对象(读取成功)或抛出错误(读取失败)
var proto = {};
var p = new Proxy({}, {
    getPrototypeOf(target) {
        return proto;
    }
});
flag = Object.getPrototypeOf(p) === proto  // true

// 3-7 原型对象赋值 setPrototypeOf(target, proto)
// setPrototypeOf方法用于拦截原型对象的赋值操作,即拦截Object.setPrototypeOf()
// setPrototypeOf方法参数应该包含:①目标对象target;②原型对象proto
// setPrototypeOf方法应该返回布尔值(true/false)标识赋值结果
var proto = {};
var target = function () {};
var proxy = new Proxy(target, {
    setPrototypeOf (target, proto) {
        throw new Error('Changing the prototype is forbidden');
    }
});

// 3-8 函数调用 apply(target, object, args)
// apply方法用于拦截函数调用和call/apply两种绑定调用方式,apply的目标对象和代理对象都是函数
// apply方法参数应该包含:①目标对象target;②运行环境this(形参使用别名代替);③参数数组args
var target = function () { return 'I am the target'; };
var p = new Proxy(target, {
    apply: function () {
        return 'I am the proxy';
    }
});
p()  // "I am the proxy"

// 3-9 构造函数调用 construct(target, args)
// construct方法用于拦截new命令实例化对象,construct的目标对象和代理对象都是函数
// construct方法参数应该包含:①目标对象target;②参数数组args
// construct方法必须显式返回对象类型
// construct方法内的this关键字指向拦截器handler而不是实例对象,因此不能当做普通的构造函数使用
let p = new Proxy(function () {}, {
    construct: function(target, args) {
        console.log(this === handler);
        return new target(...args);
    }
});
new p()  // true
