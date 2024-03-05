namespace basic.enum_sp;

public class Program
{
    // 枚举类型

    // 1-声明枚举类型
    // 使用enum关键字声明枚举类型变量
    // 枚举成员的默认类型为int,可以使用冒号:指定枚举成员类型
    // 枚举成员的默认常量值从(目标类型)0开始依次递增,可以显式指定枚举成员的常量值
    enum ErrorCode : ushort
    {
        None = 0,
        Unknown = 1,
        ConnectionLost = 100,
        OutlierReading = 200
    }


    // 2-选项组合枚举
    // 枚举成员分别指定互斥的二进制值时,可用于表示选项的组合
    // 选项组合枚举使用[Flags]特性标识
    // 选项组合枚举的各个原始成员值都是2的不同次幂,方便位运算实现组合
    [Flags]
    public enum Days
    {
        None      = 0b_0000_0000,  // 0
        Monday    = 0b_0000_0001,  // 1
        Tuesday   = 0b_0000_0010,  // 2
        Wednesday = 0b_0000_0100,  // 4
        Thursday  = 0b_0000_1000,  // 8
        Friday    = 0b_0001_0000,  // 16
        Saturday  = 0b_0010_0000,  // 32
        Sunday    = 0b_0100_0000,  // 64
        // 对之前成员进行与(&)或(|)运算,可实现枚举选项的交叉和合并
        Weekend   = Saturday | Sunday
    }


    // 3-枚举和常量转换
    // 枚举类型和对应的常量类型支持双向类型转换
    // 枚举向常量的转换通常不会失败;常量向枚举转换失败时,保留常量值不变
    public enum Season
    {
        Spring,
        Summer,
        Autumn,
        Winter
    }
    public static void TestSeason()
    {
        var a = (int)Season.Autumn;    // a = 2(枚举转常量)
        var b = (Season)1;             // b = Summer(常量转枚举)
        var c = (Season)4;             // c = 4(常量转枚举,失败保留值不变)
    }
}

