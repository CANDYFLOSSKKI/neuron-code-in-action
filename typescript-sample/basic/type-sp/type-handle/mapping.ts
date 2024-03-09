// 类型映射

// 1-类型映射的声明
// 类型映射使用in,keyof和[]类型运算符实现
type AWithMapping = {
    foo: number;
    bar: number;
};
type BWithMapping = {
    [prop in keyof AWithMapping]: string;  // 复制键名,类型设为string
};
type CWithMapping = {
    [prop in keyof AWithMapping]: AWithMapping[prop];  // 复制键名和键值
};

// 类型映射可以包装为泛型,实现映射操作的复用
type ToBoolean<Type> = {
    [Property in keyof Type]: boolean;
};

// 对具体的属性名也可以实现映射,作用不大
type TestObj1 = {
    [p in 'foo']: number;  // foo: number;
};
type TestObj2 = {
    [p in string]: boolean;  // [p: string]: boolean;
};


// 2-类型映射的修饰与限定
// ①在类型映射前添加 +/-readonly 可添加/移除属性的只读限制
type CreateImmutable<Type> = {
    +readonly [Prop in keyof Type]: Type[Prop];
};

// ②在类型映射后添加 +/-? 可添加/移除属性的可选限制
type Optional<Type> = {
    [Prop in keyof Type]+?: Type[Prop];
};

// 加号+可以省略,因此readonly和?直接表示属性的只读和可选
type AWithRule<T> = {
    +readonly [P in keyof T]+?: T[P];
};


// 3-键名重映射
// 在键名映射后加上as <新键名>可对映射的键名作修改
// 键名可使用模版字符串,对原有键名进行表达式操作
interface PersonInf {
    name: string;
    age: number;
    location: string;
}
type Getters<T> = {
    [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};
type LazyPerson = Getters<PersonInf>;  // 改为getName形式的键名

// 键名重映射将属性名设置为never时可以过滤掉指定属性
type Filter<T> = {
    // 键值是string类型时键名不变,否则修改为never(剔除该属性)
    [K in keyof T as T[K] extends string ? K : never]: string
}
type FilteredUser = Filter<PersonInf>;  // 仅保留name和location属性
