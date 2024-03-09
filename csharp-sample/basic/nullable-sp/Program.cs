namespace basic.nullable_sp;

public class Program
{
    // 可为空类型
    public void TestNullable()
    {
        // 1-声明可为空类型
        // Nullable<T>或T?(常用)都用于表示某个值类型对应的可为空类型
        // 可为空类型与原类型相比,可以表示null值
        double? pi = 3.14;
        char? letter = 'a';
        bool? flag = null;
        int?[] arr = new int?[10];


        // 2-Nullable<T>
        // 可为空类型变量的底层都是Nullable<T>类型
        // Nullable<T>结构包含两个属性HasValue和Value:
        //  ①HasValue:标识变量当前是否为空,仅当HasValue为true时Value值才有效
        //  ②Value:类型是对应的值类型,HasValue为true时存储变量的实际值
        // (由于Value不总是有效,因此在严格要求不为空的条件下会引起警告,可使用x!运算符解决)
        int? nullableInt = 10;
        // 相当于 Nullable<int> nullableInt = new Nullable<int>(10);
        if (nullableInt.HasValue)
        {
            int value = nullableInt.Value;
            Console.WriteLine("Value: " + value);
        }


        // 3-可为空类型转换值类型
        // HasValue属性为true时Value有效,直接返回Value
        // HasValue属性为false时Value无效,需要提供默认值代替Value:
        //  ①使用x??y或x??=y运算符指定默认值
        //  ②调用Nullable<T>.GetValueOrDefault()方法返回初始化值或指定参数
        int? a = null;
        int b = a ?? -1;                  // b = -1
        int c = a.GetValueOrDefault();    // c = 0
        int d =  a.GetValueOrDefault(3);  // d = 3
    }

    public void TestNullable1()
    {
        // 4-可为空类型的布尔运算
        // 布尔值可能为null时的运算规则如下:
        // false && null = false
        // false || null = null
        // true && null = null
        // true || null = true
        // null && null = null
        // null || null = null


        // 5-可为空类型的四则运算
        // 四则运算中的两个操作数只要存在null,运算结果就是null
        int? a = 10;
        int? b = null;
        int? c = 10;
        a++;            // a is 11
        a = a * c;      // a is 110
        a = a + b;      // a is null


        // 6-可为空类型的比较和判等
        // 比较操作的两个操作数中只要存在null,比较结果就为false,与>还是<无关
        // 判等操作遵循如下规则:①null==null;②任何不为null的数!=null
        int? ap = 10;
        Console.WriteLine($"{ap} >= null is {ap >= null}");   // 10 >= null is False
        Console.WriteLine($"{ap} < null is {ap < null}");     // 10 < null is False
        Console.WriteLine($"{ap} == null is {ap == null}");   // 10 == null is False
    }
}
