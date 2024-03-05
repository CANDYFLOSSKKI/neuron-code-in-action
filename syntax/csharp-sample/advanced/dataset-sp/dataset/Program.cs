using System.Data;

namespace advanced.dataset_sp.dataset;

public class Program
{
    // 数据集

    // 1-数据集的体系结构
    // DataSet(数据集)
    // |--DataRelationCollection
    // |--ExtendedProperties
    // |--DataTableCollection
    // |--DataTable(数据表)
    //    |--DataRowCollection
    //       |--DataRow(数据行)
    //    |--DataView
    //    |--ChildRelations
    //    |--ParentRelations
    //    |--Constraints
    //    |--DataColumnCollection
    //       |--DataColumn(数据列)
    //          |--ExtendedProperties
    //    |--ExtendedProperties
    //    |--PrimaryKey


    // 2-数据集的实例化
    // 数据集通过DataSet构造函数实例化
    // 构造函数可以传入数据集名称DataSetName,不指定数据集名称时默认为NewDataSet
    DataSet set = new DataSet("MyDataSet");

    // 通过构造函数实例化时,变量名和名称参数分别起不同作用:
    // ①名称:内存中的数据源使用,主要起数据库操作时的标识作用
    // ②实例变量:内存中数据源相应结构的入口点,用于针对该结构调用实例方法和传参


    // 3-数据集的增删改操作
    // 数据集包含数据表和表关系的集合,提供Tables和Relations属性以集合方式存储表和表关系
    public DataTableCollection Tables { get; }        // 表数据集合
    public DataRelationCollection Relations { get; }  // 表关系集合

    // 数据集的删改操作通过集合类属性Tables和Relations的索引器获取目标对象操作
    // 数据集的新增操作主要通过Add()方法进行,Add()的返回值是添加的结构类型
    public void TestDataSetAdd()
    {
        DataSet customerOrders = new DataSet("CustomerOrders");
        DataTable ordersTable = customerOrders.Tables.Add("Orders");
        DataColumn pkOrderID =ordersTable.Columns.Add("OrderID", typeof(Int32));
    }


    // 4-数据集的合并操作
    // Merge()可用于合并两个架构相似的数据集,合并的目标数据集只进行数据合并而不发生架构变化
    // Merge()的参数形式非常多,还可与DataRow[]和DataTable合并(此时与架构无关)
    public interface IDataSetMergeUtilFunc
    {
        void Merge(DataRow[] rows);
        void Merge(DataSet set);
        void Merge(DataTable table);
        void Merge(DataSet set, bool flag);
        void Merge(DataRow[] rows, bool flag, MissingSchemaAction action);
        void Merge(DataSet set, bool flag, MissingSchemaAction action);
        void Merge(DataTable table, bool flag, MissingSchemaAction action);
    }

    // 4-1 合并操作的数据冲突
    // 原数据和新数据的主键值和各列架构都相同时,合并操作中会发生数据冲突
    // 保留更改标志PreserveChanges决定现有行和传入行的保留和覆盖行为:
    // ①PreserveChanges = true
    //  ->Original行版本覆盖为传入行的Original行版本
    //  ->行状态设置为Modified

    // ②PreserveChanges = false
    //  ->Current和Original行版本覆盖为传入行的Current和Original行版本
    //  ->行状态设置为传入行的行状态

    // 4-2 合并操作的架构冲突
    // 新数据中包含原数据中不存在的列和主键时,合并操作中会发生架构冲突
    // 枚举选项MissingSchemaAction决定对目标数据集的架构处理行为:

    // MissingSchemaAction.Add(1)         添加必需的列以完成架构
    // MissingSchemaAction.Ignore(2)      忽略新数据中的额外列
    // MissingSchemaAction.Error(3)       缺少额外列时抛出异常InvalidOperationException
    // MissingSchemaAction.AddWithKey(4)  添加必需的列和主键以完成架构

    // 当MissingSchemaAction取Add和AddWithKey时,目标数据集的列架构是两个数据集的并集
    // 仅当原数据不包含主键时,才会向目标数据集添加来自新数据的主键


    // 5-数据集的复制操作
    public void TestDataSetCopy()
    {
        // ①Copy()完全复制DataSet的所有架构和数据
        DataSet copyDataSet = set.Copy();

        // ②GetChanges()仅复制DataSet的架构和修改后的数据
        // (修改后的数据包括行状态为Added、Modified、Deleted的行数据)
        // GetChanges()还可以指定获取某种行状态的行数据
        DataSet changeDataSet = set.GetChanges();
        DataSet addedDataSet= set.GetChanges(DataRowState.Added);

        // ③Clone()方法仅复制DataSet的架构,不包含任何数据
        DataSet cloneSet = set.Clone();
    }
}
