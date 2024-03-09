# 函数式接口

```Java
//1:核心函数式接口
Consumer<T>            //(消费型接口) 参数类型:T 返回类型:void
    void accept(T t)       //对类型T的对象应用操作
Supplier<T>            //(供给型接口) 参数类型:无 返回类型:T
    T get()                //返回类型T的对象
Function<T,R>          //(函数型接口) 参数类型:T 返回类型:R
    R apply(T t)           //对类型T的对象应用操作,返回类型R的对象
Predicate<T>           //(断定型接口) 参数类型:T 返回类型:boolean
    boolean test(T t)      //判断类型T的对象是否满足约束

//2:补充函数式接口
BiFunction<T,U,R>         //参数类型:T,U 返回类型:R
    R apply(T t,U u)          //对类型T,U对象应用操作(二元),返回类型R结果
UnaryOperator<T>          //(Function子接口) 参数类型:T 返回类型:T
    T apply(T t)              //对类型T对象进行一元运算,返回类型T结果
BinaryOperator<T>         //(BiFunction子接口) 参数类型:T,T 返回类型:T
    T apply(T t1,T t2)        //对类型T对象进行二元运算,返回类型T结果
BiConsumer<T,U>           //参数类型:T,U 返回类型:void
    void accept(T t,U u)      //对类型T,U对象应用操作
BiPredicate<T,U>          //参数类型:T,U 返回类型:boolean
    boolean test(T t,U u)     //判断类型T,U对象是否满足约束
ToIntFunction<T>
ToLongFunction<T>
ToDoubleFunction<T>       //参数类型:T 返回对应类型 类型转换
IntFunction<R>
LongFunction<R>
DoubleFunction<R>         //对应类型参数 返回类型:R 类型转换
```

## 无参数无返回值

```Java
Runnable run=()->{
    System.out.println("ABC");    
};
```

## 有参数无返回值

```Java
Consumer<String> con=(String s)->{
    System.out.println(s);
};
//1:已经提供了泛型类型,可以省略参数类型    (String s)->(s)
//2:只有一个参数,小括号()可以省略         (s)->s
```

## 有参数有返回值

```Java
Comparator<Integer> com=(o1,o2)->{
    return o1.compareTo(o2);
};
//1:如果只有return语句,可以将返回值作为语句:
//Comparator<Inetger> com=(o1,o2)->o1.compareTo(o2);
```

# 方法引用

```Java
//1:对象::非静态方法引用
Consumer<String> con=System.out::println;  //等价于 System.out.println(str);
//2:类::静态方法引用
Function<Double,Long> func=Math::round;    //等价于 d->Math.round(d);
//3:类::非静态方法引用
Comparator<String> com=String::compareTo;  //等价于 o1.compareTo(o2);
```

## 构造器引用

```Java
//1:无参构造器引用
Supplier<Person> sup=Person::new;           //等价于 new Person();
//2:有参构造器引用(多个泛型参数,指明参数类型)
Fuction<Integer,Person> func=Person::new;   //等价于 new Person(Integer i);
```

## 数组引用

```Java
//1:泛型带Integer,代表数组长度
//2:引用数组Class的new()
Function<Integer,String[]> func=String[]::new;  //等价于 new String[length];
```

## 比较器引用

```Java
Comparator<Person> com;
//1:静态方法构造自然排序比较器(提供获取方法即可)
com=Comparator.comparing(Person::getName);
//2:静态方法构造定制排序比较器
com=Comparator.comparing(Person::getName,(o1,o2)->Integer.compare(o1,o2));

//3:二次比较(提供两个获取方法)
com=Comparator.comparing(Person::getLast).thenComparing(Person::getFirst);

//4:适配器(遇到null时不会抛出异常)
com=Comparator.comparing(Person::getName,nullsFirst(naturalOrder()));
//nullsFirst:认为空值小于任何非空值
//nullsLast:认为空值大于任何非空值
//naturalOrder:自然顺序排序
//reverseOrder:自然顺序逆序排序
```