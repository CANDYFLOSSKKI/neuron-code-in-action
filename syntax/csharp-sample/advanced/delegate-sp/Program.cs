namespace advanced.delegate_sp;

public class Program
{
    // 委托和事件

    // 1-委托的声明和实例化
    // 委托是独立于类的结构,委托的声明位置和类并列
    // 委托的声明需要指定接收方法的返回值和参数列表,委托只能接收返回值和参数列表都相同的方法
    public delegate int PerformCalculation(int x, int y);

    // 委托实例化时可以接收实例方法、静态方法、匿名方法
    // 接收实例方法时,委托同时引用方法和方法所属的实例对象
    // 接收静态方法时,委托只引用方法本身
    public int Square(int width, int height)
    {
        return width * height;
    }
    public void Perform(int x, int y, PerformCalculation cal)
    {
        Console.WriteLine(cal(x, y));
    }


    // 2-泛型委托
    // 泛型委托使用泛型参数表示委托指定的参数列表和返回值
    // 泛型委托即使给定相同的强类型(即泛型代表的参数列表和返回值均相同),也不能互相转换
    // 2-1 无返回值的泛型委托Action<T>
    // Action委托存放无返回值的方法，泛型参数为方法的参数列表
    Action<int> action1;          // 接受一个int参数
    Action<string, int> action2;  // 接受一个string参数和一个int参数

    // 2-2 有返回值的泛型委托Func<T,TResult>
    // Func委托存放有返回值的方法,泛型参数为方法的参数列表+返回值(最后的泛型参数为返回值)
    Func<int> func1;          // 不带参数,返回int类型
    Func<int, string> func2;  // 接受一个int参数,返回string类型

    // 2-3 布尔型返回值的泛型委托Predicate<T>
    // Predicate委托存放返回值为布尔型的单参数方法,泛型参数为方法的参数
    Predicate<int> predicate;  // 接受int类型参数,返回一个布尔值


    // 3-多播委托
    // 多播委托指委托对象可以同时存放多个返回值和参数列表相同的方法组成方法列表
    // 调用多播委托时,按照方法添加的先后顺序依次执行,返回值为最后添加方法的返回值

    // 委托的方法列表为空时,向方法列表添加首个方法必须使用=赋值运算符
    // 委托的方法列表不为空时,可使用重载的+、-、+=、-=加减运算符操作方法列表
    public delegate void CustomCallback(string s);
    public void Hello(string s){}
    public void Goodbye(string s){}
    public void TestMultiDelegate()
    {
        CustomCallback customCallback;
        customCallback = Hello;
        customCallback += Goodbye;
    }


    // 4-标准事件模式
    // 事件是观察者模式的实现
    // 标准事件模式中,事件存放多个订阅者,用于响应事件的事件处理程序
    // 提供者内部引发事件时,事件通过多播委托依次调用各个事件处理程序,实现向订阅者的广播发送

    // 4-1 事件处理程序的实现
    // 事件处理程序的标准签名如下:①sender为发件人;②EventArgs是事件中委托参数的通用基类
    // 通常定义EventArgs的派生类传递自定义参数
    public void EventRaised(object sender, EventArgs args){}
    public class FileArgs : EventArgs
    {
        public int Sign {get; set;}
    }

    // 4-2 事件订阅的实现
    // 事件声明的标准签名如下,泛型参数为事件委托程序事先约定的EventArgs派生类
    public event EventHandler<FileArgs>? FileEvent;
    // 通常事件是类中的实例成员,订阅事件时先实例化外部的类对象,再向事件添加事件处理程序
    public class FileSearcher  // 提供者对象(4-3中提供补全后的逻辑)
    {
        public event EventHandler<FileArgs>? FileFound;
    }
    public void TestFileSearcher()
    {
        var fileLister = new FileSearcher();
        int filesFound = 0;
        // 向事件添加事件处理程序(实例方法/静态方法/匿名方法均支持)
        fileLister.FileFound += (sender, eventArgs) =>
        {
            Console.WriteLine(eventArgs);
            filesFound++;
        };
    }

    // 4-3 引发事件
    // 事件只能在提供者对象内部引发
    // 提供者通过?.Invoke()调用所有的事件处理程序,发件人参数为提供者的this
    // 引发事件的方法称为Raise方法,通常将其作为实例方法独立声明,在业务逻辑中调用
    public class FileSearcherA  // 提供者对象
    {
        public event EventHandler<FileArgs>? FileFound;
        // 引发事件的方法(向所有事件处理程序传递相同实参)
        private void RaiseFileFound(string file) =>
            FileFound?.Invoke(this, new FileArgs());
        // 业务逻辑(调用引发事件的方法)
        public void Search(string directory, string searchPattern)
        {
            foreach (var file in Directory.EnumerateFiles(directory, searchPattern))
            {
                RaiseFileFound(file);
            }
        }
    }


    // 5-属性方式声明事件
    // 事件类型的变量可以定义特殊的事件访问器add和remove:
    // ①add访问器:重载向事件添加事件处理程序的+=运算符
    // ②remove访问器:重载向事件移除事件处理程序的-=运算符
    public event EventHandler<FileArgs> DirectoryChangedA
    {
        add { DirectoryChangedA += value; }
        remove { DirectoryChangedA -= value; }
    }

    // 利用事件访问器的自定义,可以在类中定义私有事件和公有事件
    // ①私有事件(private):引发事件时真正调用的事件,保存事件处理程序,不允许直接从外部访问
    // ②公有事件(public):私有事件提供给外部的间接访问接口,访问器的添加和删除都在私有事件上进行
    // 外部只能通过公共事件重载的+=和-=运算符和私有事件交互,对公共事件进行的操作不会影响到私有事件
    private EventHandler _directoryChanged;      // 私有事件
    public event EventHandler DirectoryChanged   // 公共事件
    {
        add { _directoryChanged += value; }      // 私有事件添加事件处理程序,公共事件不变
        remove { _directoryChanged -= value; }   // 私有事件移除事件处理程序,公共事件不变
    }
}
