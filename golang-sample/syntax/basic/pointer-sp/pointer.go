package pointer_sp

import "fmt"

func Test() {
	num := 2

	// 1-取地址& 对变量取地址会返回对应类型的指针
	p := &num
	fmt.Println(p) // 0xc00001c088

	// 2-解引用* 对指针解引用可以访问指针指向的元素
	rawNum := *p
	fmt.Println(rawNum) // 2

	// 3-声明和初始化指针变量
	// 空指针无法使用,要么取其他变量地址赋值,要么通过new分配内存
	var numPtr *int
	numPtr = new(int)
	fmt.Println(numPtr)

	// 新分配内存指针的解引用都是零值
	fmt.Println(*new(string))    // ""
	fmt.Println(*new(int))       // 0
	fmt.Println(*new([5]int))    // [0 0 0 0 0]
	fmt.Println(*new([]float64)) // []
	// 指针不允许进行偏移运算
}
