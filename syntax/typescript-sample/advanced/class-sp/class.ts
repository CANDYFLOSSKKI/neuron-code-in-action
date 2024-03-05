// 类和类的成员

// 1-类的属性声明
// 属性可以在顶层声明,也可以在构造方法内部声明
// 属性的类型可以显式指定,也可以给定初值交由类型推断(否则默认为any)
// 类的顶层属性不赋值时会报错,解决方法有:
//  ①属性的类型改为undefined的联合类型
//  ②设置属性的非空断言x!
class PointCl {
    x!:number;
    y!:number;
}

// 属性前添加readonly可设置只读属性
// 只读属性值不能被实例对象修改,初值可以写在顶层属性,也可以写在构造方法中
class ACl {
    readonly id:string;
    constructor() { this.id = 'bar'; }
}


// 2-类的方法声明
// 类的方法声明方式和函数相同,可以设置参数默认值和可选参数等
class PointCl2 {
    x:number;
    y:number;
    add(point:PointCl2) {
        return new PointCl2(
            this.x + point.x,
            this.y + point.y
        );
    }

    // ①构造方法
    // 构造方法不能声明返回值类型,总是隐式返回实例对象
    constructor(x:number = 0, y:number = 0) {
        this.x = x;
        this.y = y;
    }

    // ②存取器方法
    // 存取器包括取值器getter和存值器setter两种方法
    //  ->属性只有get方法,没有set方法时,自动成为只读属性
    //  ->属性的set方法参数类型必须兼容get方法返回值类型
    //  ->属性的get方法与set方法可访问性必须一致(都为公有/私有)
    _name = '';
    get name() { return this._name; }               // 取值器(读取属性)
    set name(value) { this._name = value; }  // 存值器(写入属性)
}


// 3-类的属性索引声明
// 类的方法同样是一种属性,因此类的属性索引需要使用联合类型包括方法
// 属性的存取器视为属性声明本身,不受上述影响
class MyClass {
    [s:string]: boolean | ((s:string) => boolean);
    f() { return true; }               // 属性索引中声明方法
    get isInstance() { return true; }  // 属性存取器
}


// 4-成员的访问修饰符
// ①public:(默认修饰符)表示公开成员,外部可以自由访问

// ②private:标识私有成员,只能用在当前类内部,类的实例和子类都不能访问
// 子类不能定义和父类私有成员同名的成员
// 通过[]和in仍然可以在外部访问私有成员,真正的私有需要使用#属性(ES2022)
class ACl2 {
    #x = 1;  // 真正的私有成员(外部无法访问)
}

// 构造函数可以设为私有,通常用于实现单例模式
// 需要声明静态实例属性和工厂函数静态方法,用于返回类的单例实例对象
class Singleton {
    private static instance?: Singleton;
    private constructor() {}
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}
const sIns = Singleton.getInstance();

// ③protected:标识保护成员,只能在类内部使用,实例无法使用,子类内部可以使用
// 子类不仅可以获取父类的保护成员,还可以定义同名成员
class AClP { protected x = 1; }
class BClP extends AClP { x = 2;}


// 5-构造函数中的属性声明
// 如果属性声明后需要在构造函数中初始化,可以直接在构造函数中声明
// 构造函数中的属性访问修饰符不能省略
class AClC {
    // 注意是在构造函数的()中声明,而非{}中,函数体是空的
    // 编译为JS后相当于constructor(a, b, c, d){...}
    constructor(
        public readonly a: number,
        protected b: number,
        private c: number,
        readonly d: number
    ) {}
}


// 6-类的静态成员
// 类的静态成员使用static关键字定义
// 静态成员只能通过类本身使用,不能通过实例对象使用
// 静态成员可以添加访问修饰符,只有public和protected的静态成员才会被继承
class AClS {
    public static x = 1;
    protected static y = 1;
}


// 7-this关键字
// ①类外部使用this
// 函数内部可以使用this表示各种类型的对象(编译结果不会带有该参数)
// this参数可以放在函数参数列表的首位,描述内部this关键字的类型
function fooForThis(
    this: { name: string },
    name:string
) {
    this.name = name;
}

// ②类内部使用this
// 类的方法经常用到this关键字,表示该方法当前所在的实例对象
// this类型不允许应用于静态成员
class BoxWithThis {
    contents:string = '';
    set(value:string):this {
        this.contents = value;
        return this;
    }
}
