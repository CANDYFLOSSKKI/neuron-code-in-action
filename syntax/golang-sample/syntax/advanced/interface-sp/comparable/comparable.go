package comparable

import "fmt"

// comparable is an interface that is implemented by all comparable types
// (booleans, numbers, strings, pointers, channels, arrays of comparable types,
// structs whose fields are all comparable types).
// The comparable interface may only be used as a type parameter constraint,
// not as the type of variable.
// type comparable interface{ comparable }

// comparable接口表示类型可以进行比较操作,它是隐式的概念:
// (comparable接口无法并入类型集和类型约束)
// ①指针类型: 指针指向同一个对象或者都为nil才相等
// ②通道类型: 同指针
// ③接口类型: 接口的type和value同时相等时两个接口才相等(空接口不可比较)
// ④结构类型: 成员都是comparable,结构体才是comparable的
// ⑤数组类型: 成员是comparable,数组才是comparable的

// ⑥map类型: 不可比较
// ⑦切片类型: 不可比较
// ⑧函数类型: 不可比较

// comparable默认取底层类型进行比较
// 复杂的结构体等类型不可比较,需要定制判等和比较的逻辑
func test() {
	type MyInt int
	a := MyInt(5)
	b := MyInt(10)
	if a == b {
		fmt.Println("a and b are equal")
	} else if a < b {
		fmt.Println("a is less than b")
	} else {
		fmt.Println("a is greater than b")
	}
}
