package _struct

import (
	"fmt"
	"reflect"
)

type Person struct {
	Name    string `json:"name"`
	Age     int    `json:"age"`
	Address string `json:"address"`
	money   int
}

func (p Person) Talk(msg string) string {
	return msg
}

// 1-结构体字段获取
// reflect-sp.StructField类型可表示结构体字段信息,结构如下:
//
//	type StructField struct {
//			Name string		字段名称
//			PkgPath string	字段所属包名
//			Type Type		字段类型
//			Tag StructTag	字段标签
//			Offset uintptr	字段字节偏移
//			Index []int		字段索引
//			Anonymous bool	字段是否为嵌套字段
//	}
//
// ①Type.Field(int) 可以通过字段在结构体中声明顺序的索引值获取字段信息
// ②Type.FieldByName(string) 可以通过字段名获取字段信息(两个返回值,包括成功与否的标记)
func test() {
	rType := reflect.TypeOf(new(Person)).Elem()
	fieldByInt := rType.Field(1)
	fmt.Println(fieldByInt.Name)
	// Type的FieldByName()是双参数方法
	if fieldByName, ok := rType.FieldByName("Name"); ok {
		fmt.Println(fieldByName.Name)
	}
}

// 2-结构体字段修改
// Go的参数传递都是值传递,反射值同理,因此需要传递结构体的指针,修改指针的Elem()底层值
// 对结构体私有字段(即首字母小写字段)的修改需要额外逻辑(涉及Unsafe)
func test2() {
	// 获取结构体指针的指向值
	rValue := reflect.ValueOf(&Person{
		Name:    "",
		Age:     0,
		Address: "",
		money:   0,
	}).Elem()
	// Value的FieldByName()是单参数方法
	name := rValue.FieldByName("Name")
	name.SetString("Ex-aid")
	fmt.Println(rValue.Interface().(Person))
}

// 3-结构体方法获取
// 方法可使用reflect.Method类型接收,结构如下:
//
//	type Method struct {
//			Name string		方法名
//			PkgPath string	包名
//			Type Type		方法类型
//			Func Value		方法对应的函数(首个参数变为方法的调用者)
//			Index int		方法索引
//	}
//
// Type.Method(int) 可通过方法声明顺序先后的索引值获取方法信息
func test3() {
	rType := reflect.TypeOf(new(Person)).Elem()
	// ①输出方法个数
	fmt.Println(rType.NumMethod())
	// ②遍历输出方法信息
	for i := 0; i < rType.NumMethod(); i++ {
		method := rType.Method(i)
		fmt.Println(method.Index, method.Name, method.Type, method.IsExported())

		// 方法的参数和返回值被封装到Func成员中了,访问逻辑同方法的操作
		fmt.Println("方法参数")
		for i := 0; i < method.Func.Type().NumIn(); i++ {
			fmt.Println(method.Func.Type().In(i).String())
		}
		fmt.Println("方法返回值")
		for i := 0; i < method.Func.Type().NumOut(); i++ {
			fmt.Println(method.Func.Type().Out(i).String())
		}
	}
}

// 4-结构体方法调用
// 获取结构体字段和方法信息时,使用的是Type类型进行操作,不包含具体对象
// 修改/调用结构体字段和方法时,使用的是Value类型进行操作,创建时已经传入了具体对象
// 因此调用结构体方法和调用函数的逻辑相同,不需要调用者(直接在传入对象上操作)
func test4() {
	// 调用方法通常涉及到对象的更改,建议传入对象指针
	rValue := reflect.ValueOf(new(Person)).Elem()
	talk := rValue.MethodByName("Talk")

	// Call()调用方法,调用者就是参数的new(Person)
	res := talk.Call([]reflect.Value{reflect.ValueOf("hello,reflect-sp!")})
	for _, re := range res {
		fmt.Println(re.Interface())
	}
}
