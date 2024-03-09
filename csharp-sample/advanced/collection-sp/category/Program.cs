namespace advanced.collection_sp.category;

public class Program
{
    // 常用集合类型

    // 1-集合相关的命名空间和接口
    // System.Collections               集合类均不支持泛型,集合元素以object类型存储
    // System.Collections.Generic       集合类支持泛型
    // System.Collections.Concurrent    集合类保证线程安全
    // System.Collections.Immutable     集合类初始化后不可变,对集合操作会生成新的集合
    // System.Collections.Specialized   提供专门类型化和强类型化集合类

    // 所有集合类都直接或间接地基于ICollection或ICollection<T>接口
    // IList和IDictionary接口是ICollection接口的派生:
    // ①实现IList或直接实现ICollection接口的集合类,每个元素都是单值Value
    // ②实现IDictionary接口的集合类,每个元素都是包含键Key和值Value的键值对


    // 2-栈和队列Stack<T>/Queue<T>
    // 栈提供后进先出(LIFO)访问权限,出栈入栈操作只能在栈顶进行
    // 队列提供先进先出(FIFO)访问权限,入队操作只能在队尾进行;出队操作只能在队头进行
    public interface IStackAndQueueUtilFunc<T>
    {
        T Pop();                // (栈)元素从栈顶出栈
        void Push(T elem);      // (栈)元素从栈顶入栈
        T Dequeue();            // (队列)元素从队头出队
        void Enqueue(T elem);   // (队列)元素从队尾入队
        T Peek();               // (通用)获取栈顶或队头元素,但不执行出栈或出队操作
    }

    public void TestStackAndQueue()
    {
        Stack<int> stack = new Stack<int>();
        Queue<int> queue = new Queue<int>();
        stack.Push(1);
        stack.Push(2);
        queue.Enqueue(1);
        queue.Enqueue(2);
        int s1 = stack.Pop();       // 2(栈顶)
        int q1 = queue.Dequeue();   // 1(队头)
    }


    // 3-列表List<T>
    // 列表通过整数索引来访问元素
    // 列表的默认排序方法是Array.Sort(),属于不稳定排序,且要求元素类型实现IComparable<T>
    public interface IListUtilFunc<T>
    {
        void Add(T elem);                          // 添加元素到列表尾
        void AddRange(IEnumerable<T> enumerable);  // 添加集合元素
        void Insert(int index, T elem);            // 指定位置插入元素

        T? Find(Predicate<T> predicate);           // 条件匹配查询元素
        bool Exists(Predicate<T> predicate);

        int IndexOf(T elem);                  // 正向查找(参数代表起始位置向后的偏移量)
        int IndexOf(T elem, int offset);
        int IndexOf(T elem, int offStart, int offEnd);
        int LastIndexOf(T elem);              // 反向查找(参数代表末尾位置向前的偏移量)
        int LastIndexOf(T elem, int offset);
        int LastIndexOf(T elem, int offStart, int offEnd);

        bool Remove(T elem);                  // 删除指定元素
        void RemoveAt(int index);
        void Reverse();                       // 反转列表
        void Reverse(int offStart, int offEnd);

        void Sort();                          // 默认方法排序(Array.Sort())
        void Sort(Comparison<T> comparison);  // 自定义比较器排序
        void Sort(IComparer<T> comparer);
        void Sort(int offStart, int offEnd, IComparer<T> comparer);
    }


    // 4-双向链表LinkedList<T>
    // 双向链表通过链表节点指针访问元素,提供First和Last属性动态指向链表的首尾节点
    // 双向链表的所有元素都是LinkedListNode<T>节点类型,遍历链表通常需以节点为单位
    public sealed class LinkedListNode<T>
    {
        public LinkedListNode<T> Next { get; internal set; }      // 后继结点
        public LinkedListNode<T> Previous { get; internal set; }  // 前驱结点
        public T Value { get; set; }                              // 结点值
        internal LinkedListNode(T value){}
    }

    public interface ILinkedListUtilFunc<T>
    {
        void AddFirst(T elem);                           // 插入元素(链表头,First指向插入节点)
        void AddLast(T elem);                            // 插入元素(链表尾,Last指向插入节点)
        void AddAfter(LinkedListNode<T> node, T elem);   // 指定节点后插入元素
        void AddBefore(LinkedListNode<T> node, T elem);  // 指定节点前插入元素

        bool Contains(T elem);               // 查找元素
        LinkedListNode<T> Find(T elem);      // 查找第一个匹配的节点
        LinkedListNode<T> FindLast(T elem);  // 查找最后一个匹配的节点

        void Remove(T elem);                  // 删除指定元素节点
        void Remove(LinkedListNode<T> node);  // 删除指定节点
        void RemoveFirst();                   // 删除链表头节点(First后移)
        void RemoveLast();                    // 删除链表尾节点(Last前移)
    }


    // 5-哈希表HashSet<T>
    // 哈希表是基于哈希表实现的集合，不允许添加重复元素，不关心元素在集合中的位置
    // 哈希表中元素唯一,可以方便进行交集,并集,差集,对称差等集合运算
    // 哈希表元素通过哈希函数GetHashCode()生成哈希值,<哈希值,元素>组成键值对填充进哈希表中
    // => 哈希表查找元素的时间复杂度为O(1)
    public interface IHashSetUtilFunc<T>
    {
        bool Add(T elem);                          // 添加元素(不成功返回false)
        bool Remove(T elem);                       // 删除指定元素
        int RemoveWhere(Predicate<T> predicate);   // 删除条件匹配元素(返回删除元素数)

        bool Contains(T elem);                     // 查找元素
        bool Overlaps(IEnumerable<T> enumerable);  // 判断和参数集合是否有相同元素重叠

        void UnionWith(IEnumerable<T> enumerable);            // 取并集
        void IntersectWith(IEnumerable<T> enumerable);        // 取交集
        void ExceptWith(IEnumerable<T> enumerable);           // 取差集(原-交)
        void SymmetricExceptWith(IEnumerable<T> enumerable);  // 取对称差(并-交)

        bool IsSupersetOf(IEnumerable<T> enumerable);        // 判断是否为参数集合的超集
        bool IsSubsetOf(IEnumerable<T> enumerable);          // 判断是否为参数集合的子集
        bool IsProperSupersetOf(IEnumerable<T> enumerable);  // 判断是否为参数集合的真超集
        bool IsProperSubsetOf(IEnumerable<T> enumerable);    // 判断是否为参数集合的真子集
    }


    // 6-有序集SortedSet<T>
    // 有序集是基于红黑树实现的集合,不允许添加重复元素,通过显式指定排序器实现集合元素的排序
    // 有序集不符合整数索引和键值索引的特征,不支持通过索引器访问集合元素
    // 由于红黑树特性,有序集查找元素操作的复杂度为O(logn),且提供Max和Min属性访问最大元素和最小元素
    public interface ISortedSetUtilFunc<T>
    {
        bool Add(T elem);                                      // 添加元素(不成功返回false)
        bool Remove(T elem);                                   // 删除指定元素
        int RemoveWhere(Predicate<T> predicate);               // 删除条件匹配元素(返回删除元素数)
        bool Contains(T elem);                                 // 查找元素
        bool Overlaps(IEnumerable<T> enumerable);              // 判断和参数集合是否有相同元素重叠
        bool SetEquals(IEnumerable<T> enumerable);             // 判断和参数集合的元素是否完全相同
        SortedSet<T> GetViewBetween(T? minElem, T? maxElem);   // 取指定大小范围的子集(参数为边界值)
        void UnionWith(IEnumerable<T> enumerable);             // 取并集
        void IntersectWith(IEnumerable<T> enumerable);         // 取交集
        void ExceptWith(IEnumerable<T> enumerable);            // 取差集(原-交)
        void SymmetricExceptWith(IEnumerable<T> enumerable);   // 取对称差(并-交)
        bool IsSupersetOf(IEnumerable<T> enumerable);          // 判断是否为参数集合的超集
        bool IsSubsetOf(IEnumerable<T> enumerable);            // 判断是否为参数集合的子集
        bool IsProperSupersetOf(IEnumerable<T> enumerable);    // 判断是否为参数集合的真超集
        bool IsProperSubsetOf(IEnumerable<T> enumerable);      // 判断是否为参数集合的真子集
        IEnumerable<T> Reverse();                              // 返回反方向遍历的迭代器
    }


    // 7-字典Dictionary<K,V>
    // 字典中元素以键值对结构类型KeyValuePair<K,V>存储
    // 键值对的Key用于建立索引保证键值对的唯一性(基于键值对的集合类不允许添加Key相同的元素)

    // 字典的操作方法中KeyValuePair是隐式的,参数只涉及K和V
    // KeyValuePair可作为泛型类型显式使用,该集合传入到Dictionary的构造方法中还可为其初始化
    public void TestKeyValuePair()
    {
        // KeyValuePair<K,V>作为集合泛型时,集合存储键值对整体的元素
        List<KeyValuePair<string, int>> keyValuePairs = new List<KeyValuePair<string, int>>();
        keyValuePairs.Add(new KeyValuePair<string, int>("Apple", 10));
        keyValuePairs.Add(new KeyValuePair<string, int>("Banana", 5));
        keyValuePairs.Add(new KeyValuePair<string, int>("Orange", 8));
        // KeyValuePair<K,V>构成的单值类型集合可以传入相同泛型Dictionary<K,V>的构造方法中
        Dictionary<string, int> myDictionary = new Dictionary<string, int>(keyValuePairs);
    }

    public interface IDictionaryUtilFunc<K, V>
    {
        void Add(K key, V value);     // 添加键值对元素
        bool Remove(K key);           // 删除指定Key元素的Value
        bool Remove(K key, V value);  // 删除指定Key元素的Value,并用参数替代该Value

        bool ContainsKey(K key);      // 查找指定Key(O(1))   -> 哈希表查找key
        bool ContainsValue(V value);  // 查找指定Value(O(n)) -> 隐式迭代器查找value
    }
    // Remove()删除操作的结果是破坏键值对,仅删除键值对中的Value而不会删除Key
    // 使用键值索引器访问删除Value后的键值对时,返回值是Value对应泛型类型的默认值


    // 8-排序字典SortedList<K,V>
    // 排序字典显式指定比较器实现集合元素有序,访问元素既可使用键值索引,也可通过集合方法实现整数索引
    // 排序字典的排序仅针对Key生效,且比较器只能在构造函数中传入参数给定,实例化后比较器无法更改
    public interface ISortedListUtilFunc<K, V>
    {
        void Add(K key, V value);      // 添加键值对元素(自动排序)
        bool Remove(K key);            // 删除指定Key元素的Value
        void RemoveAt(int index);      // 删除指定索引位置元素的Value

        bool ContainsKey(K key);       // 查找指定Key
        bool ContainsValue(V value);   // 查找指定Value

        K GetKeyAtIndex(int index);    // 查找指定索引位置元素的Key
        V GetValueAtIndex(int index);  // 查找指定索引位置元素的Value
        int IndexOfKey(K key);         // 查找指定Key所在的索引位置
        int IndexOfValue(V value);     // 查找指定Value所在的索引位置
    }
}
