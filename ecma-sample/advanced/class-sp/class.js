// 类

// 1-类和原型对象
// 类是原型对象的语法糖,类对所有实例对象共享的特性和原型对象相同(类也有prototype属性)
// 类中定义的结构等同于原型对象上定义的结构(构造函数相当于原型对象上绑定的构造函数)

// ①类中定义的非静态方法:定义在类的原型对象上,被实例对象所共享
// ②类中定义的非静态属性:定义在类的实例对象上,无法通过原型对象访问
class Point {
    constructor() {}     // 构造函数
    num = 1;    // 非静态属性
    toString() {}        // 非静态方法
    toValue() {}
}

// =>(等价)原型对象的写法
function Point(){
    this.num = 1
}
Point.prototype.toString = function(){}
Point.prototype.toValue = function(){}

// =>(等价)类定义的原型对象结构
Point.prototype = {
    constructor() {},
    toString() {},
    toValue() {},
}


// 2-类的构造函数
// constructor()是类的默认方法,类中没有显式定义的构造函数时会默认添加空构造函数
// constructor()通常不需要返回值,默认隐式返回实例对象this
// constructor()也可以自定义返回值(且允许不是目标类的实例对象),不推荐使用
class Foo {
    constructor() {
        return Object.create(null);
    }
}
flag = new Foo() instanceof Foo  // false


// 3-类的取值(get)和存值(set)函数
// 类中可以使用get和set关键字设置属性的自定义取值函数和存值函数
// 取值函数和存值函数分别对应着属性描述对象的get和set元属性
class Point {
    get prop() {
        return 'getter';
    }
    set prop(value) {
        console.log('setter: '+value);
    }
}


// 4-类的静态属性和方法
// 类中可以使用static关键字定义静态属性和静态方法
// 类的静态属性和方法的访问方式和原型对象不同,不能通过原型链而只能通过类访问
// 静态属性和方法中的this关键字指向当前类
class Point {
    static num = 1;
    static toString() {
        return String(num).valueOf()
    }
}
Point.num           // 1
Point.toString()    // '1'
new Point().num     // 报错,不能通过实例对象的原型链访问


// 5-类的私有属性和方法
// 属性名和方法名前加#可标识私有属性和私有方法
// #是属性名或方法名的一部分,比如#x和x属性可以同时存在，调用时也需要加#
// 私有属性只能在类内部通过this调用,调用不存在的私有属性不会返回undefined,而是直接报错
class Foo {
    #a;
    #b;
    constructor(a, b) {
        this.#a = a;
        this.#b = b;
    }
    #sum() {
        return this.#a + this.#b;
    }
    printSum() {
        console.log(this.#sum());
    }
}


// 6-类的静态代码块
// 静态代码块用于存放部分属性和方法的初始化逻辑,仅在类生成时执行
// 静态代码块通常用于静态结构的初始化
function doSomethingWith(x){
    return {y : x+"y", z : x+"z"}
}
class C {
    static x = 'op';
    static y;
    static z;
    static {
        const obj = doSomethingWith(this.x);
        this.y = obj.y;
        this.z = obj.z;
    }
}


// 7-类的继承
// 7-1 继承和原型对象
// 类通过extends关键字实现继承,类的继承规则如下:
//  ①子类的原型是父类
//  ②子类原型的原型是父类的原型
class Point {}
class ColorPoint extends Point {}
Object.getPrototypeOf(ColorPoint);            // Point
Object.getPrototypeOf(ColorPoint.prototype);  // Point.prototype

// 7-2 构造函数的继承
// 原型链上的实例化过程:先有子类的实例对象(this),再有父类的属性和方法
// 继承类的实例化过程:先有父类的属性和方法,再有子类的实例对象(this)
// 因此子类构造函数的首行必须调用super()访问父类的构造函数,调用父类构造函数后才可以使用this
class Foo {
    constructor() {}
}
class Bar extends Foo {
    constructor() {
        super();
    }
}

// 7-3 私有和静态结构的继承
// 子类不继承父类的私有属性和方法,但可以通过继承的方法获取私有属性的值
// 子类使用软拷贝方式继承父类的静态属性和方法,静态属性和方法的地址和父类相同(值类型除外)
class Foo {
    #p = 1;
    getP() {
        return this.#p;
    }
}
class Bar extends Foo {
    constructor() {
        super();
        console.log(this.getP());  // 1
    }
}


// 8-super关键字
// ①super()作为函数,只能用在子类的构造函数中,用于生成子类的this对象
// ②super作为对象,在子类的实例方法中指向父类的原型对象;在子类的静态方法中指向父类
// 定义在父类构造函数的结构无法通过super调用,直接定义在父类(或者说原型对象)的结构才可以通过super调用
class A {}
A.prototype.x = 2;
class B extends A {
    constructor() {
        super();
        console.log(super.x) // 2
    }
}
