using basic.class_sp.special;

namespace basic.class_sp.special;

public class Program {}
// 类的特殊形式

// 1-接口
// 接口的实现类必须具体实现接口下的所有方法
// 抽象类实现接口时,不能标记接口方法为抽象方法

// 接口中的接口方法默认是virtual标识的虚方法,接口方法可以有默认的实现逻辑
// 实现类中的接口方法必须是public且非静态的
interface IEquatable<T>
{
    // 声明接口方法(不需要访问修饰符)
    bool Equals(T obj);
}
public class Car : IEquatable<Car>
{
    public string? Make { get; set; }
    public string? Model { get; set; }
    public string? Year { get; set; }
    // 实现接口方法(public)
    public bool Equals(Car? car)
    {
        return (this.Make, this.Model, this.Year) ==
               (car?.Make, car?.Model, car?.Year);
    }
}

// 1-1 多接口同名方法实现和调用
// 当实现类同时实现的多个接口中有同名方法时,有如下两种处理方式:
// ①正常实现接口方法,此时两个接口方法的方法体相同
// ②分别声明两个不同接口限定名的方法,对应不同的方法体
interface IControl { void Paint(); }
interface ISurface { void Paint(); }
public class SampleClass : IControl, ISurface
{
    // 使用限定名显式实现接口方法时,接口方法不添加访问修饰符
    void IControl.Paint()
    {
        System.Console.WriteLine("IControl.Paint");
    }
    void ISurface.Paint()
    {
        System.Console.WriteLine("ISurface.Paint");
    }
    // 调用显式实现的接口方法时,先将对象强转为对应接口类型再调用
    public void TestPaint()
    {
        ((ISurface)this).Paint();
    }
}


// 2-抽象类
// 抽象类使用abstract标识,可以定义普通方法,也可以定义abstract标识的抽象方法(无方法体)
// 抽象类的派生类可以实现基类的抽象方法,也可以继续标识该方法为抽象方法交给下方的派生类实现
//  ①只要类中存在抽象方法,类就一定是抽象类,不可被实例化
//  ②抽象类中不一定存在抽象方法,可以将普通类标识为抽象类避免被外界实例化
public abstract class A
{
    public abstract void DoWork(int i);     // A:声明抽象方法
}
public abstract class B : A;                // B:传递抽象方法
public class C : B
{
    public override void DoWork(int i)      // C:实现抽象方法
    {
        Console.WriteLine(i);
    }
}


// 3-密封类
// 密封类使用sealed标识,密封类的特点是不能作为基类被派生
// 可以单独标识重写方法为密封方法，密封的重写方法对派生类不再是虚方法,不能被重写
public sealed class Person;
public class D : C
{
    // D中单独声明重写方法DoWork()为密封方法
    // D的派生类不能再重写DoWork()
    public sealed override void DoWork(int i)
    {
        Console.WriteLine(i+1);
    }
}


// 4-静态类
// 静态类使用static标识
// 静态类中只包含静态成员,无法实例化且没有实例构造函数
// 静态类和密封类一样无法作为基类被派生
public static class TemperatureConverter
{
    public static double CelsiusToFahrenheit(string temperatureCelsius)
    {
        double celsius = Double.Parse(temperatureCelsius);
        double fahrenheit = (celsius * 9 / 5) + 32;
        return fahrenheit;
    }
    public static double FahrenheitToCelsius(string temperatureFahrenheit)
    {
        double fahrenheit = Double.Parse(temperatureFahrenheit);
        double celsius = (fahrenheit - 32) * 5 / 9;
        return celsius;
    }
}


// 5-分部类
// 分部类使用partial标识,分部类可以将定义拆分到多个源文件中,直到编译期再进行组合
// 分部类各个部分的访问修饰符必须相同,且必须在相同程序集和相同模块中定义
//  ①如果某一部分声明为抽象的,则整个类都是抽象的
//  ②如果某一部分声明为密封的,则整个类都是密封的
//  ③如果某一部分声明派生某个基类,则整个类都派生该基类
public partial class Employee
{
    public void DoWork(){}
    partial void OnNameChanged();
}
public partial class Employee
{
    public void GoToLunch(){}
    partial void OnNameChanged() {}
}

// 5-1 分部方法
// 分部类中可以显式声明分部方法,分部方法分为声明和实现两部分,分散在分部类的两个不同部分中
// 可以为已声明并实现的分部方法生成委托,但不能为已声明但未实现的分部方法生成委托
