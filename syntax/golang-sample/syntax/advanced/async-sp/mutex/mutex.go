package mutex

import (
	"fmt"
	"sync"
)

// Go的锁实现包括互斥锁和读写锁
// 锁都是非递归的(不可重入锁),不能重复加锁和重复解锁

// 1-互斥锁
// 声明互斥锁只需要指定类型sync.Mutex
var lock sync.Mutex

// 互斥锁的操作非常简单,只有加锁和解锁两个行为:
// ①Lock()		加锁
// ②Unlock()	解锁
// 锁不关联某个具体数据,要让锁实现访问的互斥需要这样操作
// 让所有访问数据的协程都实现加锁-解锁的操作,这样一个协程访问数据的时候,其他的协程无法加锁,实现互斥
func test() {
	count := 1
	for i := 0; i < 10; i++ {
		go func(count *int) {
			// 每个协程访问count前都加锁,使得争抢的其他协程都阻塞
			lock.Lock()
			*count++
			// 访问完数据后解锁,释放其他协程的加锁访问操作
			lock.Unlock()
		}(&count)
	}
	fmt.Println(count)
}

// 如果将逻辑行为封装到方法中,可以在方法的defer块中进行解锁

// 2-读写锁
// 如果获得了读锁，其他协程进行写操作时会阻塞，其他协程进行读操作时不会阻塞
// 如果获得了写锁，其他协程进行写操作时会阻塞，其他协程进行读操作时会阻塞
// 声明读写锁只需要指定类型sync.RWMutex
var rw sync.RWMutex

// 读写锁相关的方法如下:
// RLock()			加读锁,当前已经有读锁时进入阻塞(自旋锁)
// Lock()			加写锁,当前已经有写锁时进入阻塞(自旋锁)
// TryRLock() bool	尝试加读锁,当前已经有读锁时直接返回false
// TryLock() bool	尝试加写锁,当前已经有写锁时直接返回false
// RUnlock()		解锁读锁
// Unlock()			解锁写锁

// 3-条件变量
// 条件变量的具体案例见博客: https://www.jianshu.com/p/4cebeae13bf5
// 条件变量的创建需要传递Locker变量,可从前两种锁中获得(通常都用读写锁,功能多)
// 注意加锁和条件变量所用的锁要是同一个
var cond = sync.NewCond(rw.RLocker())

// 条件变量相关的方法如下:
// Wait()		阻塞的同时释放已经拿到的锁,等待唤醒
//				唤醒的协程需要再次争抢锁,但是拿到锁之后从Wait()开始继续执行
// Signal()		随机唤醒一个Wait()的协程
// Broadcast()	唤醒所有Wait()的协程
