package map_sp

import (
	"fmt"
	"math"
	"math/rand"
)

func Test() {
	mp := map[string]int{
		"a": 0,
		"b": 1,
		"c": 2,
		"d": 3,
	}
	// 1-存在性字段
	// map中取每个元素都包含两个返回值:
	// ①对应类型的值
	// ②表示该键值对是否存在的布尔值
	// 下方if语句采用多重赋值语法,可将布尔型变量exist的声明和赋值合并在一行
	if val, exist := mp["f"]; exist {
		fmt.Println(val)
	} else {
		fmt.Println("键值对不存在")
	}

	// 不要把math.NaN()作为键,每次添加该键所对应的键值对时哈希值都不相同,导致设置的值是无效的
	// 即NaN在编译器中可以存在无限多个键值,且只能添加不能删除
	mpp := make(map[float64]string, 10)
	mpp[math.NaN()] = "a"
	mpp[math.NaN()] = "b"
	mpp[math.NaN()] = "c"
	_, exist := mpp[math.NaN()]
	fmt.Println(exist)
	fmt.Println(mpp)

	// 2-实现Set
	// Go中没有set结构,只能使用map间接构造
	// map的值类型可视为set的泛型
	set := make(map[int]struct{}, 10)
	for i := 0; i < 10; i++ {
		set[rand.Intn(100)] = struct{}{}
	}
	fmt.Println(set)
}
