package coroutine

import (
	"fmt"
	"time"
)

// coroutine
// 协程是用户态的轻量级线程,由Go调度器进行运行时调度
// 使用go关键字后跟函数调用即可创建协程(协程的函数不允许有返回值)

// 协程什么时候运行,协程的执行顺序都是不固定的
// 协程只保证并发的发生,可以使用如下方案进行并发控制:
// ①管道	channel
// ②信号量	WaitGroup
// ③上下文	Context

func test() {
	go fmt.Println("hello world!")
	// 匿名函数协程
	// 通常将协程函数解耦到另外的函数中,保证主线程函数的易读性
	go func() {
		fmt.Println("hello world!")
	}()
	go coroutineHandler()

	// 通常来说,让主线程延时一段时间,协程都会完成运行任务
	time.Sleep(time.Millisecond * 20)
}

func coroutineHandler() {
	fmt.Println("hello world!")
}
