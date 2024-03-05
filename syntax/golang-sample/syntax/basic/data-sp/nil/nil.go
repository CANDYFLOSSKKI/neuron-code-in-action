package nil

import (
	"fmt"
	"io"
)

func Test() {
	// nil可用于表示如下类型的零值
	var a []string       // 切片
	var b map[string]int // 映射表
	var c *int           // 指针
	var d func(int) int  // 函数
	var e io.Writer      // 接口
	var f chan int       // 通道

	// 对上述引用类型执行判空操作时,nil可以正确的起到null的作用(针对不同变量有不同逻辑)
	// 不同类型的零值虽然都==nil,但他们之间不相等,无法比较
	// nil==nil也无法通过编译
	fmt.Println(a == nil)
	fmt.Println(b == nil)
	fmt.Println(c == nil)
	fmt.Println(d == nil)
	fmt.Println(e == nil)
	fmt.Println(f == nil)

	// nil仅仅是变量名,因此可以随意更改nil的值以覆盖原有的逻辑(不推荐)
	var nil = 3
	fmt.Println(nil)
}
