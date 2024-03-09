# 字符串

# 1-转义字符串
# 反斜杠\可表示转义,即\后面的字符不再是它原来的意义(\n,\t)
# 反斜杠\本身同样可以进行转义,需要另一个反斜杠来标识:\\
s1 = '\'hello, world!\''        # 'hello, world!'
s2 = '\n\\hello, world!\\\n'    # \hello, world!\

# 反斜杠\后还可跟八进制和十六进制数表示字符
s3 = '\141\142\143\x61\x62\x63'     # abcabc
s4 = '\u9a86\u660a'                 # 骆昊

# 如果不希望反斜杠\表示转义,可以在字符串字面量前加上r
s1_r = r'\'hello, world!\''
s2_r = r'\n\\hello, world!\\\n'


# 2-字符串的运算符操作
# 2-1 * 重复字符串内容
# 2-2 + 拼接字符串内容
s1 = 'hello ' * 3   # hello hello hello
s1 += 'world'       # hello hello hello world

# 2-3 in/not in 判断字符串是否包含另一个字符串
print('ll' in s1)    # True
print('good' in s1)  # False

# 2-4 []  取指定数值索引的字符
# 2-5 [:] 取指定范围内的字符(左闭右开区间);使用::可省略任意边的索引值
str2 = 'abc123456'
print(str2[2])      # c
print(str2[2:5])    # c12
print(str2[2:])     # c123456
print(str2[2::2])   # c246
print(str2[::2])    # ac246
print(str2[::-1])   # 654321cba
print(str2[-3:-1])  # 45
print(str2[::])     # abc123456


# 3-字符串的内置方法
str1 = 'hello, world!'
# 3-1 len()         计算字符串的长度
print(len(str1)) # 13

# 3-2 capitalize()  获得字符串首字母大写的拷贝
print(str1.capitalize()) # Hello, world!

# 3-3 title()       获得字符串每个单词首字母大写的拷贝
print(str1.title()) # Hello, World!

# 3-4 upper()       获得字符串变大写后的拷贝
print(str1.upper()) # HELLO, WORLD!

# 3-5 find()        从字符串中查找子串所在位置
# 3-6 index()       与find类似但找不到子串时会引发异常
print(str1.find('or')) # 8
print(str1.find('shit')) # -1
print(str1.index('or'))
print(str1.index('shit'))

# 3-7 startswith()  检查字符串是否以指定的字符串开头
# 3-8 endswith()    检查字符串是否以指定的字符串结尾
print(str1.startswith('He')) # False
print(str1.startswith('hel')) # True
print(str1.endswith('!')) # True

# 3-9 center()  将字符串以指定的宽度居中并在两侧填充指定的字符
# 3-10 rjust()  将字符串以指定的宽度靠右放置左侧填充指定的字符
print(str1.center(50, '*'))
print(str1.rjust(50, ' '))

str2 = 'abc123456'
# 3-11 isdigit()    检查字符串是否由数字构成
print(str2.isdigit())  # False
# 3-12 isalpha()    检查字符串是否以字母构成
print(str2.isalpha())  # False
# 3-13 isalnum()    检查字符串是否以数字和字母构成
print(str2.isalnum())  # True

# 3-14 strip()  获得字符串修剪左右两侧空格之后的拷贝
str3 = '  jackfrued@126.com '
print(str3.strip())


# 4-字符串的格式化输出

