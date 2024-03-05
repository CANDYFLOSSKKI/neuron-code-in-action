package input

import (
	"bufio"
	"fmt"
	"os"
)

// fmt包下的输入函数
// 扫描从os.Stdin读入的文本，根据空格分隔，换行也被当作空格
// func Scan(a ...any) (n int, err error)
//
// 与Scan类似，Sa遇到换行停止扫描
// func Scanln(a ...any) (n int, err error)
//
// 根据格式化的字符串扫描
// func Scanf(format string, a ...any) (n int, err error)

func Test() {
	var s, s2 string

	// 1-fmt函数输入
	// fmt.Scan
	fmt.Scan(&s, &s2)
	// fmt.Scanln
	fmt.Scanln(&s, &s2)
	// fmt.Scanf
	var s3, s4, s5 string
	fmt.Scanf("%s %s \n %s", &s3, &s4, &s5)

	// 2-缓冲输入输出(提高性能)
	// 缓冲流是嵌套在标准流上的,因此需要标准输入输出函数传参
	// 输入(Scan()方法以换行符为分隔符,每次读取输入流下一行作为字符串返回)
	scanner := bufio.NewScanner(os.Stdin)
	scanner.Scan()

	// 输出(使用Flush清空缓冲区)
	writer := bufio.NewWriter(os.Stdout)
	writer.WriteString("Testing")
	writer.Flush()
}
