package _struct

import (
	"fmt"
)

// Programmer
// 1-结构体类型的声明(类似Typescript)
type Programmer struct {
	Name     string
	Age      int
	Job      string
	Language []string
}
type Rectangle struct {
	height, width, area int
	color               string
}

func Test() {
	// 2-结构体变量的初始化
	// 可以省略字段名称,直接赋值
	programmer := Programmer{
		"jack",
		19,
		"coder",
		[]string{"Go", "C++"}}
	fmt.Print(programmer.Name)
}

// NewProgrammer
// 3-工厂方法初始化结构体
// 可以传入自定义参数,形成类似构造函数的形式
func NewProgrammer() Programmer {
	return Programmer{
		"jack",
		19,
		"coder",
		[]string{"Go", "C++"}}
}

// Person
// 4-结构体间的组合关系
type Person struct {
	name string
	age  int
}

type Student struct {
	p      Person
	school string
}
type Employee struct {
	Person
	job string
}

func Test2() {
	// 如果是像Student实现自定义名,初始化时需要显式指定自定义字段
	student := Student{
		p:      Person{name: "jack", age: 18},
		school: "lili school",
	}
	fmt.Println(student.p.name)

	// 如果是像Employee实现匿名组合,初始化时字段默认为类名
	// 此时可以直接访问组合对象的一级成员,调用更加简便(除此之外没有区别)
	employee := Employee{
		Person: Person{name: "jack", age: 18},
		job:    "lili company",
	}
	fmt.Println(employee.name)
}
