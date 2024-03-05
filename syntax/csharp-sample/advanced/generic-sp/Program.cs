namespace advanced.generic_sp;

public class Program
{
    // 泛型

    // 1-泛型的声明
    // 泛型使用<>钻石运算符声明类型
    // 当给出了某个泛型参数的具体类型时,该结构中所有的泛型参数都会替换为目标类型
    // ①带泛型类型的类
    public class GenericList<T>
    {
        // ②带泛型类型的参数类型
        public void Add(T input) {}
    }
    class TestGenericList
    {
        private class ExampleClass {}
        static void TestListFunc()
        {
            // ③带泛型参数的变量类型
            GenericList<int> list1 = new GenericList<int>();
            list1.Add(1);
        }
    }

    // 2-泛型的协变和逆变
    // 协变(Covariance)指的是将派生类泛型的实例对象赋给基类泛型的变量
    // 逆变(Contravariance)指的是将基类泛型的实例对象赋给派生类泛型的变量
    class Base {}
    class Derived : Base {}
    // 协变(派生类隐式转基类):  IEnumerable<Base> obj = (IEnumerable<Derived>)instance;
    // 逆变(基类隐式转派生类):  Action<Derived> obj = (Action<Base>)instance;
    // 不变性(不允许隐式转换):  List<Derived> obj ≠ (List<Base>)instance;

    // 2-1 支持协变参数的泛型接口(通常用作返回类型)
    // ①IEnumerable<T>
    // ②IEnumerator<T>
    // ③IQueryable<T>
    // ④IGrouping<TKey,TElement>

    // 2-2 支持逆变参数的泛型接口(通常用作参数类型)
    // ①IComparer<T>
    // ②IComparable<T>
    // ③IEqualityComparer<T>


    // 3-泛型委托的可变类型
    // 泛型委托中,泛型参数类型均支持逆变;泛型返回值类型均支持协变
    // ①Action<T>        参数T支持逆变
    // ②Func<TResult>    返回值TResult支持协变
    // ③Func<T,TResult>  参数T支持逆变;返回值TResult支持协变

    // 泛型委托可以通过协变和逆变实现隐式转换,但不能合并(合并强制要求同类型的委托变量)
    // 泛型委托的可变类型仅限于引用类型,对值类型不生效

    static Derived MyMethod(Base b)
    {
        return b as Derived ?? new Derived();
    }

    public void TestVariant()
    {
        Func<Base, Derived> f1 = MyMethod;
        // 3-1 泛型委托的返回值协变
        // ①委托中的方法返回Derived类型的原生返回值a
        // ②返回值经过协变的委托类型,通过多态Base b = a转换返回值为Base类型
        // ③返回值对外输出
        Func<Base, Base> f2 = f1;
        Base b2 = f2(new Base());

        // 3-2 泛型委托的参数逆变
        // ①逆变的委托接收Derived类型的原生参数a
        // ②委托中的方法通过多态Base b = a转换参数为Base类型
        // ③返回值对外输出
        Func<Derived, Derived> f3 = f1;
        Derived d3 = f3(new Derived());
    }
}
