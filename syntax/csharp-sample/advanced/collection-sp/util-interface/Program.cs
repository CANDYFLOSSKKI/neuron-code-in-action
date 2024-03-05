using System.Collections;

namespace advanced.collection_sp.util_interface;

public class Program
{
    // 集合常用工具类接口

    // 1-集合元素的判等
    // 判等方法需要集合元素类实现IEquatable<T>接口的Equals()
    // 在基于哈希表存储的集合类中,查找操作使用哈希表完成,集合元素类还需重写GetHashCode():
    //  ①相等的元素哈希值必然相等
    //  ②不相等的元素哈希值尽量不相等(链地址法解决哈希值冲突)

    // public bool Equals(T? other);  IEquatable<T>.Equals<T>
    // public int GetHashCode();      System.Object.GetHashCode()
    public class Person : IEquatable<Person>
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public bool Equals(Person? obj) { return false; }
        public override int GetHashCode() { return 1; }
    }


    // 2-集合元素的比较
    // 通过比较器实现集合元素的比较的两种方法:
    // ①在集合元素类中实现IComparable<T>接口的CompareTo(T),接收一个T类型参数和自身比较
    // ②在任意类中实现IComparer<T>接口的Compare(T,T),接收两个T类型参数互相比较

    // public int CompareTo(T? other);  IComparable<T>.CompareTo<T>
    // public int Compare(T? x, T? y);  IComparer<T>.Compare<T>
    public class Persona : IComparable<Persona>, IComparer<Persona>
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public int CompareTo(Persona? other) { return 0; }
        public int Compare(Persona? x, Persona? y) { return 0; }
    }

    // 集合元素类实现IComparable<T>接口时,Sort()自动调用CompareTo()方法排序
    // IComparer<T>的接口方法不会被Sort()自动调用,但可以显式作为自定义排序器实参
    public void TestPersonList()
    {
        List<Persona> list = new List<Persona>();
        // 集合元素类实现IComparable<T>.CompareTo<T>时,自动调用CompareTo()
        list.Sort();
        // 集合元素类实现IComparer<T>.Compare<T>时,显式给定排序器Compare()
        list.Sort((x, y) => x.Compare(x, y));
    }


    // 3-集合元素的迭代
    // 使用迭代器遍历集合可以使用foreach(自动调用迭代器),也可以显式获取迭代器自定义逻辑
    // 支持迭代器的集合类需要实现IEnumerable<T>的GetEnumerator(),返回实现IEnumerator<T>的迭代器对象
    // IEnumerator<T>定义了迭代器的行为标准
    public class PersonCollection : IEnumerable<Person>
    {
        private List<Person> list;
        public IEnumerator<Person> GetEnumerator()
        {
            return list.GetEnumerator();
        }
        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }

    // GetEnumerator()返回位于初始位置的新迭代器
    // 迭代器的初始位置不指向任何元素;迭代器提供Current属性获取当前位置上的集合元素
    // bool MoveNext();  迭代器移动到下个元素
    // void Reset();     迭代器返回初始位置
    // void Dispose();   迭代器释放资源
    public void TestEnumerator()
    {
        PersonCollection pc = new PersonCollection();
        IEnumerator<Person> enumerator = pc.GetEnumerator();
        bool flag = enumerator.MoveNext();
        Person p = enumerator.Current;
    }


    // 4-集合元素延迟加载
    // 延迟加载仅当需要时才会逐个加载集合元素,可减少加载和初始化大量元素导致的性能和资源开销
    // 延迟加载借助于yield return语法实现,yield return返回数据时记录当前的运行位置(同JS)

    // 4-1 延迟加载的迭代器
    // 迭代器遍历集合元素不属于延迟加载,生成迭代器对象时集合的所有元素就已经加载进内存
    // 将集合改造成yield return返回数据的延迟加载数据集(声明类型为IEnumerable<T>)即可实现延迟加载
    public IEnumerable<Person> GetLazyList(List<Person> list)
    {
        foreach(Person person in list)
        {
            yield return person;  // 集合内部延迟加载
        }
    }

    public void TestYieldReturn()
    {
        List<Person> list = new List<Person>();
        IEnumerable<Person> lazyList = GetLazyList(list);
        // foreach和显式迭代器遍历
        foreach(Person person in lazyList){}
        IEnumerator<Person> lazyIter = lazyList.GetEnumerator();
    }

    // 4-2 延迟加载的数据集
    // 延迟加载数据集可用于接收大批量的静态数据
    // 在获取集合元素时使用yield return返回值即可实现数据集的延迟加载
    public IEnumerable<int> GetFibonacciArray()
    {
        // 延迟加载10W以内的斐波那契数列
        int previous = 0;
        int next = 1;
        while(next<100000)
        {
            int value = previous + next;
            previous = next;
            next = value;
            yield return value;
        }
    }
    public void TestFibonacci()
    {
        var fibonacciSequence = GetFibonacciArray();
        foreach (var number in fibonacciSequence)
        {
            Console.WriteLine(number);
        }
    }
}
