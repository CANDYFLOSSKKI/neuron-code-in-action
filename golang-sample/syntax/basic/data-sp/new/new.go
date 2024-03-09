package new

import "fmt"

// 引用变量内存分配函数

// 1-new函数
// func new(Type) *Type
// ①返回值是类型Type的指针
// ②接收对应类型Type的参数
// ③专用于给指针分配内存空间

// 2-make函数
// func make(t Type, size ...IntegerType) Type
// ①返回值是类型Type的值
// ②接收第一个参数是对应类型Type
// 切片		后续参数为长度和容量大小
// 映射表	后续参数为容量大小
// 通道		后续参数为缓冲区大小
// ③专用于给切片,映射表和通道分配内存空间

func Test() {
	a := new(int)                 // int指针
	b := new(string)              // string指针
	c := new([]int)               // int切片指针
	d := make([]int, 10, 100)     // 长度为10，容量100的int切片
	e := make(map[string]int, 10) // 容量为10的映射表
	f := make(chan int, 10)       // 缓冲区大小为10的通道
	fmt.Println(a)
	fmt.Println(b)
	fmt.Println(c)
	fmt.Println(d)
	fmt.Println(e)
	fmt.Println(f)
}
