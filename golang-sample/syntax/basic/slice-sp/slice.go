package slice_sp

import "fmt"

func Test() {
	// 1-数组初始化
	var nums_a [5]int         // 类型初始化
	nums_b := [5]int{1, 2, 3} // 元素初始化
	nums_c := new([5]int)     // new初始化(此时nums是指针类型)
	fmt.Println(nums_a)
	fmt.Println(nums_b)
	fmt.Println(nums_c)

	// 2-切割数组
	// 左闭右开区间[start:end)
	nums_d := [5]int{1, 2, 3, 4, 5}
	nums_d1 := nums_d[1:]  // 子数组范围[1,5) ->2 3 4 5
	nums_d2 := nums_d[:5]  // 子数组范围[0,5) -> 1 2 3 4 5
	nums_d3 := nums_d[2:3] // 子数组范围[2,3) -> 3
	nums_d4 := nums_d[1:3] // 子数组范围[1,3) -> 2 3
	fmt.Println(nums_d1)
	fmt.Println(nums_d2)
	fmt.Println(nums_d3)
	fmt.Println(nums_d4)

	// 3-切片初始化
	var numss_a []int
	numss_b := []int{1, 2, 3}
	numss_c := make([]int, 0, 0) // make初始化(nums是值类型)
	numss_d := new([]int)        // new初始化(nums是指针类型)
	fmt.Println(numss_a)
	fmt.Println(numss_b)
	fmt.Println(numss_c)
	fmt.Println(numss_d)

	// 4-切片插入元素
	// append()接收多个参数按照顺序连接起来(即函数首个参数是尾部插入)
	// 如果想在指定位置处添加元素,可以拆分切片为两部分,插入元素放在append参数的中间
	numss_e := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	numss_e = append([]int{-1, 0}, numss_e...) // 解构运算符(同ES6)
	fmt.Println(numss_e)                       // [-1 0 1 2 3 4 5 6 7 8 9 10]

	// 5-切片拷贝元素
	// copy()将第二个参数中的元素拷贝到第一个参数中(容量不满足要求则拷贝失败)
	dest := make([]int, 10)
	src := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}
	copy(dest, src)
	fmt.Println(src, dest)

	// 6-二维切片
	// 二维切片中每个元素的长度和容量都是不固定的,因此初始化时还需要遍历对其中的元素分配内存空间
	slices := make([][]int, 5)
	for i := 0; i < len(slices); i++ {
		slices[i] = make([]int, 5)
	}

	// 7-扩展表达式
	// slice[low:high:max],切割后的切片容量为max-low
	// 单纯对切片进行分割[a:b]会使得两者指向相同的内存空间(修改可以影响对方)
	// 使用扩展表达式限制切片容量后,切割出的切片如果容量不足会重新分配底层数组,此时内存空间不同
	// (实际上使用copy()也可以解决这个问题)
	s1 := []int{1, 2, 3, 4, 5, 6, 7, 8, 9} // cap = 9
	s2 := s1[3:4:4]                        // cap = 4 - 3 = 1
	// 容量不足，分配新的底层数组,从而实现相同引用的解耦功能
	s2 = append(s2, 1)
	fmt.Println(s2)
	fmt.Println(s1)

	// 8-清空切片
	s := []int{1, 2, 3, 4}
	// 8-1 clear()内置函数将切片置0
	clear(s)
	// 8-2 [:0]将切片大小置为0,因为切片本身就是动态容量,该操作也可以实现清空
	s = s[:0]
	fmt.Println(s)
}
