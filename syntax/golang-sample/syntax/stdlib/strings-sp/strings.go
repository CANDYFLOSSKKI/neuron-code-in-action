package strings_sp

import (
	"fmt"
	"strings"
)

// 1-复制字符串
// func Clone(s string) string

// 2-比较字符串
// 前者大返回1;后者大返回-1;相等返回0
// func Compare(a, b string) int

// 3-包含子串
// func Contains(s, substr string) bool			是否包含指定子串
// func ContainsAny(s, chars string) bool		是否包含字符列表中的每个字符
// func ContainsRune(s string, r rune) bool		是否包含指定字符

// 4-子串出现次数
// func Count(s, substr string) int

// 5-删除子串
// found标识是否找到子串
// before和after分别是这个子串左右的两半边
// func Cut(s, sep string) (before, after string, found bool)

// 6-忽略大小写判等
// func EqualFold(s, t string) bool

// 7-分割字符串
// func Fields(s string) []string							空格分割
// func FieldsFunc(s string, f func(rune) bool) []string	指定字符分割
// 注意指定字符的情况是函数参数:
func test() {
	str := "a,b,c,d,e,f,g"
	strSlice := strings.FieldsFunc(str, func(r rune) bool {
		return r == ','
	})
	fmt.Println(strSlice)
}

// func Split(s, sep string) []string
// func SplitN(s, sep string, n int) []string	指定分割次数
// func SplitAfter(s, sep string) []string		将分割词保存在每个子串的末尾
// func SplitAfterN(s, sep string, n int) []string

// 8-判断前缀后缀
// func HasPrefix(s, prefix string) bool	是否以指定字符为前缀
// func HasSuffix(s, suffix string) bool	是否以指定字符为后缀

// 9-查找子串
// func Index(s, substr string) int			子串首次出现索引值
// func IndexAny(s, chars string) int		字符序列中每个字符索引值的最小值
// func IndexRune(s string, r rune) int		单个字符首次出现索引值
// 最后一次出现的函数同理:
// func LastIndex(s, substr string) int
// func LastIndexAny(s, chars string) int

// 10-字符映射
// 对给定字符串的每个字符都经过一次映射
// func Map(mapping func(rune) rune, s string) string
func test2() {
	str := "abcdefg"
	strMap := strings.Map(func(r rune) rune {
		// 将每个字符的Unicode码点减32
		return r - 32
	}, str)
	fmt.Println(strMap)
}

// 11-复制字符串
// func Repeat(s string, count int) string

// 12-替换子串
// n用于指定替换次数,将n设为<0就是替换所有的满足子串(也可以使用ReplaceAll)
// func Replace(s, old, new string, n int) string
// func ReplaceAll(s, old, new string) string

// 13-大小写转换
// func ToLower(s string) string
// func ToUpper(s string) string

// 给定unicode.SpecialCase转换大小写:
// func ToLowerSpecial(c unicode.SpecialCase, s string) string
// func ToUpperSpecial(c unicode.SpecialCase, s string) string

// 14-修剪字符串
// ①cutset表示的是字符集合,只要碰到cutset中有的字符就删除,没有就停止
// func Trim(s, cutset string) string
// func TrimLeft(s, cutset string) string
// func TrimRight(s, cutset string) string

// ②前缀和后缀是整个子串参与比较(仅比较一次),有就删除,没有就停止
// func TrimPrefix(s, suffix string) string
// func TrimSuffix(s, suffix string) string

//常用工具:

// 1-StringBuilder(同Java,仅语法不同)
// type Builder struct {}
// Builder不支持值拷贝(值拷贝后仍然是对同一个切片指针进行操作)
func test3() {
	builder := strings.Builder{}
	builder.WriteString("hello") // =>append()
	builder.WriteString(" world")
	fmt.Println(builder.Len())    // =>length()
	fmt.Println(builder.String()) // =>toString()
}

// 2-Replacer
// func NewReplacer(oldnew ...string) *Replacer
// Replacer的参数次序非常特殊,比如有如下的替换表:
// A => a
// B => b
// 此时Replacer的参数应该为 A,a,B,b
func test4() {
	replacer := strings.NewReplacer("<", "&lt;", ">", "&gt;")
	strRe := replacer.Replace("This is <b>HTML</b>!")
	fmt.Println(strRe)
}
