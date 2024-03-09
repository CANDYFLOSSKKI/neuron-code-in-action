using System.Data;

namespace advanced.dataset_sp.datatable;

public class Program
{
    // 数据表和表关系

    // 1-数据表的实例化
    // 数据表可以通过构造函数实例化,也可通过数据集Tables集合属性的Add()返回
    // 使用构造函数实例化时,表名TableName可以先不赋值,此时表名保留为空
    // 使用Add()实例化时,表名TableName不赋值会设为默认值TableN(N从0到n递增)
    public void TestDataTable()
    {
        // ①构造函数实例化
        DataTable workTable = new DataTable("Customers");

        // ②数据集Add()实例化
        DataSet customers = new DataSet();
        DataTable customersTable = customers.Tables.Add("Customers");
    }


    // 2-数据表的架构设计
    // 数据表的架构由列DataColumn和约束Constraints组成,数据由行DataRow组成
    // 数据表提供三个集合属性分别存储列,行和约束,还提供DataSet属性获取该表所属的数据集
    public DataColumnCollection Columns { get; }      // 列集合
    public DataRowCollection Rows { get; }            // 行集合
    public ConstraintCollection Constraints { get; }  // 约束集合
    public DataSet? DataSet { get; }                  // 所属数据集

    // Columns属性的Add()可以实现列的添加和DataColumn的实例化
    public interface IDataTableColumnsAddUtilFunc
    {
        // ①指定列名和数据类型
        public DataColumn Add(string? columnName, Type dataType);

        // ②指定列名,数据类型和表达式
        // 含表达式参数的列称为表达式列,表达式列是引用其他列值的计算属性
        public DataColumn Add(string? columnName, Type dataType, string? expr);
    }


    // 3-数据表的列约束
    // 3-1 属性约束
    public bool ReadOnly { get; set; }           // 只读(不允许修改)
    public bool Unique { get; set; }             // 唯一约束
    public bool AllowDBNull { get; set; }        // 允许null空值
    public object DefaultValue { get; set; }     // 默认值

    public bool AutoIncrement { get; set; }      // 自增策略(需额外设置两个属性)
    public long AutoIncrementSeed { get; set; }  // 自增起始值
    public long AutoIncrementStep { get; set; }  // 自增增量

    public void TestConstraint()
    {
        DataSet set = new DataSet();
        DataTable table = set.Tables.Add("table");
        // 3-2 主键约束PrimaryKey
        // 主键通过DataTable的PrimaryKey属性设置,传递列的数组DataColumn[]作为参数
        // 主键只有一列时,数据表会设置该列的AllowDBNull = false,Unique = true
        // 主键有多列时,仅设置这些列的AllowDBNull = false,只要主键列不是完全相同就可以
        table.PrimaryKey = new DataColumn[]
        {
            table.Columns["CustLName"],
            table.Columns["CustFName"]
        };

        DataColumn[] keyColumn = new DataColumn[2];
        keyColumn[0] = table.Columns["CustLName"];
        keyColumn[1] = table.Columns["CustFName"];
        table.PrimaryKey = keyColumn;

        // 3-3 外键约束ForeignConstraint
        // 外键通过ForeignConstraint创建,实例化传递三个参数:①外键名;②子表外键列;③父表外键列
        // 外键添加时调用DataTable的Constraints属性的Add()传递约束类实参

        // 外键约束的要求:
        // ①父表的每一行在子表中都有至少一个对应行
        // ②子表的每一行在父表中都有唯一对应行
        // 外键约束创建时不会进行检查,表中数据发生变化时才会检查变动的数据部分
        ForeignKeyConstraint custFK = new ForeignKeyConstraint(
            "CustOrderFK",
            set.Tables["CustTable"].Columns["CustomerID"],
            set.Tables["OrdersTable"].Columns["CustomerID"]
        );
        table.Constraints.Add(custFK);

        // 父表中的主键发生删除和更新时,子表外键可能需要执行删除/更新行为来维持外键生效
        // 外键提供删除行为DeleteRule和更新行为UpdateRule两个属性,可以分别设置:
        // ①Rule.Cascade     父表的外键删除/更新时,对子表中受影响的外键也删除/更新
        // ②Rule.SetNull     父表的外键删除/更新时,将子表中受影响的外键设为DBNull
        // ③Rule.SetDefault  父表的外键删除/更新时,将子表中受影响的外键设为默认值
        // ④Rule.None        (默认值)不对子表执行任何操作

        // 数据表中行数据的修改需要显式调用AcceptChange()或RejectChange()才能保存
        // 删除/更新行为生效时,修改父表的外键时删除/更新行为会立即生效,使父表和子表都处于未保存状态
        // 外键设置AcceptRejectRule属性,可以在父表调用AcceptChanges()保存状态时子表也自动保存
        // ①AcceptRejectRule.Cascade    父表保存/丢弃更改时,子表也保存/丢弃更改
        // ②AcceptRejectRule.None       (默认值)不对子表执行任何操作
        DataColumn parentColumn = set.Tables["pt"].Columns["ID"];
        DataColumn childColumn = set.Tables["ct"].Columns["ptID"];
        var foreignKeyConstraint = new ForeignKeyConstraint
            ("SupplierForeignKeyConstraint", parentColumn, childColumn);
        // 外键约束添加删除/更新行为和自动保存
        foreignKeyConstraint.DeleteRule = Rule.SetNull;
        foreignKeyConstraint.UpdateRule = Rule.Cascade;
        foreignKeyConstraint.AcceptRejectRule = AcceptRejectRule.None;
        set.Tables["ct"].Constraints.Add(foreignKeyConstraint);

        // 3-4 唯一约束UniqueConstraint
        // 唯一约束通过UniqueConstraint创建,实例化时传递数据列数组(表示批量操作)
        UniqueConstraint custUnique = new UniqueConstraint(
            new DataColumn[]
            {
                table.Columns["CustomerID"],
                table.Columns["CompanyName"]
            });
        set.Tables["Customers"].Constraints.Add(custUnique);
    }


    // 4-行状态和行版本
    // 4-1 行状态DataRowState
    // DataRow提供行状态属性RowState,用于标识行的当前状态
    // ①DataRowState.Unchanged   该行没有发生更改
    // ②DataRowState.Added       该行已添加进表中
    // ③DataRowState.Modified    该行元素发生更改
    // ④DataRowState.Deleted     该行已从表中删除
    // ⑤DataRowState.Detached    该行不属于任何表

    // 不同操作行状态的变化:
    // DataRow实例化 -> Detached
    // DataRow被Add()添加进表 -> Added
    // 表中的DataRow发生更改 -> Modified
    // 表中的DataRow被删除 -> Deleted
    // AcceptChanged()保存修改 -> Unchanged(原Deleted则转为Detached)

    // 4-2 行版本DataRowVersion
    // DataTable内部维护行数据的不同版本,DataRowVersion用于标识不同版本
    // ①DataRowVersion.Current   行的当前值版本
    // ②DataRowVersion.Default   行的默认行版本
    // ③DataRowVersion.Original  行的原始值版本
    // ④DataRowVersion.Proposed  行的建议值版本

    // 行状态和行版本的关系:
    // 行状态为Added的新增行不存在Original版本
    // 行状态为Deleted的删除行不存在Current版本
    // Added/Modified/Default行状态的默认行版本为Current版本
    // Detached行不存在行状态的变动,也不具有任何行版本
    public void TestRowState()
    {
        DataTable studentTable = new DataTable("Student");
        studentTable.Columns.Add("ID", typeof(int));
        studentTable.Columns.Add("Name", typeof(string));
        studentTable.Columns.Add("Grade", typeof(string));
        studentTable.Rows.Add(1, "John", "A");
        DataRow row = studentTable.Rows[0];
        row["Name"] = "Jonathan";
        // ①通过DataRow获取行版本:索引器传递列名和行版本
        // row[ColumnName, DataRowVersion]
        var name = row["Name", DataRowVersion.Original];

        // ②通过DataTable获取行版本:GetChanges()传递行状态
        // DataTable GetChanges(DataRowVersion);
        var table = studentTable.GetChanges(DataRowState.Added);
    }


    // 5-数据表的增删改操作
    public DataTable workTable = new DataTable();
    public void TestTableChange()
    {
        // 5-1 新增行数据
        // 向数据表添加行数据使用DataTable的行集合Rows的Add()添加
        // DataRow实参可以在外部显式创建,也可以提供匿名对象(运行时类型化为Object)
        DataRow workRow = workTable.NewRow();
        workRow["CustLName"] = "Smith";
        workTable.Rows.Add(workRow);
        workTable.Rows.Add(new Object[] { 1, "Smith" });

        // 5-2 删除行数据
        // ①调用DataTable行集合Rows的Remove():直接从表中删除该行
        workTable.Rows.Remove(workRow);

        // ②调用DataRow的Delete():仅改变内部行状态属性RowState
        workRow.Delete();

        // 5-3 修改行数据
        // 修改行数据可以使用索引器的set访问器修改,也可以使用DataRow的事务式修改:
        // ①DataRow调用BeginEdit()开始对该行数据的修改事务,同时创建Proposed版本
        // ②在事务期间,对该行数据的修改都是在Proposed行版本上生效
        // ②DataRow调用EndEdit()保存更改,保存Proposed版本到Current版本并将行状态设为Unchanged
        workRow.BeginEdit();
        workRow["name"] = "Smith";
        workRow.EndEdit();
    }


    // 6-表关系DataRelation
    // 6-1 表关系的实例化
    // 表关系通过DataRelation构造函数实例化,通常传递:①关系名;②父表列或组合;③子表列或组合
    // 标志位createConstraints为true(默认)时,实例化表关系的同时为DataTable添加外键约束
    // 标志位createConstraints为false时,表关系建立在DataSet上,定义父子关系但不检查外键约束

    // public DataRelation(String, DataColumn, DataColumn)
    // public DataRelation(String, DataColumn[], DataColumn[])
    // public DataRelation(String, DataColumn, DataColumn, bool)
    // public DataRelation(String, DataColumn[], DataColumn[], bool)

    // 调用DataSet的表关系集合类属性Relations的Add()也可向DataSet添加表关系
    public void TestDataRelationAdd()
    {
        DataSet customerOrders = new DataSet();
        customerOrders.Relations.Add("CustOrders",
            customerOrders.Tables["Customers"].Columns["CustID"],
            customerOrders.Tables["Orders"].Columns["CustID"]);
    }

    // 6-2 关联数据的检索
    // DataRelation提供子表向父表和父表向子表的快捷检索方式
    public interface IDataRelationUtilFunc
    {
        // ①父表向子表的数据检索
        DataRow[] GetChildRows(DataRelation relation);
        DataRow[] GetChildRows(String row);             // 参数表关系名

        // ②子表向父表的数据检索
        DataRow? GetParentRow(DataRelation relation);
        DataRow? GetParentRow(String row);              // 参数表关系名
    }
    public void TestDataRelationGet()
    {
        DataSet customerOrders = new DataSet();
        DataRelation custRelation =
            customerOrders.Relations.Add("CustOrders",
                customerOrders.Tables["Customers"].Columns["CustomerID"],
                customerOrders.Tables["Orders"].Columns["CustomerID"]);
        // 对父表的每行数据遍历,根据关系在子表中查找与其关联的所有行
        foreach (DataRow custRow in customerOrders.Tables["Customers"].Rows)
        {
            foreach (DataRow orderRow in custRow.GetChildRows(custRelation))
            {
                Console.WriteLine(orderRow["OrderID"].ToString());
            }
        }
    }

}
