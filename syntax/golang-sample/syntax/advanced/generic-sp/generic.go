package generic_sp

// 泛型使用[]中的类型T指定
// 泛型类型需要给定类型约束(用或运算符给出),约束了类型形参的范围
func sum[T int | float64](a, b T) T {
	return a + b
}
func Test() {
	// 1-泛型的使用方法
	// 使用方法1:显式指定泛型类型
	sum[int](1, 2)
	// 使用方法2:编译器推断泛型类型
	sum(3.1415926, 1.114514)

}

// 2-多泛型参数
// 多个泛型参数以逗号,隔开
// 通常不将切片等复合类型作为泛型,而是将底层类型作为泛型
// S []int => S  ×
// S int => []S  √

type Company[T int | string, S int | string] struct {
	Name  string
	Id    T
	Stuff []S
}

// 3-泛型结构的限制
// ①单个type(基础类型)的值不能声明为泛型
// ②函数等结构中带泛型类型的参数无法使用类型断言
func sSum[T int | float64](a, b T) T {
	// 类型断言的基本形式: x.(T)
	// intS,ok := a.(int)  不被允许
	// switch a.(type)     不被允许
	return a + b
}

// ③匿名结构不能使用泛型
// ④方法中只有调用者存在泛型时,才能在调用者处添加泛型,其他地方不允许有泛型

type GenericStruct[T int | string] struct {
	Name string
	Id   T
}

func (g GenericStruct[T]) name(a int) int {
	//该方法的形参和返回值都不能带泛型
	return a
}
