# Class

```Java
//1:直接获取类的字节码
Class c=Person.class;
//2:通过对象实例
Class c=new Person().getClass();
//3:Class静态方法(以类的完整类名为参数)
Class c=Class.forName("Person");
//4:使用类加载器
ClassLoader cl=Person.class.getClassLoader();
Class c=cl.loadClass("Person");

//Class可带泛型类型:Class<Person>
//各种不同的类型都有Class对象(均是运行时类):
Class c=Object.class;      //普通类
Class c=Comparable.class;  //接口
Class c=String[].class;    //引用数据类型数组
Class c=int[][].class;     //基本数据类型数组
    //只要数组的元素类型与维度一样,就属于同一个Class:
    int[] a=new int[114514];
    int[] b=new int[1919810];
    a==b; //true
Class c=ElementType.class; //枚举
Class c=Override.class;    //注解
Class c=int.class;         //基本数据类型
Class c=void.class;        //void
Class c=Class.class;       //Class
```

# ClassLoader

```Java
//1:系统类加载器jdk.internal.loader.ClassLoaders$AppClassLoader
//任何自定义类的类加载器都是系统类加载器
ClassLoader cl1=Person.class.getClassLoader();

//2:扩展类加载器jdk.internal.loader.ClassLoaders$PlatformClassLoader
//系统类加载器的getParent()
ClassLoader cl2=cl1.getParent();

//3:引导类加载器(负责加载核心类库,无法主动获取)
```

# 运行时类的数据获取

## 获取类的属性

```Java
Class<Person> c=Person.class;
//1:获取类的所有public属性(包含父类)
Field[] fields=c.getFields();
//2:获取类的所有属性(不包含父类)
Field[] dFields=c.getDeclaredFields();

for(Field f:dFields){
    //3-1:获取属性的权限修饰符
    int modifier=f.getModifiers();                //数字形式(有用)
    String fModifier=Modifier.toString(modifier); //字符串形式
    //3-2:获取属性的数据类型(完整类名)
    String fType=f.getType().getName();
    //3-3:获取属性的变量名
    String fName=f.getName();
}
//可利用int型的权限修饰符判断属性的特征:
boolean Modifier.isAbstruct(int modifiers)
boolean Modifier.isFinal(int modifiers)
boolean Modifier.isInterface(int modifiers)
boolean Modifier.isNative(int modifiers)
boolean Modifier.isPrivate(int modifiers)
boolean Modifier.isProtected(int modifiers)
boolean Modifier.isPublic(int modifiers)
boolean Modifier.isStatic(int modifiers)
boolean Modifier.isStrict(int modifiers)
boolean Modifier.isSynchronized(int modifiers)
boolean Modifier.isVolatile(int modifiers)
```

## 获取类的方法

```Java
Class<Person> c=Person.class;
//1:获取类的所有public方法(包括父类)
Method[] methods=c.getMethods();
//2:获取类的所有方法(不包括父类)
Method[] dMethods=c.getDeclaredMethods();

for(Method m:dMethods){
     //3-1:获取方法的所有注解
     Annotation[] mAnnotation=m.getAnnotations();
     //3-2:获取方法的权限修饰符
     String mModifier=Modifier.toString(m.getModifiers());
     //3-3:获取方法的返回值类型
     String mReturnType=m.getReturnType().getName();
     //3-4:获取方法的方法名
     String mName=m.getName();
     //3-5:获取方法的形参列表
     Class[] mParameter=m.getParameterTypes();
     //3-6:获取方法抛出的异常
     Class[] mException=m.getExceptionTypes();
}

//TypeVariable[] getTypeParameters()  获取方法的泛型类型变量
//Type getGenericReturnType()         获取方法的泛型返回类型
//Type[] getGenericParmeterTypes()    获取方法声明的泛型参数类型
```

## 获取类的构造器

```Java
Class<Person> c=Person.class;
//1:获取类的所有public构造器(不包含父类)
Constructor[] constructors=c.getConstructors();
//2:获取类的所有构造器(包含父类)
Constructor[] dConstructors=c.getDeclaredConstructors();

//构造器也是方法的一种,获取数据的方式相同
//构造器可带泛型:Constructor<person> 
```

## 获取类的父类

```Java
Class<Person> c=Person.class;
//1:获取不带泛型的父类
Class sClass=c.getSuperClass();
//2:获取带泛型的父类类型
Type gsClass=c.getGenericSuperclass();
//3:获取父类的泛型参数
ParameterizedType param=(ParameterizedType)gsClass;  //参数化类型
Type[] actual=param.getActualTypeArguments();        //获取类型参数

//Type[] getBounds():获取子类限定
//Type[] getUpperBounds():获取子类限定
//Type[] getLowerBounds():获取超类限定
//Type getRawType():获取原始类型
//Type getGenericComponentType():获取泛型元素类型
```

## 获取类的接口

```Java
Class<Person> c=Person.class;
//1-1:获取类的接口
Class[] interfaces=c.getInterfaces();
//1-2:获取父类的接口
Class[] sInterfaces=c.getSuperclass().getInterfaces();

//Type[] getGenericInterfaces():获取接口的泛型类型
```

## 获取类所在的包

```Java
Class<Person> c=Person.class;
//1:获取类所在的包
Package pack=c.getPackage();    //带pack前缀
String str=pack.getName();      //字符串类型
```

## 获取类声明的注解

```Java
Class<Person> c=Person.class;
//1:获取类声明的所有注解
Annotation[] annotations=c.getAnnotations();
```

# 运行时类的数据操作

## 调用类的属性

```Java
Class<Person> c=Person.class;
Person p=(Person)c.newInstance();
//1:获取指定的属性(参数里填属性名)
Field id=c.getDeclaredField("id");
id.setAccessible(true);   //关闭访问控制

//2-1:获取非静态属性
int PID=id.get(p);        //等价于 PID=p.getID()
//2-2:设置非静态属性
id.set(p,1011);           //等价于 p.setID(1011)
//3-1:获取静态属性
int PID=id.get(Person.class);    //等价于 PID=Person.ID;
//3-2:设置静态属性
id.set(Person.class,1011);       //等价于 Person.ID=1011;
```

## 调用类的方法

```Java
Class<Person> c=Person.class;
Person p=(Person)c.newInstance();
//1:获取指定的方法(参数里填方法名 + 形参的字节码)
Method show=c.getDeclredMethod("show",String.class);
show.setAccessible(true);   //关闭访问控制

//invoke(A,B):对象名/字节码+方法实参
//2:调用非静态方法
Object obj=show.invoke(p,"CHN");       //等价于 p.show("CHN");
//3:调用静态方法(字节码可以传null,因为已经确定了类)
Object obj=show.invoke(null,"CHN");    //等价于 Person.show("CHN");
```

## 调用类的构造器

```Java
Class<Person> c=Person.class;
Person p=(Person)c.newInstance();
//1:获取指定的构造器(参数里填形参的字节码)
Constructor<Person> constructor=c.getDeclaredConstructor(String.class);
constructor.setAccessible(true);   //关闭访问控制
//2:调用构造器
Person p=constructor.newInstance("ABC"); //等价于 p=new Person("ABC");
```

## 数组反射

```Java
//1:创建数组对象(参数里填数组元素类型 + 容量)
int[] array=(int[])Array.newInstance(int.class,10);
//2:数组元素获取(参数里填数组对象 + 位置)
int a=(int)Array.get(array,5);    //原始API
int a=Array.getInt(array,5);      //Array.getXxx()包含强转操作
//3:数组元素修改(参数里填数组对象 + 位置 + 新值)
Array.set(array,5,114514);        //原始API
Array.setInt(array,5,114514);     //Array.setXxx()支持自动类型转换
```