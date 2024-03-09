package sort_sp

import (
	"fmt"
	"sort"
)

// 1-预先实现的排序函数
// sort.Ints([]int)		整形排序
// sort.Float64s([]float64)	浮点数排序
// sort.Strings([]string)	字符串排序

// 2-封装可排序切片
// sort.IntSlice([]int)
// sort.Float64Slice([]float64)
// sort.StringSlice(string[])

// 封装的好处是可以实现排序接口的这几个方法
// 实现自定义可排序切片时必须实现这三个接口方法

type Interface interface {
	Len() int           // 求长度
	Less(i, j int) bool // 元素比较
	Swap(i, j int)      // 元素交换
}

// 3-逆序排序
// func Reverse(data Interface) Interface
func test() {
	intSlice := []int{1, 3, 5, 9, 2, 7, 0, 8}
	// 先封装为可排序切片IntSlice,再逆序操作,最后排序
	sort.Sort(
		sort.Reverse(
			sort.IntSlice(intSlice)))
	fmt.Println(intSlice)
}

// 4-自定义结构体的可排序切片

type Student struct {
	id   int
	name string
	age  int
}
type StudentSlice []Student

// 接下来实现sort.Interface的三个接口方法:
// ①Len()
// ②Less()
// ③Swap()

func (stu StudentSlice) Len() int {
	return len(stu)
}
func (stu StudentSlice) Less(i, j int) bool {
	return stu[i].id < stu[j].id
}
func (stu StudentSlice) Swap(i, j int) {
	stu[i], stu[j] = stu[j], stu[i]
}

// 实际上通常并不是要显式调用这三个方法
// 只要实现了sort.Interface接口,就可以把自定义切片放进sort.Sort()函数里排序了
func test2() {
	data := StudentSlice([]Student{
		{1000, "Ming", 18},
		{1001, "Zhang", 20},
		{1002, "Zhao", 22},
	})
	sort.Sort(data)
	fmt.Println(data)

	// 还可以通过sort.IsSorted()函数判断当前是否已经有序了
	fmt.Println(sort.IsSorted(data))
}
