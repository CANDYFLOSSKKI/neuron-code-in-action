package package_sp

import (
	"fmt"
	"golang-sample/basic/package-sp/internal"
)

// 程序是通过将包链接在一起来构建的,最基本的调用单位是包
// 建议将包和文件夹的物理结构关联起来

// 1-导入包
// 批量导入时可以使用括号 ()
// 如果包只导入不调用,可以使用下划线 _ 表示匿名导入
// 路径名导入的包存在默认的包名(package定义的包名)

import (
	_ "math"
)

// Test
// 2-导出包
// 导出和访问控制通过命名的大小写实现(结构体中的成员变量也遵循这条规则)
// ①首字母大写的函数和变量对外暴露
// ②首字母小写的函数和变量不对外暴露
func Test() {
	fmt.Println("Testing")
	internal.SayHello()
}
