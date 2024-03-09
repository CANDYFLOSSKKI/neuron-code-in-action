package template_sp

import (
	"embed"
	"fmt"
	"os"
	"text/template"
)

// 模版字符串
// 模版字符串相当于外置的fmt格式化字符串
// 模版字符串的处理流程是固定的:
func test() {
	// ①根据指定的模版语法编写模版字符串:
	tmpl := `Template string: {{ .message }}`

	// ②解析模版字符串
	// func (t *Template) Parse(text string) (*Template, error)
	if te, err := template.New("texTmpl").Parse(tmpl); err != nil {
		fmt.Println(err)
	} else {
		// ③将实际数据导入模版字符串,生成最终字符串
		// Execute()方法会直接将最终的字符串输出到指定的流中
		// func (t *Template) Execute(wr io.Writer, data any) error
		data := map[string]any{
			"message": "hello world!",
		}
		if err := te.Execute(os.Stdout, data); err != nil {
			fmt.Println(err)
		}
	}
}

var str string
var data any

// 模版字符串语法
// 所有的模版参数都用花括号{{ }}标识
// 模版块内部也可以有字面量 {{ “jack" }},这一点在函数中使用较多
func test2() {
	// 1-参数(.)
	// 打个比方,传入的数据(结构体/映射表)是data
	// 对应的参数就是data.msg,因此参数用点运算符.标识传入的数据对象
	str = `{{ .msg }}`           // data.msg
	str = `{{ .person.father }}` // data.person.father

	// 如果想表示的是索引值而非字段名,可以使用index函数实现
	str = `{{ index . 1 }}`     // data[1]
	str = `{{ index . 1 2 3 }}` // data[1][2][3](适用于多维切片)

	// 还可以将两者组合起来实现更复杂的效果
	str = `{{ index .dict key }}` // data[dict].key

	// 参数前后加横线 - 可以清除参数前后的空白(注意-和参数之间要隔一个空格)
	str = `{{ .x }} {{ - .op - }} {{ .y }}`

	// 2-变量($)
	// 模版内的变量同样可以使用:=进行短变量初始化
	// 进行变量赋值的模版块不会输出任何字符,再次直接调用变量时才会输出
	str = `{{ $name := .name }} {{- $name }}` // 只输出后面的name

	// 3-函数
	// and		与运算		{{ and true false }}
	// or		或运算		{{ or true false }}
	// not		取反运算		{{ not true }}
	// eq		是否相等		{{ eq 1 2 }}
	// ne		是否不相等	{{ ne 1 2 }}
	// lt		小于			{{ lt 1 2 }}
	// le		小于等于		{{ le 1 2 }}
	// gt		大于			{{ gt 1 2 }}
	// ge		大于等于		{{ ge 1 2 }}
	// len		长度			{{ len .slice }}
	// index	指定索引		{{ index . 0 }}
	// slice	切片扩展		{{ slice . 1 2 3 }} (等价于s[1:2:3])

	// html			HTML转义			{{ html .name }}
	// js			js转义			{{ js .name }}
	// print		fmt.Sprint		{{ print . }}
	// printf		fmt.Sprintf		{{ printf "%s" .}}
	// println		fmt.Sprintln	{{ println . }}
	// urlquery		url query转义	{{ urlquery .query }}

	// 4-模版中调用外部函数
	// ①调用数据结构体data中的函数
	data = map[string]any{
		// data中定义名为string的函数
		"string": func(val any) string { return fmt.Sprintf("%v: 2048", val) },
	}
	//模版中使用call调用这个string函数
	// call .<函数名> <参数列表>
	str = `{{ call .string 1024 }}`

	// ②创建模版内的自定义函数
	// func (t *Template) Funcs(funcMap FuncMap) *Template
	tmp := template.New("TMP")
	tmp.Funcs(template.FuncMap{
		// 自定义模版函数通常包含两个返回值: 正确操作的返回值和报错
		"add": func(val any) (string, error) { return fmt.Sprintf("%v+1", val), nil },
	})
	// 注意必须要用定义了自定义函数的Template解析模版字符串
	tmp.Parse(`{{ add 1024 }}`)

	// 5-局部变量with
	// with的第一种使用方法是当if使用,返回不为空时进入with,为空时进入else
	str = `{{ with <有返回值的操作> }} 
				返回值时不为空打印该行
			{{ else }} 
				返回值为空打印该行
			{{ end }}`
	// with的第二种使用方法时创建with域内的局部变量,该变量可以覆盖同名的外部变量
	// 在with域内name被改写为jack,因此第一个name是jack,第二个name是mike
	str = `{{ $name := "mike" }}
			{{ with $name := "jack" }} 
				{{- $name -}}
			{{ end }}
			{{- $name -}}`

	// 6-条件if
	str = `{{ if <有返回值的操作> }}
				条件1满足时打印
			{{ else if <有返回值的操作> }}
				条件2满足时打印
			{{ else }}
				条件都不满足时打印
			{{ end }}`

	// 7-迭代循环range
	str = `{{ range $index, $val := . }}
				{{- if eq $index 0 }}
					{{- continue -}}
				{{ end -}}
				{{- $index}}: {{ $val }} 
			{{ end }}`
	fmt.Println(str, data)
}

// 读取保存在文件的模版字符串
// 需要预先声明embed.FS变量
// func ParseFS(fsys fs.FS, patterns ...string) (*Template, error)
func test3() {
	var fs embed.FS
	if tmp, err := template.ParseFS(fs, "person.txt"); err != nil {
		fmt.Println(err)
	} else {
		tmp.Execute(os.Stdout, data)
	}
}
