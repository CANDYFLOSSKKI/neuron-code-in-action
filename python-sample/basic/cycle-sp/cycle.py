# 分支和循环结构
import random

# 1-分支结构
# 分支结构可以使用if-elif-else构造
# 分支结构的判断条件后跟冒号:,可以是表达式也可以是嵌套的分支结构
x = float(input('x = '))
if x > 1:
    y = 3 * x - 5
elif x >= -1:
    y = x + 2
else:
    y = 5 * x + 3

# python的逻辑运算符使用and/or/not表示,&和|专用于位运算
# 使用逻辑运算符可构造复杂的分支条件:
if 1 < x < 3 and not x == 2:
    y = abs(x - 2)


# 2-循环结构
# 2-1 for-in循环
# 如果明确知道循环执行的次数(或者对数据容器迭代),通常使用for-in循环
# range()用于构造范围,有如下几种用法:
#  ①range(101)          用来产生0到100范围的整数(左闭右开区间)
#  ②range(1, 101)       用来产生1到100范围的整数(左闭右开区间)
#  ③range(1, 101, 2)    用来产生1到100的奇数,其中2是步长,即每次数值递增的值
#  ④range(100, 0, -2)   用来产生100到1的偶数,其中-2是步长,即每次数字递减的值
for i in range(1, 10):
    for j in range(1, i + 1):
        print('%d*%d=%d' % (i, j, i * j), end='\t')
    print()

# 2-2 while循环
# 如果不知道具体的循环次数,通常使用while循环
# while循环通过返回bool值的表达式控制循环(调用break也可显式终止循环)
answer = random.randint(1, 100)
counter = 0
while True:
    counter += 1
    number = int(input('请输入: '))
    if number < answer:
        print('大一点')
    elif number > answer:
        print('小一点')
    else:
        print('恭喜你猜对了!')
        break




