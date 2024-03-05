namespace basic.pattern_sp;

public class Program
{
    // 模式匹配
    public string x = "Hello";
    public void TestPattern()
    {
        // 1-模式匹配的形式
        // ①is型模式匹配
        // ②switch型模式匹配

        // 1-1 声明模式     用于检查表达式的运行时类型          模式为类型
        // 1-2 类型模式     用于检查表达式的运行时类型          模式为类型
        // 1-3 常量模式     用于检查表达式是否等于指定常量      模式为常量
        // 1-4 关系模式     用于检查表达式与指定常量的比较      模式为比较运算符+常量
        // 1-5 属性模式     用于检查表达式的属性/字段          模式为部分指定属性
        // 1-6 位置模式     用于检查解构元组表达式             模式为元组
        // 1-7 列表模式     用于检查数组/列表是否匹配给定序列   模式为[]序列
        // 1-8 切片模式     用于检查数组/集合中的子集          模式为给定范围

        // 弃元模式     匹配任何表达式,用于模式匹配的默认选项
        // 逻辑模式     匹配其它模式的逻辑组合(属性/位置/列表模式也可以实现模式的嵌套)
        // var模式     匹配任何表达式,用于生成局部变量保存中间结果

        // 2-声明模式/类型模式
        // 声明模式/类型模式用于检查表达式的运行时类型,模式为类型
        // 声明模式匹配成功后为参数表达式赋值;类型模式匹配成功后执行特定操作
        // 运行时类型匹配成功的情况有:
        //  ①运行时类型恰好为T
        //  ②运行时类型派生于基类T/实现接口T
        //  ③运行时类型支持到T的隐式转换/装箱转换
        //  ④运行时类型是nullable类型T?且值不为null
        static int GetSourceLabel<T>(IEnumerable<T> source) => source switch
        {
            Array array => 1,
            ICollection<T> collection => 2,
            _ => 3,
        };
        var numbers = new int[] { 10, 20, 30 };               // 1
        var letters = new List<char> { 'a', 'b', 'c', 'd' };  // 2


        // 3-常量模式/关系模式
        // 常量模式/关系模式用于检查表达式和指定常量之间的比较,模式为常量/比较运算符+常量
        // 可用的匹配值包括数值文本、字符串、布尔值、枚举值和null
        // (null值通常用于判空操作,如设置is null或in not null的匹配条件)
        static string GetResult(int number) => number switch
        {
            < 0 => "Number is negative.",
            > 0 => "Number is positive.",
            0 => "Number is zero."
        };

        // if (input is null) {}
        // if (input is not null) {}


        // 4-属性模式
        // 属性模式用于检查表达式的属性/字段,模式为部分指定属性
        // 属性模式的匹配条件不需要包含所有属性/字段,只有条件中包含的属性/字段才会参与匹配操作
        // 表达部分属性/字段组成的集合使用大括号{}
        static bool IsConferenceDay(DateTime date) =>
            date is
            {
                Year: 2020,
                Month: 5,
                Day: 19 or 20 or 21
            };


        // 5-位置模式
        // 位置模式用于检查解构元组表达式,模式为元组
        // 模式匹配的条件相当于进行解构操作
        static string Classify(Point point) => point switch
        {
            (0, 0) => "Origin",
            (1, 0) => "positive X basis end",
            (0, 1) => "positive Y basis end",
            _ => "Just a point",
        };


        // 6-列表模式
        // 列表模式用于检查数组/列表是否匹配给定序列,模式为[]序列
        // 列表模式中的单个元素匹配可以是常量模式,也可以是关系模式
        // 可以用..表示任意多个元素的匹配条件(不关心后续元素的个数和值)
        bool flag = false;
        int[] nbs = { 1, 2, 3 };
        flag = nbs is [1, 2, 3];             // True
        flag = nbs is [1, 2, 4];             // False
        flag = nbs is [1, 2, 3, 4];          // False
        flag = nbs is [0 or 1, <= 2, >= 3];  // True

        flag = new[] { 1, 2, 3, 4, 5 } is [> 0, > 0, ..];   // True
        flag = new[] { 1, 1 } is [_, _, ..];                // True
        flag = new[] { 0, 1, 2, 3, 4 } is [> 0, > 0, ..];   // False
        flag = new[] { 1 } is [1, 2, ..];                   // False
    }

    public void TestPattern1()
    {
        // 7-var模式
        // var模式可以匹配任何表达式,用于生成局部变量保存中间结果
        // var声明的局部变量接受包括null在内的任何表达式结果(通常不和其他模式混合使用)
        // var模式可在局部变量的声明后添加when条件,对保存的中间结果进行检查
        static Point Transform(Point point) => point switch
        {
            var (x, y) when x < y => new Point(-x, y),
            var (x, y) when x > y => new Point(x, -y),
            var (x, y) => new Point(x, y),
        };


        // 8-逻辑模式
        // 逻辑模式可匹配其它模式的逻辑组合
        // 模式组合器包括和and/或or/非not,组合的优先级: not>and>or
        static string Classify(double measurement) => measurement switch
        {
            < -40.0 => "Too low",
            >= -40.0 and < 0 => "Low",
            >= 0 and < 10.0 => "Acceptable",
            >= 10.0 and < 20.0 => "High",
            >= 20.0 => "Too high",
            _ => "Unknown",
        };
        Console.WriteLine(Classify(13));    // High
        Console.WriteLine(Classify(-100));  // Too low
        Console.WriteLine(Classify(5.7));   // Acceptable
    }

    public readonly struct Point
    {
        public int X { get; }
        public int Y { get; }
        public Point(int x, int y) => (X, Y) = (x, y);
        public void Deconstruct(out int x, out int y) => (x, y) = (X, Y);
    }
}
