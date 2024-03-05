package lazy

import "sync"

// 结构体的懒加载

// 1-sync.Once实现懒加载
// sync.Once类型变量仅包含Do()方法,保证在并发条件下执行一次
// 在Do()方法内部编写初始化逻辑,在真正需要时再去调用

type MySlice struct {
	s []int
	// 通常在自定义结构中包含sync.Once成员,标识该结构体懒加载
	o sync.Once
}

func (m *MySlice) Add(i int) {
	// 当真正用到切片的时候(增删改查)，才会考虑去初始化,此时进行懒加载
	// 如果包含增删改查等多个方法,也可以把Do()提取到单独的方法中被多次调用
	m.o.Do(func() {
		if m.s == nil {
			m.s = make([]int, 0, 10)
		}
	})
	m.s = append(m.s, i)
}

// 2-init()实现懒加载
// 只要导入了包,就会自动执行init()函数,此时可以进行懒加载操作
// 需要注意init()函数不包含参数和返回值,和sync.Once()指针传递的方式有所不同
var lazySlice MySlice

func init() {
	lazySlice = MySlice{
		s: make([]int, 10),
	}
}

func Add_Other(i int) {
	lazySlice.s = append(lazySlice.s, i)
}
