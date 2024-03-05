using System.Data;

namespace advanced.linq_sp.expression;

public class Program
{
    // 语言集成查询LINQ-表达式
    public void TestLINQ()
    {
        // 1-查询变量
        // LINQ表达式是查询变量,查询变量只保存查询操作而不保存查询结果
        // LINQ是延迟加载的,仅当访问查询数据时才会加载元素

        // LINQ查询的数据源可以是实现迭代器接口IEnumerable/IEnumerable<T>的任何类型
        // 查询变量的声明类型取决于查询表达式的具体格式:
        //  ①使用select查询时,查询变量的声明类型多为:IEnumerable<T>/IQueryable<T>
        //  ②使用group查询时,查询变量的声明类型多为:IEnumerable<IGrouping<A,B>>
        List<City> cities = new();
        List<Student> students = new();
        IEnumerable<City> queryCities =
            from city in cities
            where city.Population > 100000
            select city;
        IEnumerable<IGrouping<char, Student>> queryGroupStudents =
            from student in students
            group student by student.Last[0];


        // 2-查询起始子句from
        // 查询表达式必须以from开头,from指明查询的数据源和范围变量
        // 范围变量指代数据源遍历时的单个连续元素:
        //  ①当数据源实现泛型的迭代器时,范围变量的类型是确定的
        //  ②当数据源实现非泛型的迭代器时,范围变量为默认类型object,需要显式转换
        List<Country> countries = new();
        IEnumerable<Country> countryAreaQuery =
            from country in countries
            where country.Area > 500000
            select country;

        // 查询表达式允许声明多个from子句从多个数据源中查询数据
        // 声明顺序靠后的from子句可以使用靠前from子句中的范围变量,查询子结构中的数据
        IEnumerable<City> cityQuery =
            from country in countries
            from city in country.Cities    // 获取范围变量country中的Cities属性
            where city.Population > 10000
            select city;


        // 3-查询结束子句
        // 3-1 分组查询子句group
        // group子句使用by关键字提取所有数据元素均包含的键值key,按键值key对数据元素分组
        // 分组查询的查询结果是嵌套的双层集合:
        //  ->外层集合:元素类型为IGrouping<K,V>,元素数量是数据元素中不同键值key的数量
        //  ->内层集合:元素类型为group的范围变量
        var queryCountryGroups =
            from country in countries
            group country by country.Name[0];
        // 外层为group键值相同的元素组成的集合
        foreach(IGrouping<char, Country> countryGroup in queryCountryGroups)
        {
            // 内层为group的范围变量(和from相同,取Country)组成的集合
            foreach(Country country in countryGroup)
            {
                Console.WriteLine(country.Name);
            }
        }

        // 3-2 投影查询子句select
        // select子句可以选择范围变量整体或部分字段,组成查询结果的数据元素
        // 使用整个范围变量时直接用范围变量接收查询结果;使用部分字段时接收查询结果:
        // ①select子句内部显式指定类型
        List<Person> dataSource = new();
        IEnumerable<Person> query1 =
            from a in dataSource
            select new Person { Name = a.Name, Age = a.Age };

        // ②查询变量外部构造元组
        var query2 =
            from a in dataSource
            select (a.Name, a.Age);
        List<(string Name, int Age)> results = query2.ToList();

        // ③select子句内部实例化匿名对象
        var query3 =
            from a in dataSource
            select new { a.Name, a.Age };
        var results3 = query3.ToList();

        // 3-3 嵌套查询子句into
        // into子句使用在group/select之后,用于封装查询结果,作为新查询表达式中的范围变量参与后续查询
        // 使用into子句标记的查询表达式和from子句等效
        var percentileQuery =
            from country in countries
            let percentile = (int)country.Population / 10_000_000
            group country by percentile
            into countryGroup
        // 封装新范围变量countryGroup,继续后续的查询=>
            where countryGroup.Key >= 20
            orderby countryGroup.Key
            select countryGroup;
    }


    public void TestLINQ2()
    {
        // 4-数据筛选子句where
        // where子句用于从数据源中筛选元素
        // where子句可以包含范围变量及其子结构的谓词表达式的逻辑组合
        List<City> cities = new();
        IEnumerable<City> queryCityPop =
            from city in cities
            where city.Population is < 200000 and > 100000
            select city;


        // 5-数据排序子句orderby
        // orderby子句用于对查询结果中的数据元素进行排序
        // 排序指定的字段按照声明的顺序,优先级依次递减,优先级更高的字段值相同时才会执行次要排序
        // orderby子句中还可指定排序的升序和降序:
        //  ①asceding升序排序(默认)
        //  ②descending降序排序
        List<Country> countries = new();
        IEnumerable<Country> querySortedCountries =
            from country in countries
            orderby country.Area, country.Population descending
            select country;


        // 6-数据连接子句join
        // join子句用于执行同等连接,关联不同数据源中的数据元素
        // join子句需要两个提供范围变量的数据源,使用equals关键字进行字段间的同等连接
        // (join连接的比较是按字段值比较而非按引用比较,且null和null不相等)
        //      from <范围变量A> in <数据源A>
        //      join <范围变量B> in <数据源B> on <字段A> equals <字段B> ...

        // 6-1 内部关联
        // 内部关联返回两个数据源中都存在的匹配项,数据源中没有匹配项的元素将被忽略
        // 内部关联适用于1对1关联,出现1对n关联时会输出多行,其中"1"的元素在这些行中多次出现
        List<TableA> tableA = new();
        List<TableB> tableB = new();
        var query =
            from a in tableA
            join b in tableB on a.Value equals b.Value
            select new { TableA = a, TableB = b };
//        +---------+        +---------+
//        | Table A |        | Table B |
//        +---------+        +---------+
//        |   A1  1 |        |   B1  1 |
//        |   A2  2 |        |   B3  5 |
//        |   A3  3 |        |   B4  6 |
//        |   A4  4 |        |   B6  4 |
//        +---------+        +---------+
//        +-------+-------+
//        | TableA| TableB|
//        +-------+-------+
//        |   A1  |   B1  |
//        |   A4  |   B6  |
//        +-------+-------+

        // 6-2 分组关联
        // 分组关联返回两个数据源中都存在的匹配项
        // 分组关联的表达式需要使用into关键字,将匹配的多个元素封装为范围变量
        // 处理1对n关联时,分组关联只会输出单行数据,匹配的多个元素以组{}的形式输出
        List<TableStudent> students = new();
        List<TableCourse> courses = new();
        var query1 =
            from student in students
            // 将符合特征的课程名提取到courseGroup中
            join course in courses on student.Id equals course.StudentId into courseGroup
            select new { student.Name, Courses = courseGroup.ToList() };
//             students                 courses
//        +------+---------+       +-------+--------+
//        | Id   | Name    |       | Id    | Course |
//        +------+---------+       +-------+--------+
//        | 1    | Alice   |       | 101   | Math   |
//        | 2    | Bob     |       | 102   | Science|
//        | 3    | Charlie |       | 103   | English|
//        | 4    | Alice   |       | 104   | History|
//        | 5    | Charlie |       | 105   | Physics|
//        +------+---------+       +-------+--------+
//        +---------+--------------------+
//        | Name    | Courses            |
//        +---------+--------------------+
//        | Alice   | { Math, History }  |
//        | Bob     | { Science }        |
//        | Charlie | { English, Physics}|
//        +---------+--------------------+

        // 6-3 外部关联
        // 外部关联分为左外部关联和右外部关联,通常采用左外部关联的形式(以from数据源为主)
        // from数据源中每个元素至少在查询结果中出现一次,元素无匹配项时设置匹配字段为空,元素有多个匹配项时出现多次

        // 外部关联的特征是表达式中into语句用于标识连接结果,可以继续对连接结果生成范围变量
        // 外部关联中最上方的from子句查询变量和into后续的查询变量可以共存
        List<TableCustomer> customers = new();
        List<TableOrder> orders = new();
        var query2 =
            from customer in customers
            join order in orders on customer.Id equals order.CustomerId into orderGroup
            // 对Order表连接的Id再次遍历,实现主表1对多时输出多行数据的效果
            from order in orderGroup.DefaultIfEmpty()
            select new { customer.Name, OrderId = (order == null ? "N/A" : order.Id.ToString()) };
//           customers                    orders
//       +------+---------+       +-------+------------+
//       | Id   | Name    |       | Id    | CustomerId |
//       +------+---------+       +-------+------------+
//       | 1    | Alice   |       | 101   | 1          |
//       | 2    | Bob     |       | 102   | 2          |
//       | 3    | Charlie |       | 103   | 1          |
//       | 4    | David   |       | 104   | 3          |
//       +------+---------+       +-------+------------+
//       +---------+---------+
//       | Name    | OrderId |
//       +---------+---------+
//       | Alice   | 101     |
//       | Alice   | 103     |
//       | Bob     | 102     |
//       | Charlie | N/A     |
//       | David   | 104     |
//       +---------+---------+
    }
}

public class City
{
    public int Population { get; set; }
}

public class Student
{
    public string Last { get; set; }
}

public class Country
{
    public string Name { get; set; }
    public int Area { get; set; }
    public List<City> Cities { get; set; }
    public int Population { get; set; }
}

public class Person
{
    public string Name { get; set; }
    public int Age { get; set;}
}

public class TableA
{
    public string Name { get; set; }
    public int Value { get; set; }
}
public class TableB
{
    public string Name { get; set; }
    public int Value { get; set; }
}

public class TableStudent
{
    public string Id { get; set; }
    public string Name { get; set; }
}

public class TableCourse
{
    public string StudentId { get; set; }
    public string Name { get; set; }
}

public class TableCustomer
{
    public string Id { get; set; }
    public string Name { get; set; }
}

public class TableOrder
{
    public string Id { get; set; }
    public string CustomerId { get; set; }
}
