// 对象的标准库方法

// Object.keys()                        获取指定对象自身的所有属性名
// Object.getOwnPropertyNames()         获取指定对象自身的所有属性名;包括不可枚举的属性
// Object.getOwnPropertyDescriptor()    获取指定属性的属性描述对象
// Object.defineProperty()              修改指定属性的属性描述对象
// Object.defineProperties()            批量修改多个指定属性的属性描述对象
// Object.create()                      指定原型对象和属性,返回新的对象
// Object.getPrototypeOf()              获取指定对象的原型对象
// valueOf()                            返回对象的值
// toString()                           返回对象的字符串形式
// hasOwnProperty()                     判断指定属性是否是对象自身定义的
// isPrototypeOf()                      判断对象是否为指定对象的原型
// propertyIsEnumerable()               判断指定属性是否可遍历
// Object.is()                          判断两个值是否相等,类似严格相等,例外在于:
//                                          ①+0和-0不相等
//                                          ②NaN自身相等
// Object.assign()                      将源对象的可枚举属性复制到目标对象(浅拷贝)
// Object.getOwnPropertyDescriptors()   获取指定属性的属性描述对象
// Object.setPrototypeOf()              设置指定对象的原型对象
// Object.getPrototypeOf()              获取指定对象的原型对象
// Object.keys()                        返回指定对象自身所有可遍历属性键名
// Object.values()                      返回指定对象自身所有可遍历属性值
// Object.entries()                     返回指定对象自身所有可遍历属性键值对
// Object.fromEntries()                 Object.entries()的逆操作,将指定的键值对数组还原为对象
// Object.hasOwn()                      判断指定对象自身的属性中是否包含指定属性
