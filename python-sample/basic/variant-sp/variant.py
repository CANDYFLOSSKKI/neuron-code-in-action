# 变量和类型

# 1-变量的基本类型
# ①整形int
a_int1 = 12      # 十进制
a_int2 = 0b100   # 二进制(0b)
a_int3 = 0o100   # 八进制(0o)
a_int4 = 0x100   # 十六进制(0x)

# ②浮点型float
a_float1 = 123.456    # 数学写法
a_float2 = 1.23456e2  # 科学计数法

# ③字符串型str
# 单引号和双引号都可以用于表示字符串
# 使用'''或"""可以表示多行字符串
a_str1 = 'hello'
a_str2 = '''
    Str Line 1
    Str Line 2
'''

# ④布尔型bool
# 布尔值只有True和False两种值(注意大小写)
a_bool1 = 3 < 5   # True
a_bool2 = 1 == 2  # False
a_bool3 = True

# ⑤复数型complex
# 使用j表示虚部(通常不会使用此类型)
a_complex1 = 3+5j


# 2-变量的命名规则
# 变量名由字母(不包括特殊字符),数字和下划线构成,数字不能开头;大小写敏感;不能和关键字冲突
#  ①变量名用小写字母拼写,多个单词使用下划线_连接
#  ②保护的实例属性使用单个下划线_开头
#  ③私有的实例属性使用两个下划线__开头


# 3-变量的类型操作
# 3-1 检查变量类型
# 可以对变量调用type()获取变量的类型,返回<class '<类型>'>
a_wait_t = 100
b_wait_t = 12.345
c_wait_t = 1 + 5j
d_wait_t = 'hello, world'
e_wait_t = True
print(type(a_wait_t))    # <class 'int'>
print(type(b_wait_t))    # <class 'float'>
print(type(c_wait_t))    # <class 'complex'>
print(type(d_wait_t))    # <class 'str'>
print(type(e_wait_t))    # <class 'bool'>

# 3-2 变量的类型转换
# int()     将一个数值或字符串转换成整数,可以指定进制
# float()   将一个字符串转换成浮点数
# str()     将指定的对象转换成字符串形式,可以指定编码
# chr()     将整数转换成该编码对应的字符串(一个字符)
# ord()     将字符串(一个字符)转换成对应的编码(整数)
a_tran = int(input('a = '))
b_tran = int(input('b = '))


# 4-变量作用域
# 变量的查找顺序是①局部作用域->②嵌套作用域->③全局作用域->④内置作用域
# 在函数中对变量进行操作,默认会识别为局部作用域
# 在变量使用前使用global标识,可指示函数对某个变量的操作均在全局作用域下进行
a = 100
def foo_1():
    a = 200     # 只对函数局部作用域的a生效
def foo_2():
    global a    # 标识为全局作用域
    a = 200
foo_1()
print(a)    # 100(全局变量不改变)
foo_2()
print(a)    # 200(全局变量被修改)


