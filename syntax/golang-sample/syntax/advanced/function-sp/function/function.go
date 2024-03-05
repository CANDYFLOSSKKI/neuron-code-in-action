package function

import (
	"errors"
	"fmt"
	"math"
)

// Go不支持函数重载
// Go的函数参数始终为值传递(即copy实参的值)

// 1-函数的三种声明方式
// func DoSomething() {}	直接声明(推荐,后直接跟函数体)
// var doSomething func()	字面量声明
// type DoAnything func()	类型声明

// 仅声明函数类型时,可以不指定形参名
var sum func(int, int) int

func Test() {
	sum = func(a, b int) int {
		return a + b
	}
}

// 2-变长参数
// 变长参数必须声明在参数列表的末尾,可接收 0~任意个参数()
// 变长参数在函数内部直接视为切片类型,可用len()判断具体传入的实参个数
func max(args ...int) int {
	max := math.MinInt64
	for _, arg := range args {
		if arg > max {
			max = arg
		}
	}
	return max
}

// 3-命名返回值
// 只有return后不接变量名时,返回值设定的自定义名才有意义
// 优先以return为准
func sumAns(a, b int) (ans int) {
	ans = a + b
	return // 没有指定返回变量,采用命名值,实际返回值等价于return ans
}

// 4-多返回值
// 多个返回值以逗号,相隔
func div(a, b float64) (float64, error) {
	if a == 0 {
		return math.NaN(), errors.New("0不能作为被除数")
	}
	return a / b, nil
}

// 5-匿名函数延迟调用
// 函数内部以defer关键字标记的函数会在返回之前被调用(通常作为finally释放资源)
// 多个defer函数以队列的先后顺序执行(先进先出),发生panic时调用顺序会相反
func do() {
	defer func() {
		fmt.Println("1")
	}()
	fmt.Println("2")
}
