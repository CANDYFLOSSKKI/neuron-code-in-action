package label

// 结构体标签

// 结构体标签是在字段后添加额外的模版字符串
// 结构体标签并没有统一的标准,可以看作是Java中的注解,适用于如下任务:
// ①XML/JSON等格式的序列化中指定别名
// ②ORM框架中指定关联的映射
// ③数据校验validator

//结构体类型变量的互相转换只看每个字段的类型,字段名和结构体标签都可以不相同

type Person struct {
	Name string `json:"name" xml:"name"`
	Age  int    `json:"age" xml:"age"`
}
