// async-await异步操作

// 1-async的执行流程
// async函数每次执行到await操作都会暂停等待操作完成,等待期间线程可以跳出函数继续执行
// await操作完成后,async函数继续自动执行直到返回(不一定在主线程中执行完毕)
// async函数实际是封装多个await异步操作的Promise对象,调用async函数默认返回Promise对象
const asyncReadFile = async function () {
    const f1 = await readFile('/etc/fstab');
    const f2 = await readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
    return f1.toString() + f2.toString();
};
asyncReadFile().then(v => console.log(v));

// 2-async的状态转换
// async函数返回的Promise对象必须等待函数执行完才会发生状态转换(默认fulfilled)
// 存在某个await的Promise对象为rejected时,async函数会中断运行并返回rejected状态的Promise对象
// 将可能rejected的异步操作放在try-catch块中执行,可以避免中断执行带来的问题
async function f() {
    try {
        await Promise.reject('出错了');
    } catch(e) {}
    // 虽然async返回了rejected状态的Promise对象,但是错误被catch捕获,async继续执行
    return await Promise.resolve('hello world');
}
f().then(v => console.log(v))  // hello world


// 3-await并发执行
// 如果需要await的多个操作之间是无关的,可以让他们并发执行而不是等待前一个执行完毕
// ①后续还需要控制流程时,使用Promise.all()合并并发操作
// ②后续不需要控制流程时,直接取消并发操作上的await,都执行完后再使用await判断结果
let foo = await getFoo();
let bar = await getBar();
// ①Promise.all()合并并发操作
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// ②取消并发操作await限制
let fooPm = getFoo();
let barPm = getBar();
// 判断并发异步操作是否执行完毕
let foo = await fooPm;
let bar = await barPm;
