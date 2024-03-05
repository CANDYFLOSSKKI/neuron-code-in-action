package set_type

// 1-并集类型集

type SignedInt interface {
	int8 | int16 | int | int32 | int64
}

// 2-交集类型集
// 接口中包含多个类型集接口,该接口的类型就是这几个接口的交集
// 当交集为空时,接口是类型空集(空集不能接收任何类型元素;空接口可以接收任何类型元素)

type Integer interface {
	int8 | int16 | int | int32 | int64 | uint8 | uint16 | uint | uint32 | uint64
}
type Number interface {
	SignedInt
	Integer
}

// 3-类型别名适配
// 如果为底层类型设置了类型别名,接口无法识别该自定义类型
// ①在接口类型集中使用~表示取底层类型

type TinyInt int8
type Int1 interface {
	~int8 //适配所有底层类型为int8的类型别名
}

// ②把该自定义类型也加入接口中

type Int2 interface {
	int8 | TinyInt
}
