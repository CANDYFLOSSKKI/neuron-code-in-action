package error

import (
	"errors"
	"fmt"
)

// 异常的处理级别:
// error:部分流程出错,需要处理
// panic:很严重的问题,程序应该在处理完问题后立即退出
// fatal:非常致命的问题,程序应该立即退出

// error是可以被接受的,仅包含Error()方法输出错误信息
type error interface {
	Error() string
}

// 1-error的创建方法
func test() {
	var err error
	// errors.new()创建
	err = errors.New("an error")
	// fmt.Errorf()格式化创建
	err = fmt.Errorf("%d error", 114514)

	fmt.Println("错误,%w", err)
}

// 2-自定义error接口实现类型
// ①自定义error类型
type errStr struct {
	str string
}

// ②实现Error方法返回error字符串
func (e *errStr) Error() string {
	return e.str
}

// ③工厂方法构造类型变量(构造函数)
// 注意实现类应该是errStr的指针类型,所以新变量先取地址再返回
func newErrStr(s string) *errStr {
	return &errStr{s}
}

// 3-error链式传递
// 实际上就是在自定义error类型上组合error对象,组合对象提供访问内部错误对象的方法
// 类似于Java的throws,当前无法处理error时,就再包装一层链式错误扔给上层处理
type wrapError struct {
	msg string
	err error
}

func (e *wrapError) Unwrap() error {
	return e.err
}
func test2() error {
	err := errors.New("这是一个原始错误")
	// fmt.Errorf可以接收其他的错误作为参数,实现链式错误的创建
	// go没有throws那样独立于return的错误返回,因此如果要向上传递错误,应该使用双参数返回值(无错误时错误参数置为nil)
	// 错误专用的格式化串是 %w
	wrapErr := fmt.Errorf("错误，%w", err)
	return wrapErr
}

// 4-error处理
// errors.Unwrap()  解包一层错误链(可能解包后还是错误类型)
// errors.Is()   	判断错误链中是否包含指定错误(查找到底,判断条件是成员都相等)
// errors.As()		错误链中查找第一个类型匹配的错误(查找到底,判断条件是类型相等)
