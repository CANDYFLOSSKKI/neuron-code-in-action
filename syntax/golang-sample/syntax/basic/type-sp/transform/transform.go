package transform

import "fmt"

// 1-类型声明和类型别名
// 通常类型声明的用法是自定义运算类型
// 类型别名则只是用于化简长复杂类型的写法
// 注意区分类型声明和类型别名

type MyInt int     // 类型声明,和基础类型是不同的两种类型,不能互用
type Integer = int // 类型别名,和基础类型被视为相同类型,可以互用

func Test() {
	var a int = 1
	var b MyInt = 2
	var c Integer = 3
	fmt.Println( /*a+b*/ ) // b的类型是类型声明,和a属于不同类型,a+b会报错
	fmt.Println(a + c)     // c的类型是类型别名,和a属于相同类型,a+c不会报错

	fmt.Println(b)
}

// 2-类型转换
// Go不存在隐式类型转换,只有显式类型转换,格式为: T(x)
// 转换为复合类型时,格式要改成: (T)(x),否则容易出现歧义

// *Point(p)  			等价于 *(Point(p))
// (*Point)(p)   		将p转换为类型 *Point
// <-chan int(c)     	等价于 <-(chan int(c))
// (<-chan int)(c)   	将c转换为类型  <-chan int
// (func())(x)       	将x转换为类型 func()
// (func() int)(x)   	将x转换为类型 func() int
