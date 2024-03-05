namespace advanced.function_sp;

public class Program
{
    // 方法和方法参数

    // 1-虚方法和重写方法
    // 多态分为编译时类型和运行时类型,C#通过虚方法和重写方法实现方法调用的动态绑定:
    // ①编译时类型:声明的类型
    // ②运行时类型:实际引用的类型(派生程度不小于编译时类型)

    // 基类(父类):使用virtual关键字标识虚方法
    // 派生类(子类):使用override关键字标识重写方法
    // 动态绑定涉及多个派生层次时,只有最上方的类才标识虚方法,其他类均标识重写方法
    public class AClass
    {
        public virtual void Print() => Console.WriteLine("A");   // 虚方法
    }
    public class BClass : AClass
    {
        public override void Print() => Console.WriteLine("B");  // 重写方法
    }
    public void TestOverrideFunc()
    {
        BClass b = new BClass();
        b.Print();    // B(编译时类型也是BClass)
        AClass a = b;
        a.Print();    // B(动态绑定到运行时类型BClass)
    }


    // 2-隐藏方法
    // 隐藏方法使用new关键字,标识派生类的同名方法独立于基类
    // 隐藏方法根据编译时类型决定调用的方法(不支持运行时类型动态绑定)
    // 隐藏方法和虚方法/重写方法互斥,不允许基类标记同名方法为虚方法
    public class AClassPb
    {
        public void Print() => Console.WriteLine("A");
    }
    public class BClassPb : AClassPb
    {
        public new void Print() => Console.WriteLine("B");
    }
    public void TestNewFunc()
    {
        BClassPb b = new BClassPb();
        b.Print();    // B(编译时类型也是BClassPb)
        AClassPb a = b;
        a.Print();    // A(隐藏方法不支持动态绑定,使用编译时类型AClassPb)
    }


    // 3-解构方法
    // 解构方法可用于提取类中的多项属性值,方法名固定为Deconstruct
    // 解构方法要求:①无返回值;②含若干out参数接收返回值;③实例方法
    public class Person
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public Person(string firstName, string lastName)
        {
            FirstName = firstName;
            LastName = lastName;
        }
        // 解构方法(可以同时设置多个解构方法对应不同个数的返回值)
        public void Deconstruct(out string firstName, out string lastName)
        {
            firstName = FirstName;
            lastName = LastName;
        }
        public void Deconstruct(out string name)
        {
            name = String.Concat(FirstName, LastName);
        }
    }

    // 解构方法的调用方式和赋值类似,使用含多个变量的元组作为out参数接收属性值
    public void TestDeconstruct()
    {
        Person person = new Person("Micky","Mouse");
        var (first, _) = person;
    }


    // 4-方法的可选参数
    // 可以为方法的最后一个参数指定默认值标识为可选参数
    // 调用方法时,可以只传入n-1个输入参数以使用默认值,也可以传入n个输入参数覆盖默认值
    public static void AddNumbers(int a, int b, int c = 0)
    {
        Console.WriteLine(a + b + c);
    }


    // 5-方法的参数关键字
    // 5-1 可变参数params
    // params关键字标识参数数量不固定,只能用于最后一个参数
    // params标识的形参类型必须是数组;实参可以是逗号分隔列表,数组或为空
    public static void UseParams(params int[] list)
    {
        for (int i = 0; i < list.Length; i++)
        {
            Console.Write(list[i] + " ");
        }
    }
    // UseParams(1, 2, 3, 4);          ①列表实参
    // UseParams({ 5, 6, 7, 8, 9 });   ②数组实参
    // UseParams();                    ③空实参

    // 5-2 引用参数ref
    // ref关键字标识按引用传递参数,方法内部可以修改参数的外部状态,参数传入方法前必须初始化
    // ①ref参数是值类型时,直接将参数本体传入方法中,方法内部可以修改参数值
    // ②ref参数是引用类型时,方法内部可以对参数重定向引用
    public void Method(ref int refArgument)
    {
        refArgument = refArgument + 44;
    }

    // 5-3 引用输入in
    // in关键字标识按引用传递参数,方法内部对参数只读,参数传入方法前必须初始化
    // ①in参数是值类型时,直接将参数本体传入方法中,避免复制带来的性能开销
    // ②in参数是引用类型时,方法内部不能对参数重定向引用,可以修改参数的内部状态(集合)
    public void SampleMethod(in int i)
    {
        Console.WriteLine(i);
    }

    // 5-4 引用输出out
    // out关键字标识按引用传递参数,方法内部可以初始化和修改参数
    // out参数传入方法前无需初始化,赋值完全交由方法内部进行
    void OutArgExample(out int number)
    {
        number = 44;
    }

    // 5-5 参数关键字的重载关系
    // ①原生方法:    public void Sample<T>(T i){}
    // ②in参数方法:  public void Sample<T>(in T i){}
    // ③ref参数方法: public void Sample<T>(ref T i){}
    // ④out参数方法: public void Sample<T>(out T i){}

    // ①和②,①和③,①和④之间构成重载关系,因为原生方法属于值传递,标识后的方法属于引用传递
    // ②,③,④之间互相不构成重载关系

}
