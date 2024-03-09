# 数值处理

## Optional

```Java
//实例化Optional对象:
//Optional<T> empty()             空Optional
//Optional<T> of(T value)         不可接受null的Optional
//Optional<T> ofNullable<T value> 可接受null的Optional
Optional<Person> o1=Optional.empty();
Optional<Person> o2=Optional.of(new Person());
Optional<Person> o3=Optional.ofNullable(null);
T get()                             //返回实际值(null抛出异常)
boolean isPresent()                 //判断是否为null
boolean isPresent(Consumer con)     //若对象为null,调用Consumer的值备用
Optional<T> filter(Predicate pre)   //利用Predicate对值进行过滤
                                        //(符合条件返回本身;不符合返回空Optional）
Optional<U> map(Function func)      //利用Function对值进行计算,包装成新Optional
Optional<U> flatMap(Function func)  //(对二维嵌套Optional使用)二维对象映射一维

T orElse(T other)                   //非空返回对象值;空返回参数值
T orElseGet(Supplier sup)           //非空返回对象值;空返回Supplier的值备用
U orElseThrow(Supplier sup)         //非空返回对象值;空抛出特定异常
```

## Enum

```Java
//1:声明enum关键字
//(enum = public final static)
enum Season{
    //2:提供多个枚举类对象
    SPRING("春天"),
    SUMMER("夏天");
    //3:声明成员变量和构造器(private)
    private final String name;
    private Season(String name){this.name=name;}
}
//枚举类是静态类,以下方法用静态方法方式调用:
values()             //返回枚举类型的对象数组,便于进行遍历
valueOf(String str)  //将字符串转为已有的枚举类对象
toString()           //返回当前枚举类对象常量的名称
```

## Math

```Java
Math.abs(Type number)        //取绝对值
Math.ceil(double number))    //向上取整
Math.floor(double number)    //向下取整
Math.rint(double number)     //四舍五入
Math.round(Type number)      //四舍五入(float返回int; double返回long)
Math.random()                //取一个[0.0, 1.0]的随机数
Math.max(Type x,Type y)      //取最大值
Math.min(Type x,Type y)      //取最小值

Math.sqrt(double number)      //平方根
Math.cbrt(double number)      //立方根
Math.hypot(double x,double y) //勾股定理计算斜边长
Math.pow(double x,double y)   //计算 x^y
Math.exp(double x)            //计算 e^x
Math.nextUp(Type x)           //比x大一点的浮点数
Math.nextUp(Type x)           //比x小一点点的浮点数
Math.nextAfter(Type x,Type y) 
    //后面的值比前面大，则取前面值大一点点的浮点数
    //后面的值比前面的值小，则取前面值小一点点的浮点数
```

## BigDecimal

```Java
//(API形参多以double为例)
//1:new实例化对象
BigDecimal(int) 
BigDecimal(double) 
BigDecimal(long) 
BigDecimal(String)

//2:内部静态实例化对象
BigDecimal.valueOf(double)    //给定初值
BigDecimal.ONE                //1.0
BigDecimal.TEN                //10.0
BigDecimal.ZERO               //0.0
add(double)                   //加
subtract(double)              //减
multiply(double)              //乘
divide(double,int,'舍入模式')  //除(取小数点和舍入模式)
setscale(int,'舍入模式')       //格式化小数点
//常用的舍入模式:
//BigDecimal.ROUND_UP          向上取整
//BigDecimal.ROUND_DOWN        向下取整
//BigDecimal.ROUND_HALF_UP     四舍五入
//BigDecimal.ROUND_HALF_DOWN   五舍六入
//BigDecimal.ROUND_FLOOR       负无穷
//BigDecimal.ROUND_CEILING     正无穷
//BigDecimal.ROUND_HALF_EVEN   银行家舍入法
//BigDecimal.ROUND_UNNECESSARY 不需要舍入

equals(double)        //比较值(同时比较精度)
compareTo(double)     //比较值(不比较精度)
max(double)           //取最大值
min(double)           //取最小值
pow(int)              //求幂
abs()                 //求绝对值
movePointLeft(int)    //小数点左移
movePointRight(int)   //小数点右移
negate()              //取反
ulp()                 //返回最后1位位置(如0.00001,可理解为返回精度)

doubleValue()        //转double
longValue()          //转long
intValue()           //转int
byteValue()          //转byte
shortValue()         //转short
toString()           //转String(过长会自动转换成科学计数法)
toPlainString()      //转String(不会自动转换)
```

## NumberFormat

```Java
//1:数值格式化
NumberFormat.getInstance()
NumberFormat.getNumberInstance()        //返回当前默认语言环境的通用数值格式
NumberFormat.getInstance(Locale)
NumberFormat.getNumberInstance(Locale)  //返回指定语言环境的通用数值格式
//常用的静态Locale对象:
//Locale.SIMPLIFIED_CHINESE
//Locale.TRADITIONAL_CHINESE
//Locale.CHINESE
//Locale.CHINA
//Locale.ENGLISH

setMinimumIntegerDigits(int)    //设置数的整数部分所允许的最小位数。
setMaximumIntegerDigits(int)    //设置数的整数部分所允许的最大位数。
setMinimumFractionDigits(int)   //设置最少小数点位数
setMaximumFractionDigits(int)   //设置最多保留小数位数

//2:货币格式化
NumberFormat.getCurrencyInstance()
NumberFormat.getCurrencyInstance(Locale) 

//3:百分比格式化
NumberFormat.getPercentInstance()
NumberFormat.getPercentInstance(Locale)
```

## DecimalFormat

```Java
//1:创建格式化对象
DecimalFormat df=new DecimalFormat(".####");
//表达式写法:
0     //一位数值
#     //任意位数的整数
.#    //整数部分不变,一位小数
.##   //整数部分不变,两位小数
.     //小数点
,     //和0共用,表示逗号

//2:利用传递的表达式格式化数据
double d1=123456.36987;
df.format(d1);
```

# 时间日期

```Java
//格式化和解析的过程均与DateTimeFormatter有关
//1:格式化    时间日期-->字符串
String str=DateTimeFormatter.ISO_DATE.format(LocalDateTime.now());
//2:解析      字符串-->时间日期
TeporalAccessor parse=DateTimeFormatter.ISO_DATE.parse(str);
```

## LocalDateTime

```Java
//1:根据当前时间创建
LocalDateTime ldt=LocalDateTime.now();
//2:指定时间创建
LocalDateTime ldt=LocalDateTime.of(2020,10,8,13,23,43);
getDayOfMonth()        //获取天数
getDayOfWeek()         //获取星期(MONDAY,...)
getDayOfYear()         //获取一年的第几天
getMonth()             //获取月份(JANUARY,...)
getMonthValue()        //获取月份值
getYear()              //获取年份值
getHour()              //获取小时值
getMinute()            //获取分钟值
getSecond()            //获取秒值

LocalDateTime minusXxxs(long)    //在当前时间上,减去指定的年/月/日/时/分/秒
LocalDateTime plusXxxs(long)     //在当前时间上,加上指定的年/月/日/时/分/秒
LocalDateTime withXxx(int)       //在当前时间上,设定指定的年/月/日/时/分/秒
```

## DateTimeFormatter

```Java
//1:指定日期格式
//1-1:自定义格式
DateTimeFormatter dtf=DateTimeFormatter.ofpattern("yyyy-mm-dd hh:mm:ss");
//1-2:内置格式
DateTimeFormatter dtf=DateTimeFormatter.ISO_LOCAL_DATE_TIME;
//BASIC_ISO_DATE        '20111203'
//ISO_LOCAL_DATE        '2011-12-03'
//ISO_OFFSET_DATE       '2011-12-03+01:00'
//ISO_DATE              '2011-12-03+01:00'/'2011-12-03'
//ISO_LOCAL_TIME        '10:15:30'
//ISO_OFFSET_TIME       '10:15:30+01:00'
//ISO_TIME              '10:15:30+01:00'/'10:15:30'
//ISO_LOCAL_DATE_TIME   '2011-12-03T10:15:30'
//ISO_OFFSET_DATE_TIME  '2011-12-03T10:15:30+01:00'
//ISO_ZONED_DATE_TIME   '2011-12-03T10:15:30+01:00[Europe/Paris]'
//ISO_DATE_TIME         '2011-12-03T10:15:30+01:00[Europe/Paris]'
//ISO_ORDINAL_DATE      '2012-337'
//ISO_WEEK_DATE         '2012-W48-6'
//ISO_INSTANT           '2011-12-03T10:15:30Z'
//RFC_1123_DATE_TIME    'Tue, 3 Jun 2008 11:05:30 GMT'

//1-3:本地化格式
DateTimeFormatter dtf=DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT);
//FormatStyle.SHORT    '20-2-11 下午2:26'
//FormatStyle.MEDIUM   '2020-2-11 14:26:21'
//FormatStyle.LONG     '2020年2月11日 下午02时26分21秒'
//FormatStyle.FULL     '2020年2月11日 星期二 下午02时26分21秒 CST'
```

## TestTemporalAdjuster

```Java
LocalDateTime ldt=LocalDateTime.now();
//调用with()的返回值均为LocalDateTime
ldt.with(TemporalAdjusters.firstDayOfMonth());      //本月第一天
ldt.with(TemporalAdjusters.firstDayOfNextMonth());  //下个月第一天
ldt.with(TemporalAdjusters.firstDayOfNextYear());   //明年第一天
ldt.with(TemporalAdjusters.firstDayOfYear());       //今年第一天
ldt.with(TemporalAdjusters.lastDayOfMonth());       //本月最后一天
ldt.with(TemporalAdjusters.lastDayOfYear());        //今年最后一天
ldt.with(TemporalAdjusters.dayOfWeekInMonth(3, DayOfWeek.FRIDAY)); //本月第三周周五
ldt.with(TemporalAdjusters.previous(DayOfWeek.MONDAY));            //上周一
ldt.with(TemporalAdjusters.next(DayOfWeek.SUNDAY));                //下周日
```

## Duration

## Period

- Period：计算两个日期间隔，仅用于LocalDate
- Duration：计算两个时间间隔，仅用于LodalTime

```Java
//1:由时间获取Period和Duration
//1-1:获取Period
Localdate ld1=LocalDate.now();
Localdate ld2=LocalDate.of(2020,5,1);
Period p=Period.between(ld2,ld1);
//1-2:获取Duration
LocalTime lt1=LocalTime.now();
LocalTime lt2=LocalTime.of(13,12,23);
Duration d=Duration.between(lt1,lt2);

//2:间隔数据处理
p.getYears();    //年
p.getMonths();   //月
p.getDays();     //日
d.toHours();     //时
d.toMinutes();   //分
d.toSeconds();   //秒
boolean isNegative()    //检查是否为负(除0)
boolean isZero()        //检查是否为0
//Period和Duration本质上也是时间,也可以进行加减操作
```

# 字符序列

- String：不可变的字符序列
- StringBuffer：可变的字符序列；线程安全，效率低
- StringBuilder：可变的字符序列；线程不安全，效率高

## String

```Java
//1:字面量定义(常量池创建)
String str="abc";
//2:对象定义(常量池+堆均创建对象)
String str=new String("abc);
int length()                                   //返回长度
char charAt(int index)                         //返回指定位置(索引)字符
boolean isEmpty()                              //判断是否为空
String toLowerCase()                           //转换小写
String toUpperCase()                           //转换大写
String trim()                                  //返回字符串副本(忽略开头末尾的空白)
boolean equals(Object obj)                     //比较内容是否相同
boolean equalsIgnoreCase(String anotherString) //比较内容(忽略大小写)
String concat(String str)                      //指定字符串连接到末尾(相当于+)
int compareTo(String anotherString)            //比较字符串大小(ASCii)
String substring(int beginIndex)               //开头指定子串
String substring(int beginIndex,int endIndex)  //指定位置子串(左闭右开区间)
boolean endsWith(String suffix)                //判断是否以指定后缀结束
boolean startsWith(String prefix)              //判断是否以指定前缀开始
boolean startsWith(String prefix,int toffset)  //判断子串是否以指定前缀开始
boolean contains(CharSequence s)          //判断是否包含子串
int indexOf(String str)                   //返回字符串出现第一次的索引
int indexOf(String str,int fromIndex)     //返回子串中字符串出现第一次的索引
int lastIndexOf(String str)               //返回字符串最后一次出现的索引(反向搜索)
int lastIndexOf(String str,int fromIndex) //返回子串中字符串最后一次出现的索引
String replace(char oldChar,char newChar) //用newChar替换串中所有oldChar
String replace(CharSequence target,CharSequence replacement) //替换匹配子串
```

### 字符串拼接

```Java
String s1="abc";
String s2="def"
//1:常量字符串的拼接,在常量池创建,地址均相同
String s3="abcdef";
String s4="abc"+"def";
//2:有变量参加的拼接,在堆空间创建,地址均不相同
String s5=s1+"def";
String s6="abc"+s2;
String s7=s1+s2;
//3:拼接结果调用intern(),相当于在常量池创建(固定地址)
String s8=s5.intern();
//4:调用concat()拼接,相当于在堆空间创建(独立地址)
String s9=s1.concat("def");
//5:将字符串变量改为final型，在拼接时当做常量看待
```

### 数组转换

```Java
//1:字符数组转换
char[] arr=str.toCharArray();    //String转char[]
String str=new String(arr);      //char[]转String

//2:字节数组转换
byte[] arr=str.getBytes("gbk");  //String转byte[](注意指定编码集)
String str=new String(arr);      //byte[]转String
```

## StringBuffer

## StringBuilder

```Java
//除线程是否安全外,两个类的使用方法基本相同:
append(String str)                    //将字符串拼接到字符序列末尾
delete(int start,int end)             //删除指定位置内容(左闭右开区间)
replace(int start,int end,String str) //替换指定位置内容
insert(int offset,String str)         //指定位置插入
reverse()                             //字符序列逆转
setCharAt(int n,char ch)              //改变指定位置单个字符
charAt(int n)                         //查看指定位置字符
toString()                            //转换字符串
length()                              //字符序列的长度
```