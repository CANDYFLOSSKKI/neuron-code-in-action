package cycle_sp

import "fmt"

// Go中没有while循环,for循环继承了while循环,可代替使用

func Test() {
	// 1-普通for循环
	for i := 0; i <= 20; i++ {
		fmt.Println(i)
	}

	// 2-代替while循环的for循环
	num := 1
	for num < 100 {
		num *= 2
	}

	// 3-for range迭代索引(类似v-for)
	// index为迭代数据的索引,value是对应索引下的值
	// range后是要进行迭代的数据源
	sequence := "hello world"
	for index, value := range sequence {
		fmt.Println(index, value)
	}
}

// 4-for+字符串的字节遍历和字符遍历
func test() {
	// string是只读的字节切片,存储的是字节而不是字符
	// 在标准的索引for循环中,如果遇到中文等多字节字符,不会输出正确结果
	str := "测试字符串"
	for i := 0; i < len(str); i++ {
		fmt.Printf("%d,%x,%s\n", str[i], str[i], string(str[i]))
	}

	// for range遍历字符串会自动使用rune类型变量存放当前结果
	// rune类型是int32的别名,可以存储输出正确结果
	for _, r := range str {
		fmt.Printf("%d,%x,%s\n", r, r, string(r))
	}
	// 也可以手动转为rune切片再遍历
	runes := []rune(str)
	for i := 0; i < len(runes); i++ {
		fmt.Println(string(runes[i]))
	}
}
