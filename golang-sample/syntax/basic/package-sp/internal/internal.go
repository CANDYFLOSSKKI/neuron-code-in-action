package internal

// 私有包
// 每个包下名为internal的包称为私有包
// 能访问私有包的只有:
// ①私有包的直接父包
// ②私有包同层次的包

import "fmt"

func SayHello() {
	fmt.Println("Internal")
}
