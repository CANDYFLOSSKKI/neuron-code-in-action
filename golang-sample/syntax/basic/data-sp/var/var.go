package _var

import "fmt"

// 注意变量和常量的使用方法区别
// 常量要求在编译时确定,使用变量给常量进行初始化赋值是非法的

// 定义在函数中的变量不允许初始化不调用(报错)
// 定义在整个包中的变量允许初始化不调用
var data_var string

func Test() {

	// 1-var声明变量(和Typescript很像,后置类型)
	// 多变量相同类型时只需要声明一次类型,不同类型可以使用()批量声明(不构成特定结构)
	var char byte
	var numA, numB, numC int
	var (
		names   string
		ages    int
		address string
	)

	// 2-短变量初始化
	// 使用:=,可以省略var和类型,指定初始化值后类型交由编译器推断
	// 短变量初始化可以使用逗号,进行批量初始化
	// 不能使用nil进行短变量初始化 name := nil
	// 短变量初始化只能用于初始化,不能用于已有变量的重复赋值
	namea := "jack"
	nameb, ageb := "jack", 1

	// 3-变量交换
	// 使用等号=可以实现快捷的变量交换操作
	num1, num2, num3 := 25, 36, 49
	num1, num2 = num2, num1             // 双变量交换
	num1, num2, num3 = num3, num2, num1 // 多变量交换(此处表示逆序交换)

	// 4-忽略变量(类似弃元用法)
	// 使用下划线_表示该变量可以被忽略
	// 弃元也可以用在其他接收变量的场景
	a, b, _ := 1, 2, 3

	fmt.Print(char)
	fmt.Println(numA + numB + numC + ages + ageb)
	fmt.Println(names + address + namea + nameb)
	fmt.Println(a + b)
}
