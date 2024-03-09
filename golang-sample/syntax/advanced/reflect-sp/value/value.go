package value

import (
	"fmt"
	"reflect"
)

// reflect.Value 可以表示反射接口的值
func test() {
	// 1-reflect-sp.ValueOf() 可以获取某个变量的值(返回Value类型)
	str := "reflect-sp test"
	var strValue reflect.Value = reflect.ValueOf(str)
	fmt.Println(strValue)

	// 2-Value.Type() 可以获取某个反射值的类型
	// 反射值实际上同时包含值和类型,因此大部分Type的方法都对Value生效
	var strType reflect.Type = strValue.Type()
	fmt.Println(strType)

	// 3-Value.Elem()
	// ①如果反射值是接口类型,返回其存储的值
	// ②如果反射值是指针类型,返回其指向的值
	// ③如果反射值不是接口也不是指针,报错panic
	var numPointer *int = new(int)
	*numPointer = 8
	fmt.Println(reflect.ValueOf(numPointer).Elem()) // 8

	// 4-Value.Addr() 返回指向该value地址的指针
	// 5-Value.Pointer() 返回指向该value原始值地址的指针(原始值必须是引用类型)
	num := 9
	slice := make([]int, 10, 100)
	slice[0] = 1
	numPtr := reflect.ValueOf(num).Addr()
	slicePtr := reflect.ValueOf(slice).Pointer()
	fmt.Println(&numPtr)
	fmt.Println(&slicePtr)

	// 6-Value.Set(Value) 对反射值设置替换
	// 原始Set要求参数也是Value类型,Set还存在SetInt等Set<T>变体形式,允许给定类型参数
	// 对指针类型的反射值应该先调用Elem()指向底层元素再执行操作
	rValue := reflect.ValueOf(numPointer)
	rElemValue := rValue.Elem()
	rElemValue.SetInt(114514)
	fmt.Println(rElemValue.Interface())

	// 7-Value.Interface() 可以将反射值(Value)的当前值转换为any/interface{}类型
	// 反射值反向转换为any类型后,再使用显式类型转换即可
	var strIn string = "value interface"
	strInValue := reflect.ValueOf(strIn)
	if v, ok := strInValue.Interface().(string); ok {
		fmt.Println(v)
	}
}
