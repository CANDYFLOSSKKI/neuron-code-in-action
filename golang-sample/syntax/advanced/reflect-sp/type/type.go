package _type

import (
	"fmt"
	"reflect"
)

// ①反射可以将interface{}/any类型变量转换为反射对象
// ②反射可以将反射对象还原为interface{}/any类型变量
// ③修改反射对象的前提是其值是可设置的

// reflect.TypeOf() 		获取变量的具体类型
// Type.Kind() 				获取类型的基础类型
// Type.Elem() 				专用于获取引用类型(对指针类型可以返回内部指向的类型)
// Type.Comparable() 		判断类型是否是可比较的
// Type.Implements() 		判断类型是否实现了指定接口
// Type.ConvertibleTo() 	判断类型是否可以转换到指定类型

// reflect.ValueOf() 		获取实例变量的反射值
// Value.Type() 			获取反射值的类型
// Value.Elem() 			接口类型返回存储的值;指针类型返回指向的值
// Value.Addr() 			返回指向该Value变量地址的指针
// Value.Pointer() 			返回指向该Value对应原始值地址的指针(原始值要求引用类型)
// Value.Set() 				整体替换反射值
// Value.Interface() 		返回Value反射值当前存储的any值

// reflect.Type 可以表示类型
func test() {
	// 1-reflect-sp.TypeOf() 可以获取任意变量的具体类型(返回Type类型)
	str := "reflect-sp test"
	fmt.Println(reflect.TypeOf(str)) // string

	// 2-Type.Kind() 可以获取某个Type变量的基础类型
	// 使用自定义类型时,TypeOf()会返回该自定义类型,Kind()会返回基础类型(接口/结构体)
	type MyStruct struct{}
	var myValue MyStruct = MyStruct{}
	fmt.Println(reflect.TypeOf(myValue))        // MyStruct
	fmt.Println(reflect.TypeOf(myValue).Kind()) // struct

	// 3-Type.Elem()
	// Elem()只适用于引用类型,包括:①数组;②通道;③映射表;④切片;⑤指针
	// 当类型是指针类型时,Elem()可以返回其内部指向的类型(处理指针时非常好用)
	var intPointer *int = new(int)
	fmt.Println(reflect.TypeOf(intPointer).Elem()) // int

	// 4-Type.Comparable 可以判断某个类型是否可比较
	// (见Interface-sp => comparable-sp)
	fmt.Println(reflect.TypeOf("hello world!").Comparable()) // true
	fmt.Println(reflect.TypeOf(1024).Comparable())           // true
	fmt.Println(reflect.TypeOf([]int{}).Comparable())        // false(切片不可比较)
	fmt.Println(reflect.TypeOf(struct{}{}).Comparable())     // true

	// 5-Type.Implements(Type) 可以判断某个类型是否实现了指定接口
	// 6-Type.ConvertibleTo() 可以判断某个类型是否可以被转换到指定类型
	type MyInterface interface {
		My() string
	}
	ifaceType := reflect.TypeOf(new(MyInterface)).Elem()
	fmt.Println(reflect.TypeOf(MyStruct{}).Implements(ifaceType))
	fmt.Println(reflect.TypeOf(MyStruct{}).ConvertibleTo(ifaceType))

}
