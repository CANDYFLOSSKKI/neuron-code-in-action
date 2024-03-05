package atomic

import "sync/atomic"

// atomic.Bool{}
// atomic.Pointer[]{}
// atomic.Int32{}
// atomic.Int64{}
// atomic.Uint32{}
// atomic.Uint64{}
// atomic.Uintptr{}
// atomic.Value{}	(支持存储任何类型)

// 1-原子类型的操作
// 所有的原子类型都不应该复制值,而是应该使用它们的指针
// Load()							原子操作获取值
// Swap(newVal type) (old type)		原子操作交换值,并且返回旧值
// Store(val type)					原子操作存储值

// 原子操作同时有实例方法和静态方法两种形式:
func test() {
	// ①实例方法
	var aint64 atomic.Uint64
	aint64.Store(64)
	aint64.Swap(128)
	aint64.Add(112)

	// ②静态方法
	var bint64 int64
	atomic.StoreInt64(&bint64, 64)
	atomic.SwapInt64(&bint64, 128)
	atomic.AddInt64(&bint64, 112)
}

// 2-CAS乐观锁
// CAS包括以下三个输入参数:
// ①内存值(指针)
// ②期望值
// ③修改后的新值
// CAS返回标识是否成功替换的布尔值
var count int64

func Add(num int64) {
	// CAS也是自旋操作,因此需要用for循环循环监测(实际上是while)
	for {
		expect := atomic.LoadInt64(&count)
		if atomic.CompareAndSwapInt64(&count, expect, expect+num) {
			break
		}
	}
}
