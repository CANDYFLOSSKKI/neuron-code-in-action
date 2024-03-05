namespace advanced.exception_sp;

public class Program
{
    // 异常处理

    // 1-异常传播机制
    // 异常抛出时:
    // ①当前结构中存在异常类型匹配的catch语句块:进入该catch块的异常处理程序
    // ②当前结构中没有匹配的catch块:向调用堆栈的上层传播
    public static void A()
    {
        B();                    // 接收异常,无匹配catch块,传递给调用者
    }
    public static void B()
    {
        C();                    // 接收异常,无匹配catch块,传递给A()
    }
    public static void C()
    {
        throw new Exception(); // 抛出异常,无匹配catch块,传递给B()
    }


    // 2-异常抛出
    // 使用throw关键字可以显式抛出异常
    // 通常通过new调用实例构造器,抛出异常类的匿名对象
    class CustomException : Exception
    {
        public CustomException(string message){}
    }
    private static void TestThrow()
    {
        throw new CustomException("Custom exception in TestThrow()");
    }


    // 3-异常处理结构
    // try{ }
    // catch (Exception e){ }
    // finally{ }
    // ①try语句块:标识可能抛出异常的代码块,try块内抛出的异常才会异常处理,try块外抛出的异常直接堆栈传递
    // ②catch语句块:标识支持处理的异常类型参数,用于匹配捕获try块中抛出的异常对象,并调用异常处理程序处理
    // ③finally语句块:无论是否抛出异常或异常是否被处理,总会在异常处理流程的最后执行

    // 3-1 Catch语句块
    // try块抛出异常时,根据catch块定义的先后顺序依次匹配
    // 异常匹配支持协变参数,派生类异常会被处理基类的catch块捕获,因此通常将派生程度大的放在前面匹配
    // catch语句块中可以再次抛出异常,再次抛出的异常从该catch块开始向下继续匹配

    // catch语句块的括号()后可以用when关键字指定筛选条件的表达式
    // 存在when筛选时,只有异常类型匹配和筛选条件都通过才会进入该catch块的异常处理程序
    int GetInt(int[] array, int index)
    {
        try
        {
            return array[index];
        }
        catch (IndexOutOfRangeException e) when (index < 0)
        {
            throw new ArgumentOutOfRangeException(
                "Parameter index cannot be negative.", e);
        }
        catch (IndexOutOfRangeException e)
        {
            throw new ArgumentOutOfRangeException(
                "Parameter index cannot be greater than the array size.", e);
        }
    }

    // 3-2 Finally语句块
    // finally语句块通常用于资源的关闭和收尾工作(文件,图形句柄和数据库连接等)
    // finally语句块中执行关闭操作之前,会检查目标是否正确在try语句块中打开,处于打开状态时才会被关闭
    void TestFinally()
    {
        FileStream? file = null;
        FileInfo fileinfo = new System.IO.FileInfo("./file.txt");
        try
        {
            file = fileinfo.OpenWrite();
            file.WriteByte(0xF);
        }
        finally
        {
            file?.Close();
        }
    }


    // 4-局部资源管理
    // 局部范围管理资源的语句块使用using标识
    // 局部资源管理可以实现在using块的括号()处打开资源,退出using块时隐式释放资源
    // 单个using块仅支持单行语句的资源操作,涉及到多个资源可以嵌套使用using块

    // using语句块的括号()处只能处理实现了IDisposable接口的资源对象
    public void TestUsing()
    {
        using (var resource = new System.IO.FileInfo("./file.txt").OpenWrite())
        {
        }    // 隐式执行resource.Dispose();
    }


    // 5-自定义异常类
    // 自定义异常类必须直接或间接继承Exception类,类名使用Exception后缀
    // 自定义异常类至少包含如下三个构造函数(都引用基类的同参数构造函数):
    //  ①空构造函数
    //  ②设置消息属性message的构造函数
    //  ③设置消息属性message和内部异常实例inner的构造函数
    [Serializable]
    public class InvalidDepartmentException : Exception
    {
        public InvalidDepartmentException() : base() { }
        public InvalidDepartmentException(string message) : base(message) { }
        public InvalidDepartmentException(string message, Exception inner) : base(message, inner) { }
    }

    // 自定义异常类也可以添加自定义的属性
    // 添加属性后要重写自定义异常类的ToString()方法


    // 6-常用派生异常类
    // ArrayTypeMismatchException   存值时元素类型和数组类型不兼容
    // DivideByZeroException        整数除以零
    // IndexOutOfRangeException     索引<0或超出数组边界
    // InvalidCastException         基类显式转换为接口/派生类型失败
    // NullReferenceException       引用值为null的对象
    // OutOfMemoryException         使用新运算符分配内存失败
    // OverflowException            算术运算溢出
    // StackOverflowException       堆栈挂起方法过多而用尽
    // TypeInitializationException  静态构造函数异常
}
