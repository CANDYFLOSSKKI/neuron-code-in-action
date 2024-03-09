package channel

import (
	"fmt"
	"time"
)

// channel
// 管道可以实现协程间的通信,用于并发控制
// 管道出现在函数参数中一定是引用传递(打破了Go中函数参数值传递的特性)

// 管道的声明类型为 chan <T>
var ch chan int

// 1-管道的创建和关闭
func test() {
	// 创建管道只能使用make()函数,可以指定管道的缓冲区大小
	intCh := make(chan int, 10)
	// 关闭管道的方法和文件相同,使用close()方法
	// (通常将资源关闭延迟到defer函数中执行)
	close(intCh)
}

// 2-管道的数据读写
// (永远不要对nil的管道进行任何读写操作)
// 管道<-数据  相当于向管道写入数据
// 数据<-管道  相当于从管道读出数据(读出操作是双返回值,还包括操作是否成功的布尔值)

// 管道内部数据是先进先出的同步操作
// 即某个时间段内只能有一个协程可以向管道写入数据,也只能有一个协程可以从管道读出数据
func test2() {
	intCh := make(chan int)
	defer close(intCh)
	// intCh是缓冲区容量为0的管道,不会暂时存放任何数据
	// 因此对零缓冲通道intCh的写入会阻塞到读出线程执行为止,需要分离写入操作到协程中执行
	go func() {
		intCh <- 114514 // 写入管道
	}()
	numData := <-intCh // 读出管道
	fmt.Print(numData)
}

// 3-有缓冲管道
// 有缓冲管道相当于阻塞队列:
// ①读取空的管道会造成阻塞,直到等到写入协程开始执行为止
// ②写入满的管道会造成阻塞,直到等到读出协程开始执行为止

// 无缓冲管道几乎必定会发生阻塞,通常用于同步父子协程的执行顺序
// 有缓冲管道通过调节缓冲区可以避免阻塞,通常用于协程间的消息通信
// (缓冲区大小为1的管道可实现互斥锁的效果)

// 4-只读/只写管道
// 只读管道和只写管道是在声明类型上作限制的
// ①只读管道: <-chan <T>
// ②只写管道: chan<- <T>

// 可以将双向管道的引用赋给单向管道,此时在该作用域内管道退化为单向管道
func test3() {
	ch := make(chan int, 1)
	go write(ch)
	fmt.Println(<-ch)
}

// 在write()函数内,限制实参ch为只写管道,只能向管道写入数据
func write(ch chan<- int) {
	ch <- 1
}

// 5-管道数据遍历
// len(ch) 获取管道缓冲区中数据个数
// cap(ch) 获取管道缓冲区大小

// for range可以用于遍历管道缓冲区,且每次仅有单个返回值(和变量的for range区分开)
// for range遍历停止的情况通常只有一种，那就是管道关闭且读完数据后
// 当管道被关闭时,缓冲区剩余的数据仍然可以正常读取,发送方发送完直接关闭管道即可
func test4() {
	ch := make(chan int, 10)
	// ①发送方,发送完数据关闭管道,防止接收方继续接收导致阻塞
	// (通常只有发送方知道什么时候适合关闭管道,关闭的行为不应该由接收方负责)
	go func() {
		for i := 0; i < 10; i++ {
			ch <- i
		}
		close(ch)
	}()

	// ②接收方,for range遍历读取数据,管道关闭后读完剩余的数据再退出
	for n := range ch {
		fmt.Println(n)
	}
}

// 6-管道多路复用
// select-case结构可以实现同时对多个元素的监测,每个case中的读出操作都包括两个返回值
// ①当至少存在一个资源可用时,伪随机选择一个分支执行
// ②当所有资源都不可用时,进入阻塞态
func test5() {
	chA := make(chan int)
	chB := make(chan int)
	chC := make(chan int)
	//同时检测chA,chB,chC三个管道
	select {
	case n, ok := <-chA:
		fmt.Println(n, ok)
	case n, ok := <-chB:
		fmt.Println(n, ok)
	case n, ok := <-chC:
		fmt.Println(n, ok)

	// select的特点是可以实现阻塞的监测和退出
	// ①设置default项,所有管道都不可用时不进入阻塞态,直接执行default项退出
	default:
		fmt.Println("no channel selected")
	}

	// ②循环调用select获取元素时添加超时时间限制
	// 超过超时时间时退出循环
Loop:
	for {
		select {
		case n, ok := <-chA:
			fmt.Println("A", n, ok)
		case n, ok := <-chB:
			fmt.Println("B", n, ok)
		case n, ok := <-chC:
			fmt.Println("C", n, ok)
		// time.After()返回只读管道类型
		// 设置1秒的超时时间,超时退出Loop循环
		case <-time.After(time.Second):
			break Loop
		}
	}
}
