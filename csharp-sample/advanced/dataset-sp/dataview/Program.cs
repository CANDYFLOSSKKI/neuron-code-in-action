using System.Data;

namespace advanced.dataset_sp.dataview;

public class Program
{
    // 数据视图

    // 1-数据视图的实例化
    // 数据视图DataView是针对单个DataTable的动态排序,筛选和投影,在DataTable基础上实例化
    public DataTable table = new DataTable();
    public void TestDataViewInstance()
    {
        // ①引用DataTable的默认数据视图属性DefaultView
        DataView custDataView = table.DefaultView;

        // ②DataView构造函数
        // public DataView(DataTable)
        // public DataView(DataTable, String, String, DataViewRowState)
        DataView custDataViewA = new DataView(table);

        // DataView还提供三个可选参数的构造函数重载,分别对应:
        // ①条件查询RowFilter
        // ②排序查询Sort
        // ③行版本筛选RowStateFilter
    }


    // 2-数据视图的筛选和排序
    public virtual string? RowFilter { get; set; }        // 条件查询
    public string Sort { get; set; }                      // 排序查询
    public DataViewRowState RowStateFilter { get; set; }  // 行版本筛选

    // 2-1 条件查询RowFilter
    // RowFilter属性保存字符串表达式形式的筛选条件,表达式语法和SQL条件子句类似
    // 目标列名不包含特殊字符时,表达式中可以直接使用列名
    // 目标列名包括特殊字符时,表达式中需要用中括号[]包裹列名(某些情况还可能需要转义中括号)
    public void TestRowFilter()
    {
        DataView dataView = table.DefaultView;
        dataView.RowFilter = "id = 10";       //列名为 id
        dataView.RowFilter = "$id = 10";      //列名为 $id
        dataView.RowFilter = "[#id] = 10";    //列名为 #id
    }

    // 2-2 排序查询Sort
    // Sort属性保存字符串表达式形式的排序条件,表达式语法和SQL排序子句类似
    // 列名+ASC/DESC指定对列值升序/降序的排序条件(默认为ASC升序排序),可以逗号分隔设置多个条件
    // 当Sort为空且DataTable定义了主键时,可以设置ApplyDefaultSort = true,数据视图会按主键值升序排序
    public void TestSort()
    {
        DataView dataView = table.DefaultView;
        dataView.Sort = "id ASC, age DESC";  // 主条件id升序,副条件age降序

        // 设置Sort为空可以转而设置ApplyDefaultSort属性实现主键升序排序
        // bool ApplyDefaultSort { get; set; }
        dataView.Sort = "";
        dataView.ApplyDefaultSort = true;
    }

    // 2-3 行版本指定RowStateFilter
    // RowStateFilter属性保存选项组合枚举DataViewRowState,用于指定特定的行版本数据
    // DataViewRowState相比DataRowState提供更多行状态筛选选项,可以通过位运算组合多个选项取并集

    // DataViewRowState.None               0    无筛选条件
    // DataViewRowState.Unchanged          2    所有Unchanged行的Current行版本
    // DataViewRowState.Added              4    (已添加)所有Added行的Current行版本
    // DataViewRowState.Deleted            8    (已删除)所有Deleted行的Original行版本
    // DataViewRowState.ModifiedCurrent   16    所有Modified行的Current行版本
    // DataViewRowState.ModifiedOriginal  32    所有Modified行的Original行版本
    // DataViewRowState.CurrentRows       22    16+4+2 (默认值)所有Modified/Added/Unchanged行的Current行版本
    // DataViewRowState.OriginalRows      42    32+8+2 所有Modified/Deleted/Unchanged行的Original行版本
    public void TestRowStateFilter()
    {
        DataView prodView = new DataView(table,
            "UnitsInStock <= ReorderLevel",
            "SupplierID, ProductName",
            DataViewRowState.CurrentRows);
    }


    // 3-数据视图的检索方法
    // DataView不包含集合属性,直接通过整数索引器访问数据视图的行视图DataRowView
    // (DataView获取的DataRowView具体值取决于RowStateFilter属性指定的行版本)

    // DataRowView可以通过属性Row获取到关联的DataRow对象
    // DataRowView可以通过整数索引和列名索引获取指定列的值
    public void TestDataRowView()
    {
        DataView dataView = table.DefaultView;
        foreach(DataRowView rowView in dataView)  // ①获取行视图DataRowView
        {
            DataRow rowData = rowView.Row;        // ②获取行数据DataRow
            Console.WriteLine(rowView[0]);        // ③获取列数据DataRowView[]
            Console.WriteLine(rowView["name"]);
        }
    }

    // DataView也支持定向查找满足要求的行视图而不是遍历查找
    // Find()和FindRows()调用前都需要DataView显式设置排序属性Sort,参数匹配排序字段:
    // ①int Find (object? key)
    // ②int Find (object?[] key)
    // ③DataRowView[] FindRows (object? key)
    // ④DataRowView[] FindRows (object?[] key)


    // 4-数据视图的增删改方法
    // DataView可以把数据视图上的增删改结果映射到关联的DataTable上
    // 增删改三种操作的映射许可,分别通过三个标志位属性设置(默认都为true):
    public void TestDataViewCRUD()
    {
        DataSet set = new DataSet();
        DataTable custTable = set.Tables["Customers"];
        DataView custView = custTable.DefaultView;

        // ①AllowNew -> 新增操作
        // AllowNew为true时,允许调用DataView的AddNew()新增行
        // AddNew()不接收参数而返回新增行的DataRowView,对其进行列值的设置
        // AddNew()隐式开启事务,初始化后需要显式关闭事务保存更改,行状态改为Added
        DataRowView newDRV = custView.AddNew();   // 新增行
        newDRV["CustomerID"] = "ABCDE";           // 行数据初始化
        newDRV["CompanyName"] = "ABC Products";
        newDRV.EndEdit();                         // 显式关闭事务,保存行数据

        // ②AllowDelete -> 删除操作
        // AllowDelete为true时,允许调用DataRowView的Delete()删除行数据
        // 删除操作立即生效,将DataTable中该行的行状态设置为Deleted

        // ③AllowEdit -> 更新操作
        // AllowEdit为true时,允许调用DataRowView索引器的set访问器修改行数据
        // set访问器隐式开启事务,修改后需要显式关闭事务保存更改,行状态改为Modified
        custView.Sort = "CompanyName";
        DataRowView updDRV = custView.FindRows("MC")[0];  // 获取待修改行
        updDRV["CustomerID"] = "JJQQK";                       // 访问器修改行数据
        updDRV.EndEdit();                                     // 显式关闭事务,保存行数据
    }


    // 5-子视图
    // 子视图是建立在外键约束上的视图,父表中某行的子视图是子表中所有对应行的集合
    // 在父表的DataRowView上调用CreateChildView()可以创建该行对应的子视图
    // (传递参数表关系或表关系名均可,布尔值followParent表示子视图是否和父视图保持同步)
    // DataView CreateChildView (DataRelation);
    // DataView CreateChildView (string);
    // DataView CreateChildView (DataRelation, bool);
    // DataView CreateChildView (string, bool);
    public void TestChildView()
    {
        DataSet catDS = new DataSet();
        DataTable catTable = catDS.Tables["Categories"];  // 父表(外键主键)
        DataTable prodTable = catDS.Tables["Products"];   // 子表
        DataRelation relation = catDS.Relations.Add("CatProdRel",
            catTable.Columns["CategoryID"],
              prodTable.Columns["CategoryID"]);
        // 获取父表的数据视图
        DataView catView = new DataView(catTable, "", "CategoryName",
            DataViewRowState.CurrentRows);
        // 获取父表数据视图指定行的子视图
        DataView prodView = catView[1].CreateChildView(relation);
    }
}
