package context

import (
	"context"
	"fmt"
	"sync"
	"time"
)

// Context
// Context接口的原生定义:
//	type Context interface {
//		Deadline() (deadline time.Time, ok bool)
//		Done() <-chan struct{}
//		Err() error
//		Value(key any) any
//	}

// ①Deadline()	上下文应该取消的截止时间,布尔值表示是否设置截止时间
// ②Done()		通知用的只读管道.执行的上下文取消后就关闭
// ③Err()		解释Done管道关闭的原因
// ④Value()	返回指定key对应的键值value

// 1-emptyCtx
// emptyCtx的所有接口实现都是空的,通常作为最顶层的上下文使用
// 创建emptyCtx只能借助于context的两个内置函数:
// ①context.Background()	通常用于最底层的context使用
// ②context.TODO()			通常用于暂时无法确定类型的占位使用
func test() {
	empCtx1 := context.Background()
	empCtx2 := context.TODO()
	fmt.Print(empCtx1, empCtx2)
}

// 2-valueCtx
// valueCtx结构包括内嵌的Context和一对键值对:
//	type valueCtx struct {
//		Context
//		key, val any
//	}

// 可以通过context.WithValue()内置函数创建valueCtx
// valueCtx可以通过多层的嵌套传入多个键值对,调用Value()时沿继承链向上查找
// valueCtx的Done()管道始终为nil,无法实现协程管道监听的操作
func test2() {
	valCtxFather := context.WithValue(context.Background(), "name", "CQH")
	valCtxSon := context.WithValue(valCtxFather, "age", 18)
	fmt.Println(valCtxSon.Value("name")) // CQH
}

// 3-cancelCtx
// cancelCtx和timerCtx都实现了canceler接口:
type canceler interface {
	// ①removeFromParent 	表示是否从父上下文中删除自身
	// ②err 				表示取消的原因
	cancel(removeFromParent bool, err error)
	// Done 返回管道，用于通知取消的原因
	Done() <-chan struct{}
}

// 可以通过context.WithCancel()内置函数创建cancelCtx
// cancelCtx的逻辑如下:
// 对每个cancelCtx,都要创建监听其Done()通道是否关闭的协程
// cancelCtx创建时向继承链上方查找是否有其他实现canceler接口的父context
// ①如果存在满足要求的父context,就作为它的子上下文,将子上下文的创建放在其监听协程中
// (父上下文显式调用cancel()时,也会关闭掉所有的子上下文,存在生命周期上的关联)
// ②如果不存在满足要求的父context,就作为独立的上下文执行业务逻辑,独立创建处理协程
var wait sync.WaitGroup

func test3() {
	wait.Add(1)
	// WithCancel()有两个返回值,分别是上下文本身和实现的cancel删除方法
	calCtx, cancel := context.WithCancel(context.Background())
	// 监听Done通道协程
	go calCtxHandler(calCtx)
	/*----------业务逻辑部分----------*/
	// 业务逻辑结束后cancel掉自己
	cancel()
	wait.Wait()
}

// cancelCtx监听Done通道的协程逻辑
func calCtxHandler(ctx context.Context) {
	// 如果有该context的子上下文,应该在监听协程中初始化,比如:
	// (同时在该协程中再go创建该子上下文的协程监听继承链上的cancel消息)
	// cancelCtxAuth, cancelAuth := context.WithCancel(ctx)
	// cancelCtxMail, cancelMail := context.WithCancel(ctx)
	// defer cancelAuth()
	// defer cancelMail()
	defer wait.Done()
	for {
		select {
		//等待context的管道关闭时退出
		case <-ctx.Done():
			fmt.Println(ctx.Err())
			return
		default:
			fmt.Println("waiting")
		}
		time.Sleep(time.Millisecond * 20)
	}
}

// 4-timerCtx
// timerCtx在cancelCtx基础上设置了超时时间(超过超时时间自动cancel)

// 创建timerCtx有两个内置函数:
// func WithDeadline(parent Context, d time.Time) (Context, CancelFunc)
// func WithTimeout(parent Context, timeout time.Duration) (Context, CancelFunc)
// ①WithDeadline:设置的是具体时间,到达指定时间点就超时
// ②WithTimeout:设置的是时间间隔,经过指定时间后就超时

func test4() {
	wait.Add(1)
	deadlineCtx, cancel := context.WithTimeout(context.Background(), time.Millisecond*2000)
	go deadlineCtxHandler(deadlineCtx)
	/*----------业务逻辑部分----------*/
	// 业务逻辑结束后cancel掉自己
	cancel()
	wait.Wait()
}

func deadlineCtxHandler(ctx context.Context) {
	defer wait.Done()
	for {
		select {
		case <-ctx.Done():
			fmt.Println(ctx.Err())
			return
		default:
			fmt.Println("waiting")
		}
		time.Sleep(time.Millisecond * 20)
	}
}
