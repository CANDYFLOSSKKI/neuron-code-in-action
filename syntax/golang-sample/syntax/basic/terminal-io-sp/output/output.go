package output

import (
	"fmt"
	"os"
)

// 标准输入输出函数(同属os包)
// var (
//	 Stdin  = NewFile(uintptr(syscall.Stdin), "/dev/stdin")
//	 Stdout = NewFile(uintptr(syscall.Stdout), "/dev/stdout")
//	 Stderr = NewFile(uintptr(syscall.Stderr), "/dev/stderr")
// )

func Test() {
	// 1-输出的常用方法
	// os.Stdout
	os.Stdout.WriteString("Testing")

	// 原生println
	println("Testing")

	// fmt.Println/Print(支持格式化输出,但性能最差)
	fmt.Println("Testing")

	// 2-格式化输出									(可接收的类型)
	// %%	输出百分号%								任意类型
	// %s	输出string/[] byte值						string,[] byte
	// %q	格式化字符串，输出的字符串两端有双引号""		string,[] byte
	// %d	输出十进制整型值							整型类型
	// %f	输出浮点数								浮点类型
	// %e	输出科学计数法形式 ,也可以用于复数			浮点类型
	// %E	与%e相同									浮点类型
	// %g	根据实际情况判断输出%f或者%e,会去掉多余的0		浮点类型
	// %b	输出整型的二进制表现形式					数字类型
	// %#b	输出二进制完整的表现形式					数字类型
	// %o	输出整型的八进制表示						整型
	// %#o	输出整型的完整八进制表示					整型
	// %x	输出整型的小写十六进制表示					数字类型
	// %#x	输出整型的完整小写十六进制表示				数字类型
	// %X	输出整型的大写十六进制表示					数字类型
	// %#X	输出整型的完整大写十六进制表示				数字类型
	// %v	输出值原本的形式，多用于数据结构的输出			任意类型
	// %+v	输出结构体时将加上字段名					任意类型
	// %#v	输出完整Go语法格式的值						任意类型
	// %t	输出布尔值								布尔类型
	// %T	输出值对应的Go语言类型值					任意类型
	// %c	输出Unicode码对应的字符					int32
	// %U	输出字符对应的Unicode码					rune,byte
	// %p	输出指针所指向的地址						指针类型

	// 在格式字符串的%和动词间加上空格,可以实现分隔符效果
	str := "abcdefg"
	fmt.Printf("%x\n", str)  // 61626364656667
	fmt.Printf("% x\n", str) // 61 62 63 64 65 66 67

	// 使用逗号,输出多个变量时,默认的分隔符是空格
	s, s2 := "a", "b"
	fmt.Println(s, s2) // a b(空格分隔)
}
