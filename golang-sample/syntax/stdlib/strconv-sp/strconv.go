package strconv_sp

import (
	"fmt"
	"strconv"
)

// 1-整形<-->字符串
// func Atoi(s string) (int, error)
// func Itoa(i int) string

// 2-布尔值<-->字符串
// func ParseBool(str string) (bool, error)
// func FormatBool(b bool) string

// 3-浮点数<-->字符串
// func ParseFloat(s string, bitSize int) (float64, error)
// func FormatFloat(f float64, fmt byte, prec, bitSize int) string
// ①fmt		格式化类型
// ②prec		精度(通常表示小数位数)
// ③bitSize  	位数(32或64)

// 常用的格式化类型:
// 'b' 	-ddddp±ddd,二进制指数
// 'e' 	-d.dddde±dd,小写e十进制指数
// 'E' 	-d.ddddE±dd,大写E的十进制指数
// 'f' 	-ddd.dddd,没有指数(一般情况)
// 'g' 	大指数采用'e';小指数采用'f'
// 'G' 	大指数采用'e';小指数采用'f'
// 'x' 	-0xd.ddddp±ddd,十六进制分数和二进制指数
// 'X' 	-0Xd.ddddP±ddd,十六进制分数和二进制指数

// 4-复数<-->字符串
// func ParseComplex(s string, bitSize int) (complex128, error)
// func FormatComplex(c complex128, fmt byte, prec, bitSize int) string

// 字符串追加数据
func test() {
	str := "abcdefg"
	str_app := strAppend(&str)
	fmt.Println(str_app)
}
func strAppend(str *string) string {
	byteArr := []byte(*str)
	// strconv.AppendInt()
	// strconv.AppendFloat()
	// strconv.AppendBool()
	byteArr = strconv.AppendInt(byteArr, 10, 10)
	byteArr = strconv.AppendFloat(byteArr, 1.2222, 'f', 2, 64)
	byteArr = strconv.AppendBool(byteArr, false)
	return string(byteArr)
}
