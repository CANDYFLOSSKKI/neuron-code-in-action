# 集合框架

- **Collection**：单列数据，存储单个对象
- **List**：存储有序、可重复的数据
  - ArrayList：线程不安全，效率高，底层使用Object[]存储
  - LinkedList：频繁的插入删除操作效率更高，底层使用双向链表存储
  - Vector：古老实现类。线程安全，效率低，底层使用Object[]存储
- **Set**：存储无序、不可重复的数据
  - HashSet：线程不安全，可存储null
  - LinkedHashSet：可按照添加的顺序遍历内部数据，频繁遍历效率更高
  - TreeSet：可按照添加对象的指定属性进行排序遍历
- **Map**：双列数据，存储键值对
  - HashMap：线程不安全，效率高，可存储null的key和value
  - LinkedHashMap：可按照添加的顺序实现遍历，频繁遍历效率更高
  - TreeMap：可按照添加的键值对进行排序遍历，使用key作为排序对象
  - Hashtable：古老实现类。线程安全，效率低，不能存储null的key和value
  - Properties：常用来处理配置文件，key和value都是String类型

# 集合数组转换

```Java
//1:集合转数组 toArray()
Collection<Integer> col=new ArrayList();
Object obj      =col.toArray();                //不添加参数时只能返回Object
Integer[] array =col.toArray(new Integer[0]);  //添加长度为0的包装类参数即可指定类型

//2:数组转集合 Arrays.asList()
List<String> list=Arrays.asList(new String[]{"A","B","C"});  //数组对应List类型

Arrays.asList(new int[]{...});     //List<int[]>类型,相当于把数组整体作为元素添加
Arrays.asList(new Integer[]{...}); //List<Integer>类型,长度正常(强烈建议使用包装类)
```

# 迭代器

```Java
//迭代器不共用,每次调用<集合>.iterator()都会产生新对象
next();          //返回集合的下一个元素
remove();        //删除上一次next()输出的元素,不能重复使用
previous();      //(LinkedList特有)返回集合的上一个元素
```

# Collection

```Java
add(Object obj);                 //添加元素
size();                          //获取元素个数
addAll(Collection colx);         //添加另一个集合所有元素
clear();                         //清空元素
isEmpty();                       //判断集合是否为空
contains(Object obj);            //判断集合中是否包含某元素
containsAll(Collection colx);    //判断集合是否包含另一个集合所有元素
remove(Object obj);              //移除指定元素
removeAll(Collection colx);      //移除另一个集合所有元素(求差集)
retainAll(Collection colx);      //求两个集合的交集,结果赋给原集合
equals(Object obj);              //判断两个集合是否相同
hashCode();                      //返回当前集合对象哈希值
```

# Collections

```Java
Collections.reverse(Collection);            //反转元素顺序
Collections.shuffle(Collection);            //元素随机排序
Collections.sort(Collection);               //元素自然排序(升序)
Collections.sort(Collection, Comparator);   //元素定制排序(指定排序器)
Collections.swap(Collection, int, int);     //指定位置元素位置交换
Collections.max/min(Collection);            //根据自然排序,返回最大/最小元素
Collections.max/min(Collection, Comparator);//根据定制排序,返回最大/最小元素
Collections.frequency(Collection, Object);  //返回指定元素的出现个数
Collections.copy(Collection, Collection);   //将后一个集合的元素复制到前一个集合中
Collections.replaceAll(Collection, Object old, Object new);    
                                            //利用新值替换集合中所有的旧值
```

# List API

```Java
add(int index, Object ele);           //在指定位置插入元素
addAll(int index, Collection eles);   //在指定位置插入集合所有元素
get(int index);                       //获取指定位置元素
indexOf(Object obj);                  //返回元素首次出现的位置
lastIndexOf(Object obj);              //返回元素最后一次出现的位置
remove(int index);                    //删除指定位置元素
set(int index, Object ele);           //更新指定位置元素
subList(int fromIndex, int toIndex);  //返回首尾位置指定的子集合(左闭右开区间)
```

# Map API

```Java
put(Object key, Object value);      //添加指定键值对(也可用于更新键值对)
putAll(Map m);                      //添加另一个Map所有键值对
remove(Object key);                 //移除指定key对应的键值对
clear();                            //清空Map
get(Object key);                    //获取指定key对应的value
containsKey(Object key);            //检测Map中是否包含指定key
containsValue(Object value);        //检测Map中是否包含指定value
size();                             //返回Map中键值对的个数
isEmpty();                          //检测Map是否为空
equals();                           //判断Map是否相等
```

# 特殊集合

## 映射视图

```Java
Map<String,String> map=new HashMap<>();
//1:所有key组成的Set集合 keySet()
Set<String> set=map.keySet();
//2:所有value组成的Collection集合 values()
Collection<String> col=map.values();
//3:所有Entry键值对组成的Set集合 entrySet()
Set<Map.Entry<String,String>> eSet=map.entrySet();
```

## 只读集合

```Java
//1:集合工厂方法
//1-1:只读List集合 List.of(...)
List<String> list=List.of("A","B","C");
//1-2:只读Set集合 Set.of(...)
Set<String> set=Set.of("A","B","C");
//1-3:只读Map集合 Map.ofEntries()
Map<String,Integer> map=Map.ofEntries(
    Map.entry("A",1),
    Map.entry("B",2),
    Map.entry("C",3)
);

//2:Collections工具类创建只读集合
List<String> list=new LinkedList<>();
//2-1:新集合不可修改
List<String> nList=Collections.unmodifiableList(list);  //nList不可修改,list可以修改
//2-2:当前集合不可修改 
lookAt(Collections.unmodifiableList(list));             //list不可修改
```

## 子集集合

```Java
//1:List子集合 subList()
//2:Set子集合(只有TreeSet才有如下方法,不能使用多态调用)
<E> subSet(E from, E to);    //取区间 [from, to)  的集合
<E> headSet(E to);           //取区间 [0, to)     的集合
<E> tailSet(E from);         //取区间 [from, end) 的集合
//3:Map子集合(只有TreeMap才有如下方法,不能使用多态调用)
<K,V> subMap(K from,K to)
<K,V> headMap(K to)
<K,V> tailMap(K from)

//4:Navigable接口(决定是否包含左右边界)(返回值为NavigableSet的泛型)
    //fromInclusive :是否包含左边界
    //toInclusive   :是否包含右边界
<E> subSet(E from,boolean fromInclusive,E to,boolean toInclusive)
<E> headSet(E to,boolean toInclusive)
<E> tailSet(E from,boolean fromInclusive)
```

# Stream

```Java
//1:通过集合创建
List<Person> list=new ArrayList<>();
Stream<Person> s1=list.stream();          //顺序流(数据可按顺序读取)
Stream<Person> s2=list.parallelStream();  //并行流(数据被多线程同时读取,不保证顺序)

//2:通过数组创建
Person[] arr=new Person[]{...};
Stream<Person> s=Arrays.stream(arr);
//以下是3个特殊形式的Stream,只能接收特定类型:
//public static IntStream stream(int[] array)
//public static LongStream stream(long[] array)
//public static DoubleStream stream(double[] array)

//3:隐式创建
Stream<Integer> s=Stream.of(1,2,3,4);    //可接受任意数量的参数

//4:无限流创建
//4-1:函数式接口创建(参数里填初始值 + Lambda)
Stream<Integer> s=Stream.iterate(0,t->t+2);       //[0,2,4,6,8...]
//4-2:供给型接口创建(参数里填Lambda)
Stream<Integer> s=Stream.generate(Math::random);  //[随机数...]
```

## 中间操作

```Java
//1:筛选和切片
fliter(Predicate p);    //排除某些元素(p为满足要求的条件)
distinct();             //去除重复元素(通过hashcode()和equals())
limit(long maxSize);    //截断流,使元素个数不超过规定数量
skip(long n);           //跳过前n个元素(不足n个则返回空流)

//2:映射
map(Function f);        //将函数应用到每个元素上
//mapToDouble(ToDoubleFunction f)
//mapToInt(ToIntFunction f)
//mapToLong(ToLongFunction f)
flatMap(Function f);    //(多用于嵌套流)将每个元素转换为单个的流,再将流连接起来

//3:排序
sorted();                //按自然顺序排序
sorted(Comparator com);  //按定制排序顺序排序
```

## 终止操作

```Java
//1:匹配和查找
allmatch(Predicate p);    //检查是否匹配所有元素
anyMatch(Predicate p);    //检查是否至少匹配一个元素
noneMatch(Predicate p);   //检查是否没有任何匹配元素
count();                  //返回元素总数
//以下方法均返回Optional<T>类型
findFirst();              //返回第一个元素
findAny();                //返回任意一个元素(顺序流没有任意性,和findFirst()相同)
max(Comparator c);        //依据定制排序返回最大值
min(Comparator c);        //依据定制排序返回最小值
forEach(Consumer c);      //内部迭代遍历

//2:归约
reduce(T iden, BinaryOperator b);    //以iden为初值,将流中所有元素合起来得到一个值
                                         //返回值为T类型
reduce(BinaryOpertor b);             //无初值的归约操作,返回值为Optional<T>类型

//3:收集
collect(Collector c);    //将流转为其它形式
//常用的Collector:
//Collectors.toList()
//Collectors.toSet()
//Collectors.toCollection()
```