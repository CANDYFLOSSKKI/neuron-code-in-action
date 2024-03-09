// 反射

// 1-反射的标准库方法
// Reflect.apply(target, thisArg, args)
//      等同于Function.prototype.apply.call();绑定this后执行目标函数
// Reflect.construct(target, args)
//      调用指定构造函数创建实例对象
// Reflect.get(target, name, receiver)
//      查找并返回目标对象的指定属性值,未找到返回undefined
// Reflect.set(target, name, value, receiver)
//      设置目标对象的指定属性值
// Reflect.defineProperty(target, name, desc)
//      等同于Object.defineProperty();设置目标对象的属性值
// Reflect.deleteProperty(target, name)
//      删除对象的指定属性,返回布尔值(属性不存在返回true)
// Reflect.has(target, name)
//      判断对象中是否包含指定属性
// Reflect.ownKeys(target)
//      返回对象的所有属性(包括Symbol属性)
// Reflect.isExtensible(target)
//      等同于Object.isExtensible();判断当前对象是否可扩展,返回布尔值
// Reflect.preventExtensions(target)
//      等同于Object.preventExtensions();将指定对象变为不可扩展,返回布尔值
// Reflect.getOwnPropertyDescriptor(target, name)
//      等同于Object.getOwnPropertyDescriptor();返回指定属性的描述对象
// Reflect.getPrototypeOf(target)
//      获取目标对象的原型
// Reflect.setPrototypeOf(target, prototype)
//      设置目标对象的原型;返回布尔值


// 2-反射的存值和赋值函数
// Reflect.get()和Reflect.set()方法都包含可选参数receiver
// 当目标属性设置了get和set元属性时,通过反射调用的this会发生变化,receiver用于指定运行环境
var myObject = {
    foo: 1,
    bar: 2,
    get baz() {
        return this.foo + this.bar;
    },
};
Reflect.get(myObject, 'baz', myObject);  // 3


// 3-反射与代理
// Reflect方法通常和Proxy方法配合使用,每个Proxy拦截方法都有同名的Reflect方法与之对应
// 拦截方法判断可以对目标对象执行操作后,可以使用Reflect方法操作目标对象:
//  ①Reflect方法相比Object方法提供了规范完整的返回值和错误处理机制
//  ②Reflect方法以反射方式调用内部操作,增强代码的兼容性
//  ③Reflect方法代替运算符和命令式操作,提高对目标对象操作的可读性和一致性
Proxy(target, {
    set: function(target, name, value, receiver) {
        // 注意对代理对象的Reflect.set()会使得defineProperty()拦截方法生效
        let success = Reflect.set(target, name, value, receiver);
        if (success) {
            console.log('property...');
        }
        return success;
    }
});

