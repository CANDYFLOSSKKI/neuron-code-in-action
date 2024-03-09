namespace advanced.linq_sp.advanced;

public class Program
{
    // 语言集成查询LINQ-拓展用法
    public void TestLINQ()
    {
        // 1-范围变量子句let
        // let子句可以在查询表达式之间使用,生成基于数据元素的范围变量
        // let子句通常用于存储表达式和方法调用(对from的范围变量进行处理)
        string[] names = { "Svetlana Omelchenko", "Claire O'Donnell", "Sven Mortensen", "Cesar Garcia" };
        IEnumerable<string> queryFirstNames =
            from name in names
            let firstName = name.Split(' ')[0]
            select firstName;


        // 2-嵌套子查询
        // 子查询可实现嵌套查询的复杂功能,子查询通常使用在如下位置:
        //  ①where子句中的条件表达式中使用子查询,用于筛选数据
        //  ②select子句中的投影表达式中使用子查询,用于计算/聚合/选取数据
        //  ③orderby子句中的排序表达式中使用子查询,用于计算用于排序的键值key
        //  ④join子句中的关联条件中使用子查询,用于构造同等关联条件
        //  ⑤from子句中的数据源使用子查询,用于预先对数据源作处理(范围变量不能使用子查询)
        List<Item> source = new();
        List<SubItem> subSource = new();
        var query =
            from item in source
            select new
            {
                Item = item,
                // 对Item表中的每行数据,统计SubItem表中有多少特定列值相等的
                SubItemCount = (from subitem in subSource
                        where subitem.SomeProperty == item.Property
                        select subitem
                    ).Count()
            };


        // 3-动态谓词筛选
        // 动态谓词筛选指判断数据元素的字段值是否在静态数据列表中
        // 在where子句中调用静态数据列表的Contains(),传入范围变量的字段参数即可实现筛选操作
        // Contains()会检索每个目标字段实现筛选效果,不需要为静态数据列表中的每个值分别编写where子句
        List<Student> students = new();
        int[] ids = { 111, 114, 112 };   // 静态数据列表
        var queryNames =
            from student in students
            // Contains()判断ID是否在ids列表中
            where ids.Contains(student.ID)
            select new
            {
                student.Name,
                student.ID
            };


        // 4-组合键
        // 如果连接操作的判断条件需要更多字段,可以将多个字段整体作为关联条件组成组合键
        // 组合键可以通过匿名对象new{}生成,也可以通过元组()生成
        // equals关键字两端的组合键要求每个位置上的字段定义的位置和字段名都相同(同元组比较的条件)
        List<Student> students1 = new();
        List<Grade> grades = new();
        var query1 =
            from student in students1
            join grade in grades on
                // 强制要求两个表组合键字段都是StudentID和ClassID
                new { student.StudentID, student.ClassID } equals
                new { grade.StudentID, grade.ClassID }
            group grade by new { student.StudentID, student.Name, grade.ClassID }
            into g
            select new
            {
                StudentID = g.Key.StudentID,
                Name = g.Key.Name,
                CourseID = g.Key.ClassID,
                MaxScore = g.Max(x => x.Score)
            };
//                   students                                     courses
//       +-----------+---------+---------+           +-----------+----------+-------+
//       | StudentID | ClassID | Name    |           | StudentID | ClassID  | Score |
//       +-----------+---------+---------+           +-----------+----------+-------+
//       | 1         | 1       | Alice   |           | 1         | 1        | 85    |
//       +-----------+---------+---------+           +-----------+----------+-------+
//       | 2         | 1       | Bob     |           | 1         | 2        | 92    |
//       +-----------+---------+---------+           +-----------+----------+-------+
//       | 3         | 2       | Charlie |           | 2         | 1        | 78    |
//       +-----------+---------+---------+           +-----------+----------+-------+
//                                                   | 2         | 2        | 89    |
//                                                   +-----------+----------+-------+
//                                                   | 3         | 1        | 90    |
//                                                   +-----------+----------+-------+
//                                                   | 3         | 2        | 95    |
//                                                   +-----------+----------+-------+
//       +-----------+---------+----------+----------+
//       | StudentID | Name    | ClassID  | MaxScore |
//       +-----------+---------+----------+----------+
//       | 1         | Alice   | 1        | 85       |
//       +-----------+---------+----------+----------+
//       | 2         | Bob     | 1        | 78       |
//       +-----------+---------+----------+----------+
//       | 3         | Charlie | 2        | 95       |
//       +-----------+-------+------------+----------+


        // 5-查询变量动态数据源
        // 直接实例化的查询变量在from子句只可调用作用域下已有的数据源对象
        List<int> ints = new();
        IEnumerable<string> returnQ = from i in ints
            where i < 4
            select i.ToString();

        // 将查询变量的构造封装为out参数的方法,即可为不同的给定数据源快速生成对应的查询变量
        // 封装后返回的仍然是查询变量而非查询结果,仅当方法返回具体的集合类实例时才对应查询结果
        void QueryMethod2(int[] ints, out IEnumerable<string> returnQ) =>
            // 查询变量作为out形式的返回值,数据源可使用形参(指定类型即可)
            returnQ =
                from i in ints
                where i < 4
                select i.ToString();
    }


    // 6-基于链式函数调用的查询
    // 调用System.Linq命名空间下的方法,可以构造链式函数实现表达式相同的效果(等价)
    // 和表达式逻辑不同的是,任意方法都会返回查询变量(相当于隐式构造查询表达式)而不需要显式结束
    // 函数查询只需要按照目标数据需求调用方法,select/group不再作为查询表达式结束的标志,可用于修改数据元素的格式
    public void TestFunctionLINQ()
    {
        IEnumerable<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
        //①基于表达式的查询
        var queryBaseExp =
            from number in numbers
            where number % 2 == 0
            orderby number descending
            select number * 2;

        //②基于链式函数的查询
        var queryBaseMethod = numbers
            .Where(x => x % 2 == 0)
            .OrderByDescending(x => x)
            .Select(x => x * 2);
    }

    // 链式函数的查询通常和集合类配合使用,相当于对集合的批量操作:
    // ①在实现了IEnumerable<T>迭代器接口的集合类对象上调用查询方法,获取查询变量
    // ②通过查询变量获取IEnumerable<T>类型的查询结果
    // ③查询结果作为实参,传入原集合类的构造函数中,生成新的集合
    public void TestLINQAndCollection()
    {
        List<Student> list = new();
        // 查询变量传入构造函数,生成批量操作后的集合
        list = new List<Student>(list
            .Where(x => x.ID > 2)
            .Select(x => x)
        );
    }
}
public class Item
{
    public int Property { get; set; }
}

public class SubItem
{
    public int SomeProperty { get; set; }
}

public class Student
{
    public int ID { get; set; }
    public int StudentID { get; set; }

    public int ClassID { get; set; }
    public string Name { get; set; }
}

public class Grade
{
    public int StudentID { get; set; }
    public int ClassID { get; set; }
    public int Score { get; set; }
}
