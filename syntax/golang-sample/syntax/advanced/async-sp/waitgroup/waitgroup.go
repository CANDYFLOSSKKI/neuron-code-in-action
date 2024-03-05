package waitgroup

import (
	"fmt"
	"sync"
)

// sync.WaitGroup
// 1-信号量的初始化
// 只需要声明即可,信号量使用前无需进行初始化
var sign sync.WaitGroup

// 2-信号量的使用
// 信号量相关的操作仅有如下三个方法:
// ①Add(int) 	添加n个需要等待的协程(通常在主线程中执行,预先分配可能执行协程数的资源)
// ②Done()   	减少1个需要等待的协程(标识当前协程执行完毕)
// ③Wait()	  	阻塞等待所有协程执行结束(数量归0)
func test() {
	var wait sync.WaitGroup
	wait.Add(1) // 添加1个信号量
	go func() {
		fmt.Println(1)
		wait.Done() // 协程执行完毕,释放信号量
	}()
	wait.Wait() // 阻塞直到协程执行完毕
	fmt.Println(2)
}

// 注意信号量的参数传递满足值传递的特性
// WaitGroup要么作为全局参数,要么传递给函数的时候以指针形式传递
func test2() {
	var mainWait sync.WaitGroup
	mainWait.Add(1)
	hello(&mainWait) // 指针传递信号量
	mainWait.Wait()
	fmt.Println("end")
}
func hello(wait *sync.WaitGroup) {
	fmt.Println("hello")
	wait.Done()
}
