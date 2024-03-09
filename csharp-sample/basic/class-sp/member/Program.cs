namespace basic.class_sp.member;

public class Program
{
    // 类的成员

    // 1-访问修饰符
    //                      类内    派生类    非派生类    派生类(不同程序集)    非派生类(不同程序集)
    // public                √       √          √             √                    √
    // protected internal    √       √          √             √                    ×
    // protected             √       √          ×             √                    ×
    // internal              √       √          √             ×                    ×
    // private protected     √       √          ×             ×                    ×
    // private               √       ×          ×             ×                    ×


    // 2-字段的声明方式
    // 字段在类中直接声明,字段的访问修饰符通常为private或protected
    // 外界不允许直接访问字段,必须间接通过自定义的getter和setter访问器
    private string name = "name";
    public string SetName()            // 字段getter访问器
    {
        return this.name;
    }
    public void SetName(string name)   // 字段setter访问器
    {
        this.name = name;
    }


    // 3-属性的声明方式
    // 属性是特殊的方法,声明时访问修饰符设定为public且变量名首字母大写
    // 属性内部隐含不可访问的private字段,可以声明访问器操作属性的状态(相当于通过大写变量实现代理)
    //  ①get访问器:对应字段的getter方法
    //  ②set访问器:对应字段的setter方法
    //  ③init访问器:标识该属性初始化后只读,和set访问器互斥,只能和get访问器配合使用
    public string Name1 { get; set; }  // 使用默认的访问器逻辑
    public string Name2                // 使用自定义的访问器逻辑
    {
        get => Name2;
        set => Name2 = value;
    }
    public string Name3 { get; }
    public string Name4 { get; init; }


    // 4-构造函数的声明方式
    // 构造函数的特点是方法名=类名,不包含返回值.且方法体可以为空
    // 当类中没有显式定义的构造函数时,编译器会为类隐式创建空构造函数
    // 如果没有构造函数的需求,又不希望类在外部实例化,可以声明私有构造函数防止默认构造函数
    public class Person
    {
        private string last;
        private string first;
        private static int age;
        public Person(string lastName, string firstName)
        {
            last = lastName;
            first = firstName;
        }
        public Person(){}
        static Person() => age = 20;
    }

    // 4-1 派生类的构造函数
    // 派生类的构造函数中可以使用base关键字引用基类的构造函数
    // base必须出现在构造函数的初始化器中,而不能出现在构造函数体中
    // base只能引用直接基类的构造函数,如果存在多层派生关系,每个派生类中都要添加base
    public class Student : Person
    {
        public string ID { get; set; }
        // 在初始化器中base()引用父类的构造函数(语法类似于继承)
        public Student(string id) : base()
        {
            ID = id;
        }
    }


    // 5-运算符重载的声明方式
    // 运算符重载方法需要同时包含public和static修饰符,方法名使用operator <运算符>
    // 运算符重载方法的返回值类型为当前类,重载n元运算符需要包含n个当前类类型的输入参数

    //  ①布尔运算符true和false必须成对同时重载
    //  ②四则运算符重载时,对应的自操作运算符(+=)也会重载
    //  ③短路运算符&&和||不允许重载
    //  ④比较运算符==和!=、<和>、<=和>=必须成对同时重载
    public class Persona
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public Persona(string name, int age)
        {
            this.Name = name;
            this.Age = age;
        }
        // 重载二元运算符+,参数包含两个类对象
        public static Persona operator +(Persona a, Persona b)
        {
            // 运算符重载内部返回计算后的对象
            return new Persona(a.Name, a.Age + b.Age);
        }
    }
}
