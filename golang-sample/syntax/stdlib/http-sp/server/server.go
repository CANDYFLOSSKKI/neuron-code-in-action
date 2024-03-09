package server

import (
	"fmt"
	"net/http"
	"net/http/httputil"
)

// 1-端口监听和路由
func test() {
	// ①路由和处理函数配置
	http.HandleFunc("/index", func(responseWriter http.ResponseWriter, request *http.Request) {
		fmt.Println(responseWriter, "index")
	})

	// ②端口监听配置
	http.ListenAndServe("localhost:12567", nil)
}

// 2-自定义服务端
func testServer() {
	server := &http.Server{
		Addr:              ":8080",
		Handler:           nil,
		TLSConfig:         nil,
		ReadTimeout:       0,
		ReadHeaderTimeout: 0,
		WriteTimeout:      0,
		IdleTimeout:       0,
		MaxHeaderBytes:    0,
		TLSNextProto:      nil,
		ConnState:         nil,
		ErrorLog:          nil,
		BaseContext:       nil,
		ConnContext:       nil,
	}
	server.ListenAndServe()
}

// 3-反向代理配置
// 反向代理就是在路由的处理函数中转发请求到指定的反向代理服务器
func test2() {
	http.HandleFunc("/forward", func(writer http.ResponseWriter, request *http.Request) {
		// 指定反向代理服务器地址
		// Scheme+Host+Path 组合起来为: https://golang.org/index
		director := func(request *http.Request) {
			request.URL.Scheme = "https"
			request.URL.Host = "golang.org"
			request.URL.Path = "index"
		}
		// 将处理函数传入的参数转向目标的方向代理服务器
		proxy := httputil.ReverseProxy{Director: director}
		proxy.ServeHTTP(writer, request)
	})
	http.ListenAndServe(":8080", nil)
}
