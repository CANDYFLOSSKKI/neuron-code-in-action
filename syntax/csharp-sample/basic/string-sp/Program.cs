using System.Globalization;
using System.Text;

namespace basic.string_sp;

public class Program
{
    // 字符串类型(引用类型)
    public void TestString()
    {
        // 1-字符串的常用操作
        // 1-1 字符串的声明和初始化
        // ①String.Format 从一组输入对象生成格式化的字符串
        int num = 12;
        string miscStr = String.Format("Your dog has {0} fleas. " +
                                       "It is time to get a flea collar. " +
                                       "The current universal date is: {1:u}.",
                                        num, DateTime.Now);

        // ②String.Concat 从两个或更多个字符串生成字符串
        string helloStr1 = "Hello";
        string helloStr2 = "World!";
        string helloStr3 = String.Concat(helloStr1, ' ', helloStr2);  // Hello World!

        // ③String.Join 通过合并字符串数组生成字符串
        string[] words = {"Hello", "and", "welcome", "to", "my" , "world!"};
        Console.WriteLine(String.Join(" ", words));  // Hello and welcome to my world!

        // ④String.Insert 通过将一个字符串插入现有字符串的指定索引处生成字符串
        string sentence = "Once a time.";
        Console.WriteLine(sentence.Insert(4, " upon"));  // Once upon a time

        // ⑤String.CopyTo 将一个字符串中的指定字符复制到一个字符数组的指定位置
        string greeting = "Hello World!";
        char[] charArray = {'W','h','e','r','e'};
        greeting.CopyTo(0, charArray,0 ,5);
        Console.WriteLine("New array: {0}", new string(charArray));  // Hello


        // 1-2 字符串的修改和填充
        // ①String.Trim 从字符串的开头和结尾移除空白或者指定的字符
        // ②String.TrimEnd()   / (char) / (char[])  只对字符串结尾处理
        // ③String.TrimStart() / (char) / (char[])  只对字符串开头处理
        string MyString = " My ";
        Console.WriteLine("Hello{0}World!", MyString);    // Hello My World
        string TrimString = MyString.Trim();
        Console.WriteLine("Hello{0}World!", TrimString);  // HelloMyWorld

        // ④String.Remove 从字符串的指定索引位置移除指定数量的字符
        string MyString1 = "Hello Beautiful World!";
        Console.WriteLine(MyString1.Remove(5,10));  // Hello World!

        // ⑤String.Replace 批量替换字符串的子串为指定字符串
        String phrase = "a cold and dark night";
        Console.WriteLine(phrase.Replace("and", ""));  // a cold dark night

        // ⑥String.PadLeft 使用前导字符填充字符串到指定长度
        // ⑦String.PadRight 使用尾随字符填充字符串到指定长度
        string MyString2 = "Hello World!";
        Console.WriteLine(MyString2.PadLeft(15, '-'));   // ---Hello World!
        Console.WriteLine(MyString2.PadRight(15, '-'));  // Hello World!---


        // 1-3 字符串的大小写转换
        // ①String.ToUpper 将字符串中的所有字符转换为大写
        // ②String.ToLower 将字符串中的所有字符转换为小写
        string properString = "Hello World!";
        Console.WriteLine(properString.ToUpper());  // HELLO WORLD!
        Console.WriteLine(properString.ToLower());  // hello world!

        // ③TextInfo.ToTitleCase 将字符串替换为首字母大写
        // (在英语-美国地区语言下,全大写单词会被识别为缩写,不进行转换)
        string[] values = { "a tale of two cities", "gROWL to the rescue",
            "inside the US government", "sports and MLB baseball",
            "The Return of Sherlock Holmes", "UNICEF and children"};
        TextInfo ti = CultureInfo.CurrentCulture.TextInfo;
        foreach (var value in values)
        {
            Console.WriteLine("{0} --> {1}", value, ti.ToTitleCase(value));
        }


        // 1-4 字符串的比较和查找
        // ①String.Compare 比较两个字符串的值,返回一个整数值
        // ②String.CompareOrdinal  不考虑本地区域性的比较
        // ③String.CompareTo       实例方法形式的比较

        // 返回负整数->第一个字符串小
        // 返回正整数->第二个字符串小
        // 返回0->字符串相等
        string str1 = "Hello World";
        string str2 = "Hello World!";
        Console.WriteLine(String.Compare(str1, str2));         // -1
        Console.WriteLine(String.CompareOrdinal(str1, str2));  // -32
        Console.WriteLine(str1.CompareTo(str2));                        // -1

        // ④String.Equals 确定两个字符串是否相同,返回一个布尔值
        // 进行字符串判等时严格使用Equals而不要使用Compare
        // Equals方法既有静态方法形式,又有实例方法形式
        string string1 = "Hello World";
        string string2 = "Hello World";
        Console.WriteLine(string1.Equals("Hello World"));        // True
        Console.WriteLine(String.Equals(string1, string2));  // True

        // ⑤String.StartsWith 确定字符串是否以参数字符串开头,返回一个布尔值
        // ⑥String.EndsWith 确定字符串是否以参数字符串结尾,返回一个布尔值
        string string3 = "Hello World";
        Console.WriteLine(string3.StartsWith("Hello"));  // True
        Console.WriteLine(string3.EndsWith("Hello"));    // False

        // ⑦String.IndexOf 返回字符或字符串的索引位置(从开头检查),返回一个整数值
        // ⑧String.LastIndexOf 返回字符或字符串的索引位置(从结尾检查),返回一个整数值
        string string4 = "Hello World";
        Console.WriteLine(string4.IndexOf('l'));      // 2
        Console.WriteLine(string4.LastIndexOf('l'));  // 9


        // 1-5 字符串的拆分
        // ①String.Split 根据给定的分隔符拆分字符串
        //  ->String.Split()
        //  ->String.Split(char[])
        string s = "You win some. You lose some.";
        string[] subs = s.Split(' ', '.');
        foreach (string sub in subs)
        {
            Console.WriteLine($"Substring: {sub}");  //You->win->some->空->You->lose->some->空
        }

        // 字符串中存在两个分隔符相邻,或分隔符位于字符串两端时,子串中会包含空串,使用可选参数处理
        // 带可选参数的重载形式:
        //  ->String.Split(char[], StringSplitOptions)
        //      StringSplitOptions.RemoveEmptyEntries  省略结果中的空字符串
        //      StringSplitOptions.TrimEntries         对所有子串执行Trim(),删去前后的空白
        string[] subsp = s.Split(s, StringSplitOptions.RemoveEmptyEntries);
        foreach (string sub in subsp)
        {
            Console.WriteLine($"Substring: {sub}");  // You->win->some->You->lose->some
        }

        // ②String.SubString 根据给定的索引值获取特定索引范围内的子串(左闭右开区间)
        // 只给定一个参数x时,索引范围是[x, length)
        // 给定两个参数x,y时,索引范围是[x, x+y)
        string ssub = "genshinimpact";
        Console.WriteLine(ssub.Substring(7));                   // impact
        Console.WriteLine(ssub.Substring(3,7));  // shin


        // 1-6 字符串的连接
        // String.Concat和String.Join本身就可以实现多个子串的连接操作,见1
        // String.Format()可以使用复合格式设置将对象,变量,表达式等非字符串类型值插入字符串中
        // 直接使用 + 和 += 也可以连接子串

        // 通常我们希望字符串能在编译期进行连接,而不是在运行期产生额外的运行开销
        // 因此字符串的连接一般是对两种字符串:①常量字符串;②字符串字面量进行
        string str = null;
        string userName = "<Type your name here>";
        string dateString = DateTime.Today.ToShortDateString();
        str = "Hello " + userName + ". Today is " + dateString + ".";
        str += " How are you today?";
    }

    public void TestString1()
    {
        // 2-StringBuilder
        // 字符串是只读类型,对字符串内容的任何直接改动都会生成新的字符串
        // StringBuilder创建字符串缓冲区,对内部动态字符串内容操作时无需生成新字符串

        // 2-1 StringBuilder的声明和属性
        // StringBuilder提供属性:①Length;②Capacity指定内部动态字符串的最大长度
        // 声明时可传入可选参数设置属性,也可以单独设置这两个属性,可能发生的变化包括:
        //  ①如果设置后Length > Capacity,则自动将Capacity设置为和Length相等
        //  ②如果设置后Length < 内部动态字符串的长度,则截取该字符串至长度和Length相等
        StringBuilder myStb = new StringBuilder("Hello World!", 25);  // max = 25
        myStb.Capacity = 25;    // max = 25
        myStb.Length = 30;      // max = 30

        // 2-2 StringBuilder的操作方法
        // ①StringBuilder.Append 将参数对象追加到当前字符串的末尾
        myStb.Append(" What a beautiful day.");

        // ②StringBuilder.AppendFormat 用带格式文本替换字符串中传递的格式说明符
        int MyInt = 25;
        myStb.AppendFormat("{0:C} ", MyInt);

        // ③StringBuilder.Insert 将参数对象插入到字符串的指定索引处
        myStb.Insert(6,"Beautiful ");

        // ④StringBuilder.Remove 从字符串中删除指定数量的字符(左闭右开区间)
        myStb.Remove(5,7);

        // ⑤StringBuilder.Replace 将字符串中的所有指定字符串替换为其他指定的字符串
        myStb.Replace('!', '?');
    }

    public void TestString2()
    {
        // 3-空字符串和null字符串
        // ①null字符串:空引用对象,不包含实际的string对象实例
        // 除正常参与连接和比较操作外,null字符串的操作通常会抛出异常NullReferenceException

        // ②空字符串:包含零个字符的string对象实例,只能通过String.Empty显式赋值
        // 空字符串和null字符串不相等
        string str = "hello";
        string nullStr = null;             // null字符串
        string emptyStr = String.Empty;    // 空字符串
        string tempStr = str + nullStr;    // hello
        bool b = (emptyStr == nullStr);    // False


        // 4-原始字符串
        // 原始字符串字面量可用于创建多行字符串和需要转义字符表示的字符串
        // 原始字符串的声明有独特的语法规则:
        // ①至少使用3个双引号字符序列"""作为开头和结尾的标识(称左引号和右引号)
        // 如果需要表示的字符串中存在连续n个双引号,则开头和结尾需要使用n+1个双引号标识
        string singleLine = """Friends say "hello" as they pass by.""";

        // ②表示单行字符串时,左引号和右引号位于同一行上
        // 表示多行字符串时,左引号和右引号分别位于多行字符串的上方和下方(默认删除右引号左侧的空白字符)
        string multiLine = """
                           "Hello World!" is typically the first program someone writes.
                           """;
        string rawStringLiteralDelimiter = """"
                                           Raw string literals are delimited
                                           by a string of at least three double quotes,
                                           like this: """
                                           """";


        // 5-逐字字符串
        // 逐字字符串以@开头标识字符串,逐字字符串禁用大部分的转义序列
        // 逐字字符串内部的换行符,反斜杠和双引号(""仍会被转义为双引号")等字符会按照原义输出
        string file1 = @"c:\documents\files\u0066.txt";
        string file2 = "c:\\documents\\files\\u0066.txt";
        Console.WriteLine(file1);  // c:\documents\files\u0066.txt
        Console.WriteLine(file2);  // c:\documents\files\u0066.txt

        // 逐字字符串可以配合关键字使用,@<关键字>不具有关键字特性,可作为变量名正常使用
        string[] @for = { "John", "James", "Joan", "Jamie" };
        for (int ctr = 0; ctr < @for.Length; ctr++)
        {
            Console.WriteLine($"Here is your gift, {@for[ctr]}!");
        }


        // 6-内插字符串
        // 内插字符串以$开头标识字符串,可以使用大括号{...}插入返回任意类型的内插表达式
        // 内插字符串解析时,依次调用各个内插表达式返回值的ToString()方法输出到结果字符串中
        var name = "ME";
        Console.WriteLine($"Hello, {name}. It's a pleasure to meet you!");

        // 内插字符串的典型格式:
        // {<内插表达式>[,<alignment>][:<formatString>]}
        // ①alignment:常数表达式,控制字段宽度和对齐方式.绝对值=最小字段宽度;正数右对齐;负数左对齐
        // ②formatString:格式字符串,控制字符串格式
        var inventory = new Dictionary<string, int>()
        {
            ["hammer, ball pein"] = 18,
            ["hammer, cross pein"] = 5,
            ["screwdriver, Phillips #2"] = 14
        };
        Console.WriteLine($"Inventory on {DateTime.Now:d}");
        Console.WriteLine(" ");
        Console.WriteLine($"|{"Item",-25}|{"Quantity",10}|");
        foreach (var itm in inventory)
            Console.WriteLine($"|{itm.Key,-25}|{itm.Value,10}|");
        // Inventory on 08/11/2023
        //
        // |Item                     |  Quantity|
        // |hammer, ball pein        |        18|
        // |hammer, cross pein       |         5|
        // |screwdriver, Phillips #2 |        14|

        // 内插表达式的特殊情况:
        // ①内插表达式外的字符串字面量中包含大括号{}时,需要转义成{{}}
        // ②内插表达式中包含带冒号的表达式时（如三元判断?a:b），该表达式需要包含在括号()中
        int age = 34;
        Console.WriteLine($"He didn't wait for a reply :-{{");
        // He didn't wait for a reply :-{
        Console.WriteLine($"He is {age} year{(age == 1 ? "" : "s")} old.");
        // He is 34 years old.
    }
}
