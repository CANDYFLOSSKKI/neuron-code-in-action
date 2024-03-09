package new_make

import (
	"fmt"
	"reflect"
)

// 1-反射可以根据给定的Type创建Value(基础类型专用)
// func New(typ Type) Value
func test() {
	rStr := reflect.New(reflect.TypeOf(*(new(string))))
	rStr.Elem().SetString("test")
	fmt.Print(rStr.Elem().Interface())
}

// 2-MakeSlice反射创建切片
// func MakeSlice(typ Type, len, cap int) Value

// 3-MakeMapWithSize反射创建映射表
// func MakeMapWithSize(typ Type, n int) Value

// 4-MakeChan反射创建管道
// func MakeChan(typ Type, buffer int) Value

// 5-MakeFunc反射创建函数
// func MakeFunc(typ Type, fn func(args []Value) (results []Value)) Value
func test2() {
	// 反射内部调用方法只能采用[]Value切片参数,因此[]reflect-sp.Value通常不更改
	fn := reflect.MakeFunc(reflect.TypeOf(new(func(int))).Elem(), func(args []reflect.Value) (results []reflect.Value) {
		for _, arg := range args {
			fmt.Println(arg.Interface())
		}
		return nil
	})
	rtValue := fn.Call([]reflect.Value{reflect.ValueOf(1024)})
	for _, value := range rtValue {
		fmt.Println(value.Interface())
	}
}

// 反射判等
// reflect-sp.DeepEqual(x,y)可从反射角度判断相同类型变量是否相等

// ①数组		数组中的每一个元素都DeepEqual
// ②切片		都为nil时必定DeepEqual,都不为nil时需要相同长度且指向相同位置或元素都DeepEqual
// ③结构体		所有字段都DeepEqual
// ④映射表		都为nil时必定DeepEqual,都不为nil时需要每一个键所映射的值都DeepEqual
// ⑤指针		指向同一个元素或指向的元素DeepEqual
// ⑥接口		接口的具体类型DeepEqual
// ⑦函数		只有两者都为nil时才DeepEqual
