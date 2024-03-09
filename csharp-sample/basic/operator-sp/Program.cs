namespace basic.operator_sp;

public class Program
{
    // 运算符
    public void TestOperator()
    {
        // 1-类型转换
        // 1-1 条件类型转换 as
        // <表达式> as T可实现表达式的条件显式转换
        // as的目标类型不要求可以被实例化,必须是引用类型或nullable类型,转换失败时返回null
        IEnumerable<int> numbers = new[] { 10, 20, 30 };
        IList<int> indexAble = numbers as IList<int>;

        // 1-2 强制类型转换 (T)
        // (T)<表达式>可实现表达式的强制显式转换
        // ①如果两个类型之间不存在转换关系,则发生编译时错误
        // ②如果两个类型之间存在转换关系但表达式的值不支持转换,则抛出异常InvalidCastException
        IEnumerable<int> numberss = new int[] { 10, 20, 30 };
        IList<int> list = (IList<int>)numberss;
    }

    public void TestOperator1()
    {
        // 2-三元条件 x?y:z
        // ①如果条件表达式对象类型确定,则两个表达式选项的类型必须支持隐式转换
        // ②如果条件表达式对象类型为var,则两个表达式选项的类型必须相同或支持至少单向的隐式转换
        string GetWeatherDisplay(double tempInCelsius) => tempInCelsius < 20.0 ? "Cold" : "Perfect";
        Console.WriteLine(GetWeatherDisplay(15));  // Cold
        Console.WriteLine(GetWeatherDisplay(27));  // Perfect


        // 3-null包容 x!
        // x!和x的值完全相同,区别在于x!可消除编译器对x可能为null的警告
        bool IsValid(Person? person)
            => person is not null && person.Name is not null;
        Person? p = new Person();
        if (IsValid(p))
        {
            // 即使提前在if中调用方法判断了p不为空,编译器警告仍然会存在
            Console.WriteLine($"Found {p!.Name}");
            // p!.Name -> 通过
            // p.Name  -> Warning CS8602: Dereference of a possibly null reference
        }


        // 4-null访问 x?. x?[]
        // x为null时,使用x?.和x?[]访问成员会返回null
        // x?.和x?[]是短路运算,多个?.和?[]组合路径上只要有一个返回null就直接返回null
        // x?.和x?[]不会避免因错误操作(如数组越界)导致的异常
        double SumNumbers(List<double[]> setsOfNumbers, int indexOfSetToSum)
        {
            // 调用路径上只要有一个返回null,就直接置为null,然后返回默认值NaN
            return setsOfNumbers?[indexOfSetToSum]?.Sum() ?? double.NaN;
        }
        var numberSets = new List<double[]>
        {
            new[] { 1.0, 2.0, 3.0 },
            null
        };
        var sum1 = SumNumbers(null, 0);  // NaN
        var sum2 = SumNumbers(numberSets, 0);          // 6
        var sum3 = SumNumbers(numberSets, 1);          // NaN


        // 5-null合并 x??y x??=y
        // 当x为null时,使用x??y和x??=y表达式会返回y值
        // ①x??y在x==null时直接返回y,x不会发生变化
        // ②x??=y在x==null时先将y赋值给x,再返回x,x会发生变化
        string name = null;
        string defaultName = "John";
        string result = name ?? defaultName;  // result = John, name = null
        name ??= defaultName;                 // name = null
    }
}

public class Person
{
    public string? Name { get; set; }
}
