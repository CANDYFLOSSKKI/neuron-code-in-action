namespace basic.tuple_sp;

public class Program
{
    // 元组类型
    public void TestTuple()
    {
        // 1-声明元组类型
        // 元组类型的多个变量通过括号()组织
        // 表示整个元组和元组内的元素都可以使用独立的变量名
        // ①前置显式声明
        (double Sum, int Count) tp = (4.5, 3);

        // ②后置显式声明
        var tp1 = (Sum: 4.5, Count: 3);

        // ③外部变量投影
        var sum = 4.5;
        var count = 3;
        var tp2 = (sum, count);

        // 2-访问元组类型
        // 访问元组元素的方式和访问类/结构的成员相同(点运算符.)
        // 元组元素的默认名为Item1,Item2,Item3...,可以使用上述三种方式指定元素别名
        // (元组元素的别名仅在编译期有效,在应用程序运行时不可用)
        Console.WriteLine(tp.Sum);
        Console.WriteLine(tp.Count);
    }

    public void TestTuple1()
    {
        // 3-元组间互相赋值的前提
        // ①两个元组元素数量相同
        // ②在每个元组元素的位置上,左右两侧元组元素的类型都相同或支持隐式转换
        (int, double) t1 = (17, 3.14);
        (double First, double Second) t2 = (0.0, 1.0);
        t2 = t1;    // t2 = (17, 3.14)


        // 4-元组间互相比较的前提
        // ①两个元组元素数量相同
        // ②在每个元组元素的位置上,左右两侧元组元素都支持使用==和!=判等
        // 元组间的比较是串联式操作,只要有一组对应位置的元组元素不相等,元组就不相等
        (int a, byte b) left = (5, 10);
        (long a, int b) right = (5, 10);
        var flag = left == right;   // True


        // 5-析构元组
        // 析构元组指的是将元组中的多个元素值赋给多个类型相符的变量
        // 使用括号()包含的多个变量接收元组类型的值即可实现析构
        var t = ("post office", 3.6);
        // ①推断类型的析构
        var (destination, distance) = t;

        // ②指定类型的析构
        (string destination1, double distance1) = t;
    }

    public void TestTuple2()
    {
        // 6-弃元
        // 弃元是元组的占位符,用下划线 _ 表示,占据一个元组元素的位置,出现在赋值左侧
        // 弃元可用于代替显式声明的变量,标识该变量永远不会使用
        var citys = (2024, 3, "Beijing");
        var (_, _, area) = citys;

        // 6-1 弃元处理析构元组和解构方法
        // 弃元通常在析构和解构中代替不使用的元素
        // ①析构元组中使用弃元
        (string, int, int, int, int, int) CityYears(string name, int year1, int year2)
        {
            return (name, year1, year2, Math.Max(year1, year2), Math.Min(year1, year2), Math.Abs(year1 - year2));
        }
        var (_, _, _, pop1, _, pop2) = CityYears("New York City", 1960, 2010);

        // ②对象解构中使用弃元
        var p = new Person("John", "Quincy", "Adams", "Boston");
        var (fName, _, city, _) = p;

        // 6-2 弃元处理模式匹配
        // 在switch模式中加入弃元的选项,包括null在内的任何表达式都会成功匹配
        // 通常将弃元放在模式匹配的末尾,作例外情况的默认处理
        static void ProvidesFormatInfo(object? obj) =>
            Console.WriteLine(obj switch
            {
                IFormatProvider fmt => $"{fmt.GetType()} object",
                null => "Its use could result in a NullReferenceException",
                _ => "Some object type without format information"
            });

        // 6-3 弃元处理方法参数
        // 不关心某个参数的值时,可以在方法签名和方法调用中使用弃元代替参数
        // 如果调用方法的目的不是获取out参数时,可以使用弃元代替out实参
        var dateStrings = new List<String>();
        foreach (string dateString in dateStrings)
        {
            if (DateTime.TryParse(dateString, out _))
                Console.WriteLine($"'{dateString}': valid");
            else
                Console.WriteLine($"'{dateString}': invalid");
        }
    }
}

public class Person
{
    private string n1, n2, n3, n4;
    public Person(string n1, string n2, string n3, string n4)
    {
        this.n1 = n1;
        this.n2 = n2;
        this.n3 = n3;
        this.n4 = n4;
    }
    public void Deconstruct(out string on1, out string on2, out string on3, out string on4)
    {
        on1 = this.n1;
        on2 = this.n2;
        on3 = this.n3;
        on4 = this.n4;
    }
}
