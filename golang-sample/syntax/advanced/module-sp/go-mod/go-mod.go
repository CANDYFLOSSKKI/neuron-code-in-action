package go_mod

import "fmt"

// go mod依赖管理

// 1-依赖的结构
// import导包的结构: "<模块名>/<目录路径>" (模块名位于go.mod文件中)

// 如果在文件中没有明确使用某个依赖,import会报错,此时需要在依赖前添加下划线 _
// 下划线依赖并不是毫无用处,相当于自动调用该包下的init()函数,规则如下:
// ①如果被依赖的包下有多个go文件,他们的init()函数会一并被自动调用
// ②如果某个包同时被多个包依赖,编译器会保证init()函数只执行一次(类似sync.Once的懒加载效果)
// ③如果不添加下划线而是在代码中实际使用这个包,init()函数同样会被执行

// 相同机器上不同项目的模块缓存都存放在$GOPATH/pkg/mod目录下(缓存共享)
import (
	_ "github.com/bytedance/sonic"
	_ "golang-sample/syntax/basic/map-sp"
)

func test() {
	fmt.Println()
}

// go mod常用命令
// 依赖查找网站:https://pkg.go.dev

// go get <模块名+版本号>		go.mod添加指定依赖
// go mod download			下载当前项目的依赖包
// go mod edit				编辑go.mod
// go mod graph				输出模块依赖图
// go mod init				在当前目录初始化go mod
// go mod tidy				清理项目模块
// go mod verify			验证项目的依赖合法性
// go mod why				解释项目哪些地方用到了依赖
// go clean -modcache		删除项目模块依赖缓存
// go list -m				项目模块列表

// go mod常用语法

// ①Deprecation:标识弃用模块
// (注释)Deprecated: use example.com/mod/v2 instead.
// module-sp example.com/mod

// ②require:引用外部依赖(模块名+版本号)
// 版本号为v0.0.0-xxxxx的是使用CommitID代替版本号
// require (
// 		github.com/bytedance/sonic v1.8.0 // indirect
// )

// ③exclude:排除某个版本的依赖
// exclude (
// 		golang.org/x/crypto v1.4.5
// 		golang.org/x/text v1.6.7
// )

// ④replace:替换某个版本的依赖
// replace (
// 		golang.org/x/net v1.2.3 => example.com/fork/net v1.4.5
// 		golang.org/x/net => example.com/fork/net v1.4.5
// 		golang.org/x/net v1.2.3 => ./fork/net
// 		golang.org/x/net => ./fork/net
// )

// ⑤retract:表示撤回版本范围
// retract v1.0.0
// retract [v1.0.0, v1.9.9]
// retract (
// 		v1.0.0
// 		[v1.0.0, v1.9.9]
// )
