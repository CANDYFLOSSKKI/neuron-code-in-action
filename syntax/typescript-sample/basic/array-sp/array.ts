// 数组

// 1-数组的类型声明
// TS数组中所有成员的类型必须相同,但成员数量可以是不确定的(可以是0)
// ①基础类型+[]声明类型
// 如果需要对类型进行联合等操作,在括号中进行(使优先级高于[])
let arr1:number[] = [1, 2, 3];
let arr2:(number|string)[];

// ②内置Array<>接口声明类型
let arr3:Array<number> = [1, 2, 3];
let arr4:Array<number|string>;


// 2-数组的初始化
// TS中数组的成员可以动态变化
let arri:number[];
arri = [];
arri = [1];
arri = [1,  2];
arri = [1, 2, 3];
arri[3] = 4;      // 扩张为[1,2,3,4]
arri.length = 2;  // 缩小为[1,2]


// 3-数组元素的访问
// 数组元素的索引类型都是整数值,可以用[]访问,越界访问数组不会报错
let arrr:number[] = [1, 2, 3];
let foo_a = arrr[3];

//对数组的类型(type)取索引可以获取其内部元素的类型
type Names = string[];
type Name1 = Names[0];       // (整数索引)string
type Name2 = Names[number];  // (类型索引)string


// 4-数组的类型推断
// 如果初始值是空数组,推断数组类型是any[]
// 向空数组添加元素,类型推断会自动更新,随着新成员的加入,类型推断会继续更新
// (如果初始化时数组就不为空,数组会固定元素类型,添加不同类型的元素会报错)
const arrg = [];  // 推断类型为 any[]
arrg.push(123);          // 推断类型为 number[]
arrg.push('abc');        // 推断类型为 (string|number)[]


// 5-只读数组
// 5-1 readonly只读数组
// 使用const声明数组后仍然可以继续添加元素,不能达到只读的目的
// 在数组类型x[]前加上readonly可声明只读数组
// readonly x[]是x[]的父类型,因此只读数组不能代替普通数组传参使用
const arrre:readonly number[] = [0, 1];

// 使用Array<>形式声明数组时,需要使用专门的Readonly泛型:
const ar1:ReadonlyArray<number> = [0, 1];
const ar2:Readonly<number[]> = [0, 1];

// 5-2 const断言只读数组
// 在数组初始化后加as const可告知TS类型推断为只读数组
const arrac = [0, 1] as const;


// 5-多维数组
// 多维数组使用T[][]的形式声明,整体类型为T[][],底层元素类型为T
var multi:number[][] = [[1,2,3], [23,24,25]];
