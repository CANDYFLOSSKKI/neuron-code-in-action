// 枚举

// 1-枚举类型的声明
// 枚举类型使用enum关键字声明,成员的值默认是0~N
// 枚举类型的使用场景和Symbol相似,都是成员值不重要而成员名重要
enum ColorEnum {
    Red,     // 0
    Green,   // 1
    Blue     // 2
}

// 定义枚举相当于定义了同名的对象
// 实际上枚举类型可以被as const常量对象代替(这样声明需要显式指定值)
const BarEnum = {
    A: 0,
    B: 1,
    C: 2,
} as const;


// 2-枚举成员的访问
// 访问枚举成员可以用点运算符.也可以用键值索引[]
// 获取到的枚举成员的类型可以是枚举类本身(推荐),也可以是number
let color1:ColorEnum = ColorEnum.Green;  // 点运算符访问
let color2:number = ColorEnum['Green'];  // 键值索引访问

// 由于枚举成员名比成员值更重要,通常以枚举名进行条件判断
enum Operator {
    ADD,
    DIV,
    MUL,
    SUB
}
function compute(op:Operator, a:number, b:number) {
    switch (op) {
        case Operator.ADD:return a + b;
        case Operator.DIV:return a / b;
        case Operator.MUL:return a * b;
        case Operator.SUB:return a - b;
    }
}

// 将成员值放入键值索引中,可以获取成员名,称为反向映射(仅限数值类型的枚举)
console.log(Operator[0])  // ADD


// 3-枚举成员的显式赋值
// 枚举成员的值可以是任意数值(bigint除外),不同成员值可以相同
// 枚举成员没有显式赋值时,会从首个显式赋值的值开始依次+1(不会像iota继承表达式)
enum ColorEnumWithValue {
    Red = 90,
    Green = 0.5,
    Blue = 95<<1,   // 表达式显式赋值190
    Purple,  // Blue + 1 = 191
}

// 在枚举类型外无法修改成员的值
// 可以标记枚举变量为const类型,此时会提高性能表现,不会生成对象(变量直接替换为常量)
const enum ColorWithConst {
    Red,
    Green,
    Blue
}
const xec = ColorWithConst.Red;
const yec = ColorWithConst.Green;
const zec = ColorWithConst.Blue;
// 编译后 =>
const xec2 = 0;  // Red
const yec2 = 1;  // Green
const zec2 = 2;  // Blue


// 4-枚举声明的合并
// 多个同名的枚举类型声明可以进行合并,可用于补充外部定义的枚举变量
// 枚举类型合并的规则如下:
//  ①多个声明中不能有同名成员
//  ②多个声明中只有其中一个的首成员可以省略初始值
//  ③多个声明只能同为const或同不为const
const enum PartEnum {
    A,
}
const enum PartEnum {
    B = 1,
}


// 5-字符串成员的枚举
// 枚举成员全为字符串类型时,成员值必须显式设置,否则默认为数值,且排在字符串成员之前
// 枚举中的各个成员可以是字符串(不能是表达式)和数值的混合赋值
enum Direction {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT',
}

// 和字符串类型枚举等价的是联合类型
function move(where:'Up'|'Down'|'Left'|'Right') {}

// 当变量为字符串枚举类型时,就只能赋值为该枚举中的成员,而不能是其他字符串
let sd = Direction.Right;
sd = Direction.Left;  // 如果是sd = 'LEFT'则会报错


// 6-枚举类型提取
enum MyEnum {A = 'a', B = 'b'}
// ①使用keyof运算符可以取出枚举中所有成员名,作为联合类型返回
type FooEnum1 = keyof typeof MyEnum;          // 'A'|'B'

// ②使用in运算符可以取出枚举中所有成员值,作为对象类型返回
type FooEnum2 = { [key in MyEnum]: string };  // { a: string, a: string }
