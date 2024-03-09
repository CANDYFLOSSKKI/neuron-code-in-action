package assert

import "fmt"

// 类型断言的基本形式为: x.(T)

func Test() {
	var b int = 1
	var a interface{} = b
	// 类型转换语句包含两个返回值:
	// ①类型转换后的变量值
	// ②转换结果的布尔值
	if intVal, ok := a.(int); ok {
		fmt.Println(intVal)
	} else {
		fmt.Println("error type")
	}
}

// 当变量类型为接口类型时,还可以使用switch进行模式匹配

func Test2() {
	var a interface{} = 2
	switch a.(type) {
	case int:
		fmt.Println("int")
	case float64:
		fmt.Println("float")
	case string:
		fmt.Println("string")
	}

}
