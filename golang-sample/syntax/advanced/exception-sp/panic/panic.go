package panic

import "fmt"

// 1-创建panic
// 调用内置函数panic()即可创建panic对象,可传递any类型参数v作为信息
func initDataBase(host string, port int) {
	if len(host) == 0 || port == 0 {
		panic("非法的数据链接参数")
	}
}

// 2-defer的执行顺序
// panic发生后,已声明的defer语句都会被执行(defer内部也可以发生panic,从而实现更复杂的逻辑)
// 执行的顺序是声明顺序从后往前的,以下面为例:
func test() {
	defer fmt.Println("A")
	defer fmt.Println("B")
	fmt.Println("C")
	dangerOp()
	defer fmt.Println("D")
}

func dangerOp() {
	defer fmt.Println(1)
	defer fmt.Println(2)
	panic("panic")
	defer fmt.Println(3)
}

// 发生panic首先执行dangerOp()中已经声明的defer(3和D还没声明,不会执行)
// ①按照声明顺序从后往前执行: 先输出2,再输出1
// ②回到test()主函数,同样按照声明顺序从后往前: 先输出B,再输出A
// ③所有的defer都执行完后,输出panic的提示信息

// 3-恢复panic
// 内置函数recover()可以在defer内部处理panic恢复程序运行
func dangerOp2() {
	defer func() {
		// 当recover()返回值不为nil时,说明panic恢复成功
		if err := recover(); err != nil {
			fmt.Println(err)
			fmt.Println("panic恢复")
		}
	}()
	panic("发生panic")
}

// recover()调用的注意点如下:
// ①recover()必须在defer中调用
// ②被恢复的panic不允许以nil为参数
// ③recover()必须在defer的直接函数中,在defer的闭包中调用recover()是无效的:

// defer func() {
// 	func() {
// 		if err := recover(); err != nil {}
// 	}
// }
