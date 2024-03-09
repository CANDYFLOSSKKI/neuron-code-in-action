namespace basic.struct_sp;

public class Program
{
    // 结构类型

    // 1-声明结构类型
    // 使用struct关键字声明结构类型
    // 结构类型变量内部可以像类一样定义构造函数,属性,访问器和方法
    // 新建结构类型变量也和类一样使用new关键字调用构造函数
    public struct Coords
    {
        public Coords(double x, double y)
        {
            X = x;
            Y = y;
        }
        public double X { get; set; }
        public double Y { get; set; }
        public override string ToString() => $"({X}, {Y})";
    }


    // 2-只读结构
    // 使用readonly关键字可以声明只读结构,只读结构在初始化后不会发生内部状态的改变
    // 只读结构中的成员有如下的限制:
    //  ①只读结构中的属性:不能有set访问器
    //  ②只读结构中的字段:必须显式声明为readonly
    //  ③只读结构中的方法:无法修改结构内部的状态
    public readonly struct Coordss
    {
        public Coordss(double x, double y)
        {
            X = x;
            Y = y;
        }
        public readonly int Field;
        public double X { get; init; }
        public double Y { get; init; }
        public readonly double Sum()
        {
            return X + Y;
        }
    }

    // 非只读结构中的成员也可以单独使用readonly声明为只读
    // 静态属性和方法不能声明为readonly
    // 引用类型的只读成员只能保证内存区域不会发生改变(如集合仍可以正常进行数据的CRUD)


    // 3-结构副本
    // 使用with关键字可以通过对象初始值设定项语法生成结构副本
    // with中可以自由修改结构副本中内部成员的状态,且修改不会改变原来结构的状态
    public static void TestStructWith()
    {
        var p1 = new Coords(0, 0);              //x = 0,y = 0
        var p2 = p1 with { X = 3, Y = 5 };   //x = 3,y = 5
    }
}
