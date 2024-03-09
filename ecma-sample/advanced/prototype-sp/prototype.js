// 原型对象和原型链

// 1-原型对象和原型链
// 原型对象是ES5实现继承机制的常用方式
// 原型对象可以和任意数量的实例对象构成原型继承关系,原型对象的属性和方法被实例对象共享(修改也共享)

// 原型对象也可以设置自己的原型，多层次的原型关系构成了原型链
// 实例对象的默认原型是Object.prototype(最顶层的原型对象,他的原型是null)
// 访问实例对象中不存在的属性时,会自动沿着对象的原型链逐级向上查找
function Animal(name) {
    this.name = name;
}
Animal.prototype.color = 'white';
var cat1 = new Animal('大毛');
var cat2 = new Animal('二毛');
cat1.color      // 'white'
cat2.color      // 'white'


// 2-原型对象的设置
// 2-1 实例对象的原型继承
// Object.setPrototypeOf()可以设置两个实例对象的原型继承关系
// 实例对象的原型继承适合于有限数量实例对象间的属性共享,不会通过构造函数扩散到其他实例对象中
function Person() {}
function Boy() {}
var person = new Person();
var boy = new Boy();
Object.setPrototypeOf(boy, person);  // 设置person是boy的原型对象
Object.getPrototypeOf(boy);          // person

// 2-2 构造函数的原型继承
// 构造函数的原型对象该构造函数创建的所有实例对象都构成原型继承关系,步骤如下:
// ①设置构造函数的prototype属性,指定构造函数的原型对象
// ②设置实例对象的constructor属性,将实例对象和他的构造函数解耦
// (由于原型对象共享属性,继承链下的实例对象也可以通过constructor属性访问到该构造函数)
function P() {}
var p = new P();
var per = new Person();
P.prototype = per;
per.constructor = P;  // 此时per和p的constructor属性都是构造函数P

// 构造函数也可以不绑定外部对象作为原型对象(因为外部对象原来的构造函数是冗余的)
// 直接设置构造函数prototype属性的属性,后台会自动创建原型对象
P.prototype.constructor = P
P.prototype.name = "Person"


// 3-原型对象的访问
// ①Object.getPrototypeOf()
var per = new Person()
Object.getPrototypeOf(per)

// ②间接通过构造函数访问(需要提前设置构造函数的原型对象)
var per = new Person()
per.constructor.prototype

// ③实例对象方法内使用super关键字(相当于Object.getPrototype(this))
const obj = {
    foo: 'world',
    find() {
        return super.foo;
    }
};


// 4-原型链上的类型判断
// 原型链上使用instance判断实例对象的类型(构造函数),instance左侧连接实例对象,右侧连接构造函数
// instance包括间接的原型继承关系,只要构造函数在对象的原型链上层,instance就会返回true
var v = new Vehicle();
v instanceof Vehicle  // true
// 等同于 =>
Vehicle.prototype.isPrototypeOf(v)


// 5-构造函数的继承关系
// 构造函数继承后,子类构造函数创建的实例对象包含父类构造函数中的属性和方法
// 子类的实例对象通过instance对子类和父类构造函数均返回true(不依赖于对象间的原型关系)
// 步骤如下:
//  ①借用构造函数:在子类构造函数中使用call()调用父类构造函数
//  ②实例对象原型链继承:设置子类构造函数的原型对象为父类构造函数创建的实例对象
//  ③构造函数原型链继承:设置该原型对象的构造函数指向子类构造函数
function Parent() {this.name = "Parent";}
function Child() {
    // ①子类构造函数通过call()借用父类构造函数
    Parent.call(this);
    this.name = "Child";
}
// ②实例对象的原型链继承
// Object.create()设置子类原型对象为父类原型对象的拷贝,可以避免子类原型对象继承父类构造函数的方法
// 不能直接将父类原型对象赋给子类原型对象,否则两者将指向同一地址,第③步无法达到效果
Child.prototype = new Parent();
Child.prototype = Object.create(Parent.prototype);

// ③构造函数的原型链继承
Child.prototype.constructor = Child;
