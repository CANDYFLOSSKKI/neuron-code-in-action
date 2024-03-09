namespace basic.lambda_sp;

public class Program
{
    // Lambda表达式
    public void TestLambda()
    {
        // 1-Lambda表达式的基本形式
        // ①(input-parameters) => expression
        // ②(input-parameters) => { <sequence-of-statements> }


        // 2-Lambda表达式的类型限定
        // 2-1 参数类型限定
        // 无法推断输入参数的类型时,可以显式指定输入参数的类型,但参数类型必须全部为显式或隐式
        // 输入参数可以给定初始值,也可以使用弃元代替(需要语言高版本)
        Func<int, string, bool> isTooLong = (int x, string s) => s.Length > x;
        Func<int, int, int> constant = (_ , _) => 42;
        var incrementBy = (int source, int increment = 1) => source + increment;

        // 2-2 返回类型限定
        // 返回类型的限定位置在输入参数前,显式指定类型
        // 实际的返回类型到指定的返回类型必须支持隐式转换
        var choose = object (bool b) => b ? 1 : "two";


        // 3-委托类型转换
        // ①没有返回值的Lambda表达式,可以使用 Action<A1,A2> 委托类型接收
        // ②有返回值的Lambda表达式,可以使用 Func<T,K> 委托类型接收
        Action<int> printNumber = Console.WriteLine;
        Func<int, int> square = x => x * x;
    }


    // 4-外部变量捕获
    // 在Lambda表达式中调用外部变量时,表达式会捕获变量当前的状态信息生成闭包
    // 在Lambda表达式中对外部变量的修改操作,不会反映到外部变量本身
        // 通过委托调用的Lambda表达式:
        internal Action<int>? UpdateCapturedLocalVariable;
        // 每次调用Run(),都会将委托内部的input(右侧比较数)设为参数
        public void Run(int input)
        {
            int j = 0;
            // 每次调用委托,都会将委托内部的j(左侧比较数)设为参数
            // 只会对内部捕获状态的j产生影响,委托外部的j始终为0
            UpdateCapturedLocalVariable = x =>
            {
                j = x;
                bool result = j > input;
                Console.WriteLine($"{j} is greater than {input}: {result}");
            };
        }
}
