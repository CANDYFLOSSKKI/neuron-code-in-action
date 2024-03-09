// 类的变体

// 1-接口实现类
// 类可以使用implements关键字实现接口(type同理),表示当前类满足类型条件的限制
// 接口中的类型声明不能代替实现类的类型声明,仍然需要显式指定
// 接口描述的是类的对外接口,不能定义私有的属性和方法
interface ICountry {
    name:string;
    capital:string;
    get(name:string): boolean;
}
class MyCountry implements ICountry {
    name = '';
    capital = '';
    get(s:string) { return true; }
}

// 类可以实现多个接口,多重实现中不同接口不能有互相冲突的属性
// 尽量避免多重实现,可以通过类继承和接口继承改写
interface Flyable {}
interface Swimmable {}
class SecretCar implements Flyable, Swimmable {}

// 当类和接口重名时,接口中的成员会直接合并到类中
// 合并进类的非空属性在赋值前读取会返回undefined(即使属性类型是非空的)
class AClSame { x:number = 1; }
interface AClSame { y:number; }
console.log(new AClSame().y);  // undefined


// 2-继承类
// 类可以使用extends关键字继承另一个类的非私有属性和方法
// 子类可以覆盖基类的同名非私有方法,但不能与基类的类型定义相冲突
class AClEx {
    greet() { console.log('Hello, world!'); }
}
class BClEx extends AClEx {
    greet(name?: string) {
        if (name === undefined) {
            super.greet();
        } else {
            console.log(`Hello, ${name}`);
        }
    }
}

// 类可以继承非类结构,只要类型是构造函数就可以
interface Greeter { greet(): any; }
interface GreeterConstructor { new (): Greeter; }
// 实现构造函数接口的方法(返回实例对象)
function getGreeterBase():GreeterConstructor {
    return Math.random() >= 0.5 ? AClEx:BClEx;
}
class Test extends getGreeterBase() {
    sayHello() {
        console.log(this.greet());
    }
}


// 3-类的自身类型
// 类作为类型时,只能代表实例对象,不能代表类本身(传入构造函数/typeof替换)
// 类的自身类型就是一个构造函数,需要使用类型时可以单独定义接口表示
interface PointConstructor {
    new(x:number, y:number):PointClS;
}
class PointClS {
    constructor(
        public x:number,
        public y:number,
    ){}
}
function createPoint(
    // Point类型只能代表类的实例对象,不能代表类本身
    ins:Point,
    // 传入typeof <类名>或构造函数表示类本身即可调用new命令实例化
    PointClass1:typeof PointClS,
    PointClass2: new (x:number, y:number) => PointClS,
    x: number,
    y: number
):Point {
    return new PointClass1(x, y);
}


// 4-类的结构类型
// 两个类的实例结构相同,那么这两个类就是兼容的,可以用在对方的使用场合
// 如果类A在类B的结构基础上多出了成员,则A兼容B,A的实例可以代替B,反之不行
class PersonCl {
    name: string|undefined;
    age: number|undefined;
}
class CustomerCl { name: string|undefined; }
// 正确
const cust:CustomerCl = new PersonCl();

// 4-1 对象和类的结构相关
// 如果某个对象跟某个类的实例结构相同,TS也认为两者类型相同
// 因此在TS中instanceof判断会受到结构类型影响,返回true也可能是结构兼容
const objLikeP = { name: 'John', age: 18 }
const pust:PersonCl = objLikeP;

// 4-2 空类的结构类型
// 空类不包含任何成员,任何其他类都可以看作与空类结构相同
// 凡是类型为空类的地方,所有类(包括对象)都可以使用
function fn(x:Empty) {}
fn({});
fn(window);

// 4-3 特殊成员的兼容关系
// 静态的成员和构造方法不在类兼容关系的检查范围内
// 如果类中包含私有成员和保护成员,则必须来自同一个类才兼容(有继承关系)
class AClSp {
    protected name = 'a';
}
class BClSp extends AClSp {
    protected name = 'b';  // 保护成员name有继承关系
    static t: number;             // 静态成员t不在考虑范围内
}
const aclsp:AClSp = new BClSp();


// 5-抽象类
// 类前加关键字abstract可表示该类不能被实例化,只能当作模板,称为抽象类
// 抽象类只能当作基类使用,用来在它的基础上定义子类,子类最多继承一个抽象类
// 抽象类的子类也可以是抽象类,抽象类可以没有抽象成员;非抽象类一定没有抽象成员
abstract class AClAb {
    abstract execute():string;
}
class BClAb extends AClAb {
    execute() { return `BClAb executed`; }
}
