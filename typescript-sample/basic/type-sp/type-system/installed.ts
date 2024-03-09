// 内置的类型工具

export{};
// 1-Awaited<Type>
// 用于Promise的返回值类型,适用于描述then()和await的参数类型
type A = Awaited<Promise<string>>;            // string
type B = Awaited<Promise<Promise<number>>>;   // number
type C = Awaited<boolean | Promise<number>>;  // number|boolean


// 2-构造函数类型操作
// 2-1 ConstructorParameters<Type>
// 用于提取构造函数的参数类型,组成元组返回
type TC1 = ConstructorParameters<
    new (x: string, y: number) => object
>;  // [x: string, y: number]
type TC2 = ConstructorParameters<
    RegExpConstructor
>;  // [pattern:string|RegExp, flags?:string]

type TC11 = ConstructorParameters<any>;    // unknown[]
type TC12 = ConstructorParameters<never>;  // never

// 2-2 InstanceType<Type>
// 用于提取构造函数的返回值的类型
// 相当于构造函数的ReturnType<Type>
type AI = InstanceType<ErrorConstructor>;     // Error
type TI1 = InstanceType<any>;                  // any
type TI2 = InstanceType<never>;                // never

// 对类进行该操作,泛型需要对类取typeof
type TI3 = InstanceType<typeof C>;             // C


// 3-联合类型操作
// 3-1 Exclude<UnionType, ExcludedMembers>
// 用于从联合类型UnionType中删除某些类型ExcludedMembers,组成新类型返回
// 相当于取联合类型的差集
type TE1 = Exclude<string|(() => void), Function>;  // string
type TE2 = Exclude<string | string[], any[]>;       // string

// 3-2 Extract<Type, Union>
// 用于从联合类型UnionType中提取指定类型Union,组成新类型返回
// 相当于取联合类型的交集
type TE3 = Extract<'a'|'b'|'c', 'a'|'d'>;      // 'a'
type TE4 = Extract<string | string[], any[]>;  // string[]
type TE5 = Extract<string|number, boolean>;    // never

// 3-3 NonNullable<Type>
// 用于从联合类型Type删除null类型和undefined类型,组成新类型返回
// 相当于类型的非空版本
type TN1 = NonNullable<string|number|undefined>;  // string|number
type TN2 = NonNullable<string[]|null|undefined>;  // string[]
type T6 = NonNullable<null|undefined>;            // never


// 4-对象类型操作
interface IA { x: number; y: number; }
// 4-1 Partial<Type>
// 用于返回将对象类型Type的所有属性变为可选属性后的新类型
type TPar = Partial<IA>;  // { x?: number; y?: number; }

// 4-2 Required<Type>
// 用于返回将对象类型Type的所有属性变为必选属性后的新类型
type TRe = Required<IA>;  // { x: number; y: number; }

// 4-3 Readonly<Type>
// 用于返回将对象类型Type的所有属性变为只读属性后的新类型
type TRead = Readonly<IA>;  // { readonly x: number; readonly y?: number; }

// 4-4 Omit<Type, Keys>
// 用于从对象类型Type中删除指定的属性Keys,组成新对象类型返回
// Keys可以是目标对象类型中不存在的属性,但必须是string|number|symbol
type TO1 = Omit<IA, 'x'>;        // { y: number }
type TO2 = Omit<IA, 'y'>;        // { x: number }
type TO3 = Omit<IA, 'x' | 'y'>;  // { }
type TO4 = Omit<IA, 'z'>;        // { x: number; y: number }


// 5-函数类型操作
// 5-1 Parameters<Type>
// 用于提取函数类型Type的参数类型,组成元组返回(通常对外部模块函数使用)
type TP1 = Parameters<() => string>;        // []
type TP2 = Parameters<(s:string) => void>;  // [s:string]
type TP3 = Parameters<<T>(arg: T) => T>;    // [arg: unknown]

type TP4 = Parameters<any>;    // unknown[]
type TP5 = Parameters<never>;  // never

// 5-2 ReturnType<Type>
// 用于提取函数类型Type的返回值类型,作为新类型返回
type TRet1 = ReturnType<() => () => any[]>;     // () => any[]
type TRet2 = ReturnType<typeof Math.random>;    // number
type TRet3 = ReturnType<typeof Array.isArray>;  // boolean

// 如果参数类型是泛型,返回值取决于泛型限定(没有限定返回unknown)
type TRet4 = ReturnType<<T>() => T>;                   // unknown
type TRet5 = ReturnType<<T extends number[]>() => T>;  // number[]

// 5-3 ThisParameterType<Type>
// 用于提取函数类型Type中this参数的类型(没有this参数时,返回unknown)
function toHex1(this:number) {
    return this.toString(16);
}
type T = ThisParameterType<typeof toHex1>;  // number

// 5-4 OmitThisParameter<Type>
// 用于从函数类型Type中移除this参数(没有this参数时,返回原始函数类型)
function toHex2(this: Number) {
    return this.toString(16);
}
type TO5 = OmitThisParameter<typeof toHex2>;  // () => string


// 6-类型构造和限定操作
// 6-1 Pick<Type, Keys>
// 用于返回新对象类型:
// ①第一个参数Type是对象类型
// ②第二个参数Keys是Type中选定的键名(多个键名用或|连接)
type TPick1 = Pick<IA, 'x'>;      // { x: number }
type TPick2 = Pick<IA, 'y'>;      // { y: number }
type TPick3 = Pick<IA, 'x'|'y'>;  // { x: number; y: number }

// 6-2 Record<Keys, Type>
// 用于返回新对象类型,参数Keys用作键名,参数Type用作键值类型
// 键名是联合类型时,对象中会包含多个键
// 键值是联合类型时,对象中的键也是对应的联合类型
type TR1 = Record<'a', number>;         // { a: number }
type TR2 = Record<'a'|'b', number>;     // { a: number, b: number }
type TR3 = Record<'a', number|string>;  // { a: number|string }

// 6-3 ReadonlyArray<Type>
// 用于生成只读数组类型,类型参数Type表示数组成员的类型
const values: ReadonlyArray<string> = ['a', 'b', 'c'];

// 6-4 ThisType<Type>
// 用于和其他类型组成交叉类型,提示TS其他类型里面this关键字的类型
// ThisType<Type>不返回新的类型,所以总是和其他类型交叉使用
interface HelperThisValue { logError: (error:string) => void; }
let helperFunctions:
    { [name: string]: Function } & ThisType<HelperThisValue> = {
        hello: function() {
            // ThisType用于提示this关键字应该满足HelperThisValue
            // 函数体中只能调用HelperThisValue接口中定义的函数logError()
            this.logError("Error: Something wrong!");
        }
    }


// 7-字符串类型操作
// Uppercase<StringType>     字符串的每个字符转为大写
// Lowercase<StringType>     字符串的每个字符转为小写
// Capitalize<StringType>    字符串的第一个字符转为大写
// Uncapitalize<StringType>  字符串的第一个字符转为小写
type AStr = 'hello';
type UpperAStr = Uppercase<AStr>;           // 'HELLO'
type LowerAStr = Lowercase<Str>;            // 'hello'
type CapitalAStr = Capitalize<AStr>;        // 'Hello'
type UncapitalAStr = Uncapitalize<AStr>;    // 'hello'
