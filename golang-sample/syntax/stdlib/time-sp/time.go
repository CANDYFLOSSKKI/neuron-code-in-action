package time_sp

import (
	"fmt"
	"time"
)

// 获取当前时间
// func Now() Time
func test() {
	now := time.Now()
	// 格式化输出:
	// ①24小时制
	fmt.Println(now.Format("2006-01-02 15:04:05 Monday Jan"))
	// ②只输出日期
	fmt.Println(now.Format("2006-01-02"))
	// ③只输出时间
	fmt.Println(now.Format("15:04:05 PM"))
}

// Time时间点:
// func (t *Time) nsec() int32          从时间点开始至今的纳秒数
// func (t *Time) sec() int64           从时间点开始至今的秒数
// func (t *Time) addSec(d int64)       时间点增加指定秒
// func (t *Time) setLoc(loc *Location) 设置地区

// func (t Time) Add(d Duration) Time   时间点增加指定时间间隔
// func (t Time) After(u Time)          判断指定时间点是否在它之后
// func (t Time) Before(u Time) bool    判断指定时间点是否在它之前
// func (t Time) Equal(u Time) bool     判断两个时间点是否表示同一瞬间
// func (t Time) Sub(u Time) Duration   求两个时间点的差值

// 解析时间字符串
func test2() {
	location, _ := time.LoadLocation("Asia/Shanghai")
	// 格式化时间格式 + 目标时间字符串 + 地区Location
	inLocation, _ := time.ParseInLocation("2006/01/02", "2023/11/23", location)
	fmt.Println(inLocation.String())
}

// Timer计时器:
// func NewTimer(d Duration) *Timer
func test3() {
	timer := time.NewTimer(time.Second)
	defer timer.Stop()
}

// 常用的时间单位:
// time.Nanosecond		1(纳秒)
// time.Microsecond		1000(微秒)
// time.Millisecond		1000000(毫秒)
// time.Second			1000000000
// time.Minute			60×Second
// time.Hour			60×Minute

// Ticker定时器:
// func NewTicker(d Duration) *Ticker
// Ticker会以给定的时间间隔向只读管道C发送时间信息,不手动停止的情况下将无限循环
func test4() {
	go func() {
		ticker := time.NewTicker(time.Second)
		for {
			select {
			// 每秒都会向C管道发送一次时间信息,无限循环
			case tc := <-ticker.C:
				fmt.Println(tc)
			}
		}
	}()
}

// sleep()睡眠(协程暂时阻塞):
// func Sleep(d Duration)
