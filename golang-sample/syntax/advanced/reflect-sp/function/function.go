package function

import (
	"fmt"
	"reflect"
)

func Max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// 1-Type实现函数各项特征信息的获取
func test() {
	rType := reflect.TypeOf(Max)

	// ①输出函数名称(字面量函数类型没有名称)
	fmt.Println(rType.Name())

	// ②输出参数,返回值数量
	// NumIn() 	输入参数数量,In(int)可以指定某个索引值的参数
	// NumOut() 输出参数数量,Out(int)可以指定某个索引值的返回值
	fmt.Println(rType.NumIn(), rType.NumOut())
	rParamType := rType.In(0)

	// ③输出参数类型
	fmt.Println(rParamType.Kind())
	rResType := rType.Out(0)

	// ④输出返回值类型
	fmt.Println(rResType.Kind())
}

// 2-Value.Call()反射方式调用函数
func test2() {
	rType := reflect.ValueOf(Max)
	// 传入函数参数数组:
	// Call()的参数是[]Value切片类型,因此所有实参都需要使用Value类型包装
	// 返回值也是Value类型
	rResValue := rType.Call([]reflect.Value{reflect.ValueOf(18), reflect.ValueOf(50)})
	for _, value := range rResValue {
		fmt.Println(value.Interface())
	}
}
