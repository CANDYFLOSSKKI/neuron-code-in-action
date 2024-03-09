package client

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type Person struct {
	id   string
	name string
}

var person Person = Person{"120", "jack"}

// 客户端部分API

// 1-封装请求
// 封装的请求函数包含双返回值: 返回体指针和错误

// ①Get请求 http.Get()
func testGet() {
	// 返回体的Body是io.ReadCloser类型:
	// 读取返回体的数据时,需要使用流函数读出
	// 读取完返回体时,需要在defer中显式关闭返回的流
	resp, _ := http.Get("https://baidu.com")
	defer resp.Body.Close()
	content, _ := io.ReadAll(resp.Body)
	fmt.Println(content)
}

// ②Post请求 http.Post()
func testPost() {
	// 先将数据JSON格式化
	strJson, _ := json.Marshal(person)
	// 在Get请求中,返回体数据以流的形式给出
	// 在Post请求中,客户端给出的数据也应该以流的形式给出
	reader := bytes.NewReader(strJson)

	// 发起请求时需要给出数据格式化的类型
	resp, _ := http.Post("https://baidu.com", "application/json;charset=utf-8", reader)
	defer resp.Body.Close()
}

// 2-自定义HTTP客户端
func test() {
	// ①结构体配置客户端
	client := &http.Client{}

	// ②生成请求体
	request, _ := http.NewRequest("GET", "https://baidu.com", nil)

	// ③添加请求头
	request.Header.Add("Authorization", "114514")

	// ④发起请求,接收返回体
	resp, _ := client.Do(request)
	defer resp.Body.Close()
}
