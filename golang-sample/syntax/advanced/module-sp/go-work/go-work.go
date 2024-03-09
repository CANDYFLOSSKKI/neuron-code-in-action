package go_work

// WorkSpace工作区可以实现:
// ①当项目存在多个模块时,将多个小模块整合成大模块(大模块只负责小模块之间的引用交互)
// ②本地模块间的引用(引用的是本地路径)
// ③引用一个模块当前存储在本地尚未发布的新特性版本

// 以本项目为例,构建了如下的模块结构:
// golang-sample (模块名:golang-sample)
// |
// |- go.mod (整体项目依赖管理)
// |- go.work (整体项目工作区管理)
// |
// |- syntax (模块名:golang-sample/syntax)
// |- work (模块名:golang-sample/work)

// 1-子模块以父模块/子模块的形式命名,展示项目结构
// 子模块的go.mod正常引用所需模块

// 2-父模块的go.work中的use()引用,包括两部分:
// ①. 代表当前目录下的go.mod(也在工作区管理的范畴下)
// ②所有子模块go.mod的所在目录

// 3-父模块的go.mod中的require()引用子模块
// 不能直接引用本地路径,因此使用replace指向本地路径
// 引用子模块相当于父模块同时引用了子模块的所有外部require

// 这样就可以在子模块中直接引用其他子模块了(和外部模块语法相同,以模块名开头而非路径开头)
import _ "golang-sample/workspace/test"

// 工作区相关的常用命令:
// go work edit		编辑go.work文件
// go work init		初始化工作区
// go work sync		工作区构建列表同步到模块
// go work use		添加模块到工作区
