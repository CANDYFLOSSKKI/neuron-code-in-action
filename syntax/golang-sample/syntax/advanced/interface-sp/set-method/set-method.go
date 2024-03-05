package set_method

import "fmt"

// 泛型之前,接口是方法的集合,方法集接口的实现关系只和方法相关(基本接口)
// 泛型之后,接口可以声明为类型集,类型集接口的实现关系只和类型相关(通用接口)
// 类型集和方法集之间不互通

// 1-实现接口
// T实现接口I的前提:
// ①T是一个类型type,且类型T是接口I类型集中的元素
// ②T是一个接口interface,且接口T的类型集是I类型集的子集

// Crane 起重机接口
type Crane interface {
	JackUp() string
	Hoist() string
}

// CraneA 起重机A
type CraneA struct {
	work int //内部的字段不同代表内部细节不一样
}

func (c CraneA) Work() {
	fmt.Println("使用技术A")
}
func (c CraneA) JackUp() string {
	c.Work()
	return "jackUp"
}
func (c CraneA) Hoist() string {
	c.Work()
	return "hoist"
}

// CraneB 起重机B
type CraneB struct {
	boot string
}

func (c CraneB) Boot() {
	fmt.Println("使用技术B")
}
func (c CraneB) JackUp() string {
	c.Boot()
	return "jackUp"
}
func (c CraneB) Hoist() string {
	c.Boot()
	return "hoist"
}

type ConstructionCompany struct {
	Crane Crane // 只根据Crane类型来存放起重机
}

func (c *ConstructionCompany) Build() {
	fmt.Println(c.Crane.JackUp())
	fmt.Println(c.Crane.Hoist())
	fmt.Println("建筑完成")
}

func Test() {
	ce := ConstructionCompany{
		Crane: CraneB{"BootB"},
	}
	ce.Build()
}

// 2-接口间继承

// Person 作为匿名成员可以直接调用,Man是其直接超集
type Person interface {
	Say(string) string
	Walk(int)
}
type Man interface {
	Exercise()
	Person
}

// 3-空接口
// 空接口类型的变量可以接收任何类型的值,两者判等时先判断其底层类型是否相等,再判断值是否相等
// 通常令any和匿名空接口等价(类型别名)
type any interface{}

// 底层类型的比较策略如下:
// 数字类型	 	值是否相等
// 字符串类型		值是否相等
// 数组类型	 	数组的全部元素是否相等
// 切片类型	 	不可比较
// 结构体	 	字段值是否全部相等
// map类型		不可比较
// 通道			地址是否相等
// 指针			指针存储的地址是否相等
// 接口			底层所存储的数据是否相等
