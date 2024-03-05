namespace basic.statement_sp;

public class Program
{
    // 语句
    public void TestStatement()
    {
        // 1-声明语句
        // 1-1 隐式类型局部变量var
        // var声明局部变量可以让编译器从初始化表达式推断出变量的类型
        // var声明变量时必须有初始化语句,通常和构造函数配合使用
        var greeting = "Hello";       // System.String
        var a = 32;                   // System.Int32
        var xl = new List<double>();  // System.Collections.Generic.List`1[System.Double]

        // 隐式类型在构造函数中可以反向操作
        // 构造函数只给出new(),具体的类型采用给定的声明类型
        List<int> xs = new();
        List<int>? ys = new();

        // 1-2 引用类型变量Reference
        // 在变量类型前添加ref关键字可声明引用变量,引用变量是另一个变量的引用
        // 向引用变量赋值时,该值将分配给引用;读取引用变量的值时,将返回引用的值
        // 引用变量的初始化要给定另一个非引用变量,同样使用ref关键字标识
        int abase = 1;
        ref int alias = ref abase;
        abase = 2;  // 同步到引用,abase = alias = 2
        alias = 3;  // 同步到目标,alias = abase = 3

        // 引用变量只能赋实际值而非临时值(如可以赋值int[]的[0]而不能是List的[0])
        // 引用变量可以添加readonly定义为只读引用(无法对其赋值,但可以重定向引用)
        int[] xt = [1, 2, 3];
        ref readonly int element = ref xt[0];   // 引用到xt[0] = 1
        element = ref xt[^1];                   // 重定向引用到xt[2] = 3

        // 引用类型可作为单独的类型用于返回值,只能用同样的ref变量接收
        ref int GetReferenceToMax(int[] numbers)
        {
            ref int max = ref numbers[0];
            for (int i = 1; i < numbers.Length; i++)
            {
                if (numbers[i] > max)
                { max = ref numbers[i]; }
            }
            return ref max;
        }


        // 2-迭代语句(foreach)
        // for循环的每个部分都是可以省略的,如 for( ; ; ){}表示无限循环
        for (int i = 0; i < 3; i++) { Console.WriteLine(i); }

        // foreach循环可以对实现IEnumerable/IEnumerable<T>的类型生效(不限于此)
        //  ①如果foreach语句的源集合为空,foreach语句正文会被跳过
        //  ②如果foreach语句为null,抛出NullReferenceException异常
        // 可以使用var关键字让编译器推断foreach语句中迭代变量的类型
        List<int> fibNumbers = [0, 1, 1, 2, 3, 5, 8, 13];
        foreach (var elem in fibNumbers)
        {
            Console.Write($"{elem} ");
        }

        // 如果迭代器的Current属性返回引用变量ref,可以使用ref/ref readonly声明迭代变量
        Span<int> storage = stackalloc int[10];
        int num = 0;
        foreach (ref int item in storage)
        {
            item = num++;
        }
    }


    // 3-选择语句(switch)
    void DisplayMeasurement(double measurement)
    {
        switch (measurement)
        {
            case < 0.0:
                Console.WriteLine($"Measured value is {measurement}; too low.");
                break;
            // ①可以为多个case指定共用的代码
            case < 10.0:
            case < 15.0:
                Console.WriteLine($"Measured value is {measurement}; too high.");
                break;

            // ②可以为case指定附加条件case guard,同时满足时才会匹配
            case < 50 when measurement < 40:
                Console.WriteLine("Failed measurement.");
                // 还可以使用goto跳转到任意一个case或default(不推荐使用跳转)
                goto default;

            // ③default case指定匹配表达式与其他任何case模式都不匹配时要执行的语句
            default:
                Console.WriteLine($"Measured value is {measurement}.");
                break;
        }
    }
}
