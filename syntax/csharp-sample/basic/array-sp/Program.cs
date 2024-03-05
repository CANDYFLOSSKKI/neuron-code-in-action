namespace basic.array_sp;

public class Program
{
    // 数组类型(引用类型)
    public void TestArray()
    {
        // 1-一维数组的声明和初始化
        int[] arr11 = new int[5];
        int[] arr12 = new int[]{1, 2, 3, 4, 5};
        int[] arr13 = {1, 2, 3, 4, 5};


        // 2-多维数组的声明和初始化
        // 在数组声明的[]中添加逗号,组成[,]形式即可声明多维数组
        // []中有n个逗号时,标识数组为n+1维
        int[,] array2D = new int[,] { { 1, 2 }, { 3, 4 }, { 5, 6 }, { 7, 8 } };
        int[,] array2Da = new int[4, 2] { { 1, 2 }, { 3, 4 }, { 5, 6 }, { 7, 8 } };
        int[,,] array3D = new int[,,] { { { 1, 2, 3 }, { 4, 5, 6 } },
            { { 7, 8, 9 }, { 10, 11, 12 } } };
        int[,,] array3Da = new int[2, 2, 3] { { { 1, 2, 3 }, { 4, 5, 6 } },
            { { 7, 8, 9 }, { 10, 11, 12 } } };
        int[,] array4 = { { 1, 2 }, { 3, 4 }, { 5, 6 }, { 7, 8 } };


        // 3-交错数组的声明和初始化
        // 交错数组和多维数组的不同在于:交错数组外层的每个数组元素都可以是长度维度各不相同的数组
        // 交错数组使用多个[]进行声明:
        //  ①首个[]代表外层数组,格式固定
        //  ②后续的[]代表内部数组,可以是多维数组[,,]也可以是交错数组[][],格式不固定
        //  [][]     ->内层为一维数组
        //  [][,,]   ->内层为三维数组
        //  [][][]   ->内层为交错数组
        int[][] jaggedArray = new int[3][];
        jaggedArray[0] = new int[5];
        jaggedArray[1] = new int[4];
        jaggedArray[2] = new int[2];
        int[][] jaggedArray3 =
        {
            new int[] { 1, 3, 5, 7, 9 },
            new int[] { 0, 2, 4, 6 },
            new int[] { 11, 22 }
        };
    }

    public void TestArray1()
    {
        // 4-数组元素的访问
        // 4-1 整数索引访问
        // 数组包括多维层次时,索引也要用逗号分隔
        int[][,] jaggedArray4 = new int[3][,]
        {
            new int[,] { {1,3}, {5,7} },
            new int[,] { {0,2}, {4,6}, {8,10} },
            new int[,] { {11,22}, {99,88}, {0,9} }
        };
        Console.Write(jaggedArray4[0][1, 0]);  // 5

        // 4-2 末尾索引
        // 末尾索引^指向序列末尾,^n表示从序列末尾向前偏移n个索引单位
        // ①^和^0:不指向任何一个元素(相当于^length)
        // ②^1:指向最后一个元素
        int[] xs = new[] { 0, 10, 20, 30, 40 };
        int last = xs[^1];  // 40

        // 4-3 范围索引
        // 范围索引..表示左闭右开区间,a..b表示的索引范围为[a,b)
        // 范围索引的两端可以包含末尾索引,也可以为空
        //  [a..] -> [a..^0]
        //  [..b] -> [0..b]
        //  [..]  -> [0..^0]
        int[] numbers = new[] { 0, 10, 20, 30, 40, 50 };
        int amountToDrop = numbers.Length / 2;
        int[] rightHalf = numbers[amountToDrop..];  // 30 40 50
        int[] leftHalf = numbers[..^amountToDrop];  // 0 10 20

        // 4-4 索引结构
        // 任何对序列访问的索引值都可以被Index和Range接收:
        // ①Index:用于接收单个位置的索引,也可用于接收末尾索引^
        // ②Range:用于接收位置范围的索引,也可用于接收范围索引..
        // 使用^和..直接访问序列时,Index和Range在底层封装,也可以显式定义对象实例
        var array = new int[] { 1, 2, 3, 4, 5 };
        Index index = ^2;
        Range range = 0..;

        // 向Index和Range的GetOffset()方法传入数组长度参数,可以获取索引的常量值
        // Range包含两个索引常量值,因此需要先获取Start/End属性
        int indexOffset = index.GetOffset(array.Length);              // 3
        int rangeStartOffset = range.Start.GetOffset(array.Length);   // 0
        int rangeEndOffset = range.End.GetOffset(array.Length);       // 4
    }
}
