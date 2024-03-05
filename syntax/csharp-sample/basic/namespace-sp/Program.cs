﻿// 命名空间

// 1-命名空间的层次结构
// 命名空间是逻辑结构,不依赖于物理结构层次(实际项目中最好与物理结构对应)
// 命名空间通常从项目名开始命名,按目录向下命名次级的子结构


// 2-引用命名空间
// 使用using关键字引用命名空间
// 命名空间的引用语句要放在文件开头
using System;


// 3-声明命名空间
// 使用namespace关键字声明命名空间
// ①文件中只有一个命名空间:命名空间后加分号;即可
// ②文件中有多个命名空间:命名空间后加大括号{}划定代码范围
// namespace Process;   单命名空间的声明方式
namespace Process    // 多命名空间的声明方式(括号内都属于该命名空间)
{
}


// 4-命名空间的划分
// 命名空间以文件为单位划分,不同文件的同名命名空间下的结构不能互相引用
// 使用using引用的是完整的命名空间,显式引用同名命名空间即可实现互相引用


namespace basic.namespace_sp
{
    public class Program {}
}

