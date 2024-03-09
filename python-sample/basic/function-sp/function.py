# 函数
from random import randint

# 1-函数的定义
# 函数使用def关键字定义.函数的参数可以有默认值,也支持使用可变参数
def roll_dice(n=2):
    total = 0
    for _ in range(n):
        total += randint(1, 6)
    return total

# 可变参数使用*标识
def add(*args):
    total = 0
    for val in args:
        total += val
    return total

# 定义空语句的函数,可以使用pass占位符
def foo():
    pass


# 2-模块与函数
# 将函数放在不同的.py文件(模块)中,可以分别进行引用调用
# 不同模块的同名函数,通常使用模块限定名+点运算符.确定具体调用哪个函数
# 如果同名函数调用时不加限定名,调用目标以最后的模块输入为准
# import module1 as m1
# import module2 as m2
# m1.foo()  -> 调用m1的foo()
# m2.foo()  -> 调用m2的foo()
# foo()     -> 调用m2的foo()(最后输入)


# 3-闭包
# 全局变量比局部变量拥有更长的生命周期,因此应该避免全局变量的使用
# 将局部变量的生命周期延长,需要使用闭包


