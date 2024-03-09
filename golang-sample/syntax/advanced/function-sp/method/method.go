package method

import "fmt"

// 方法是指定调用者的函数
// 从作用角度上看,方法是在调用者类型基础上的扩展(相当于在type上定义函数)

// 1-值接收者和指针接收者
// 值接收者:接收者是原始类型,因为函数值传递的特性,对接收者的修改无法反映到原变量中
// 指针接收者:接收者是指针类型,此时对接收者的修改都会反映到原变量中(对内存进行修改)
// 实际上,调用指针接收者方法的时候Go会自动取出类型变量的地址,两者的使用方法是一样的

type IntSlice []int

func (i *IntSlice) Get(index int) int {
	return (*i)[index]
}
func (i *IntSlice) Set(index, val int) {
	(*i)[index] = val
}

func Test() {
	intSlice := make(IntSlice, 10, 20)
	// 方法必须由指定类型的调用者才可以调用
	// 方法的方法体也通常是对调用者内部结构的修改
	intSlice.Set(0, 0)
	intSlice.Get(0)
}

// 2-接口实现
// ①如果指针调用者实现了接口方法,那么接口的实现类型就是指针类型(初始化时加&)
// ②如果值调用者实现了接口方法,那么接口的实现类型就是值类型

// 指针调用者和值调用者仅在接口的实现者上体现区别,调用方法时指针对象和原对象都适用
// 有接口参与的场合,建议所有的方法都统一为值调用者/指针调用者

type Animal interface {
	Run()
}
type Dog struct {
}

func (d *Dog) Run() {
	fmt.Println("Run")
}

func Test2() {
	var ani Animal
	ani = &Dog{}
	ani.Run()

	dog := Dog{}
	dog.Run()
}
