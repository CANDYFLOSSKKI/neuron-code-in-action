# 线程创建

## Thread

```Java
//1:创建Thread线程
Thread t1=new Thread(()->{
    ...
},"t1");
//2:启动Thread线程
t1.start();
```

## Runnable

```Java
//1:创建Runnable线程(Runnable为接口,不能用Lambda方法引用)
Runnable r1=new Runnable(){
    @Override
    public void run(){...}
};
//2:启动Runnable线程
Thread t1=new Thread(r1,"t1");  //传递Runnable参数
t1.start();
```

## FutureTask

```Java
//1:创建FutureTask线程(内含Callable)
//泛型指明返回值类型,便于外部接收
FutureTask<Integer> f1=new FutureTask<>(()->{
   return 0;
});
//2:启动FutureTask线程
Thread t1=new Thread(r1,"t1");  //传递FutureTask参数
t1.start();
//3:获取FutureTask线程返回值
Integer i=f1.get();
```

# synchronized

```Java
//1:同步代码块
synchronized(Object obj){
    ...    //临界区
}

//2:同步方法
//非静态方法:Monitor监视器为调用对象
//静态方法:  Monitor监视器为类字节码
public synchronized void test(){
    ...    //临界区
}
```

# 线程常用方法

```Java
start()            //让线程进入就绪状态(还未分配CPU)
run()              //新线程启动后调用的方法
getId()            //获取线程长整型ID(唯一)
getName()          //获取线程名
setName(String)    //修改线程名
getPriority()      //获取线程优先级
setPriority(int)   //修改线程优先级(1~10,越大优先级越高)
getState()         //获取线程状态
//常见线程状态:
//NEW            新建线程
//RUNNNABLE      启动线程
//BLOCKED        阻塞线程
//WAITING        等待线程
//TIMED_WAITING  时间限制等待线程
//TERMINATED     销毁线程
isAlive()          //判断线程是否存活(未运行完毕)
currentThread()    //获取当前正在执行的线程


join()            //在线程B中调用A.join(),即等待线程A运行结束再继续操作
join(long n)      //最多等待n秒
sleep(long n)     //线程休眠n毫秒
yield()           //提示线程调度器让出CPU(软)
isInterrupted()   //判断线程是否被打断(不清除打断标记)
interrupted()     //判断线程是否被打断(清除打断标记)
interrupt()  //1:若打断sleep/wait/join的线程:抛出异常,清除打断标记
             //2:若打断正在运行的线程:设置打断标记
             //3:若打断park()的线程:设置打断标记
wait()            //(调用对象为监视器)让进入监视器的线程在waitSet等待
notify()          //(调用对象为监视器)随机挑一个正在waitSet等待的线程唤醒
notifyAll()       //(调用对象为监视器)将在waitSet等待的线程全部唤醒

LockSupport.park()               //暂停当前线程
LockSupport.unpark('线程对象')    //恢复线程运行
//park()和unpark()不强制park()在前,逻辑上unpark()在前也可以实现两两配对
```

# ReentrantLock

```Java
//1:创建ReentrantLock可重入锁对象
ReentrantLock rLock=new ReentrantLock();
//2:加锁解锁一般逻辑(catch根据需要添加)
rLock.lock();        //加锁
try{
    ...              //临界区
}finally{
    rLock.unlock();  //解锁
}
```

## 可重入

```Java
//锁的拥有者可以多次获取锁:
rLock.lock();
    rLock.lock();
        rLock.lock();
    ...
        rLock.unlock();
    rLock.unlock();
rLock.unlock();
```

## 可打断

```Java
//lock()                等待获取锁期间不可打断
//lockInterruptibly()   等待获取锁期间可被打断
ReentrantLock rLock=new ReentrantLock();
try{
    rLock.lockInterruptibly();
}catch(InterruptedException e){   //被打断抛出异常
    ...
}
try{                             //未被打断进入正常逻辑
    ...   //临界区
}finally{
    rLock.unlock();
}
```

## 超时时间

```Java
//tryLock()                        不加参数,不会等待获取锁,要么得到锁要么返回
//tryLock(long timeout,TimeUnit)   加参数,在指定时间内等待获取锁(阻塞)
//常用的TimeUnit时间颗粒度:
//TimeUnit.DAYS          天
//TimeUnit.HOURS         小时
//TimeUnit.MINUTES       分钟
//TimeUnit.SECONDS       秒
//TimeUnit.MILLISECONDS  毫秒
//TimeUnit.NANOSECONDS   毫微秒
//TimeUnit.MICROSECONDS  微秒
//超时锁在等待期间可被打断
ReentrantLock rLock=new ReentrantLock();
try{
    if(!rLock.tryLock(1,TimeUnit.SECONDS)){    //阻塞一秒等待获取锁
        return;
    }
}catch(InterruptedException e){  //被打断抛出异常
    ...
}
try{                             //未被打断进入正常逻辑
    ...   //临界区
}finally{
    rLock.unlock();
}
```

## 条件变量

```Java
//newCondition()    创建ReentrantLock的新条件变量
//对条件变量有两种方法(类似于wait()和notify()):
//await()    (在进程A中执行)条件未达成,进程阻塞
//signal()   (在进程B中执行)条件达成,通知进程A解除阻塞状态
ReentrantLock rLock=new ReentrantLock();
Condition waitSign=rLock.newCondition;
volatile boolean sign=false;

//1:进程A(主动阻塞)
rLock.lock();
try{
    while(!sign){
        try{
            waitSign.await();    //条件未达成则阻塞
        }catch(InterruptedException e){
            ...
        }
    }
    ...    //临界区
}finally{
    rLock.unlock();
}

//2:进程B(满足条件)
rLock.lock();
try{
    sign=true;            //使条件成立
    waitSign.signal();    //通知线程A解除阻塞
}finally{
    rLock.unlock();
}
```

## 公平锁

```Java
ReentrantLock rLock=new ReentrantLock();     //默认不公平锁
ReentrantLock rLock=new ReentrantLock(true); //公平锁
//公平锁不允许争抢CPU,一定程度上降低并发度
```

# CAS

```Java
//compareAndSet(prev,next)  先检查prev是否相同(保证线程安全),再更改为next
public AtomicInteger balance;
public void withdraw(Integer amount){
    while(true){    //当CAS不满足条件时,重复尝试修改操作
        int prev=balance.get();                  //当前的值
        int next=prev-balance;                   //计算新值
        if(balance.compareAndSet(prev,next)){    //检查当前值是否有变化
            break;
        }

    }
}
```

## 原子整数

```Java
//原子整数包括:
//AtomicBoolean
//AtomicInteger
//AtomicLong
//(以AtomicInteger为例)
addAndGet(Integer)   //以原子方式将给定值添加到当前值，并在添加后返回新值
getAndAdd(Integer)   //以原子方式将给定值添加到当前值并返回旧值
incrementAndGet()    //以原子方式将当前值递增1并在递增后返回新值,相当于 i++
getAndIncrement()    //以原子方式递增当前值并返回旧值,相当于 ++i
decrementAndGet()    //原子地将当前值减1并在减量后返回新值,相当于 i--
getAndDecrement()    //以原子方式递减当前值并返回旧值,相当于 --i
```

原子整数还可用于Lambda表达式/内部类，作为外部变量被引用后，可以在方法体内部更改：

```Java
ArrayList<Integer> list=new ArrayList<>();
//被Lambda/内部类引用的变量必须是final类型:
//不同于其它变量,原子整数设定为final还可进行值的更改
final AtomicInteger num=new AtomicInteger(0);
list.sort(new Comparator<>() {
    @Override
    public int compare(Integer o1, Integer o2){
        //内部类中原子自增,最后可以在外部输出1
        num.getAndIncrement();                
        return 0;
    }
 });
```

## 原子引用

```Java
//原子引用包括:
//AtomicReference
//AtomicMarkAbleReference
//AtomiceStampedReference

//1:AtomicReference(和普通的CAS操作类似)
AtomicReference<BigDecimal> ref=new AtomicReference<>(balance);  //设初值
BigDecimal prev=ref.get();                                       //取值
ref.compareAndSet(prev,next);                                    //CAS修改值

//2:AtomicStampedReference(版本号防止ABA现象)
//2-1:赋初值和版本号信息
AtomicStampedReference<BigDecimal> refs=new AtomicStampedReference<>(balance,0);
//2-2:获取信息
BigDecimal prev=refs.getReference();
int stamp=refs.getStamp();
//2-3:CAS修改信息
//(期望数据值,修改后数据值,期望版本号,修改后版本号)
refs.compareAndSet(prev,next,stamp,stamp+1);

//3:AtomicMarkableReference(版本标志位防止ABA现象)
//3-1:赋初值和版本标志位信息
AtomicMarkableReference<BigDecimal> refm=new AtomicMarkableReference<>(balance,true);
//3-2:获取信息
//(版本标志位不需要获取,因为没改就是true,改了就是false)
BigDecimal prev=refs.getReference();
//3-3:CAS修改信息
//(期望数据值,修改后数据值,期望版本标志位,修改后版本标志位)
refm.compareAndSet(prev,next,true,false);
```

## 原子数组

```Java
//原子数组包括:
//AtomicIntegerArray
//AtomicLongArray
//AtomicReferenceArray
//(以AtomicIntegerArray为例)
//1:创建给定长度原子数组(有默认值)
AtomicIntegerArray aia=new AtomicIntegerArray(10);
//2:更改指定位置的元素值
//set(a,b)    将位置i的元素改成b
atomicIntegerArray.set(9,10);

//其它方法名和AtomicInteger相同,仅参数中新添加了一个下标值
```

## 字段更新器

```Java
//字段更新器包括:
//AtomicReferenceFieldUpdater
//AtomicIntegerFieldUpdater
//AtomicLongFieldUpdater
//字段更新器只能对类型对应的volatile变量使用
//(以AtomicIntegerFieldUpdater为例)
//1:实例化字段更新器(参数为类的字节码 + 指定的变量名)
AtomicIntegerFieldUpdater updater=AtomicIntegerFieldUpdater.newUpdater(Person.class,"id");
Person person=new Person();    //要修改非静态数据,必须存在对象
//2:CAS修改字段数据(参数为对象 + 期望数据值 + 修改数据值)
updater.compareAndSet(person,10,20);
```

## 原子累加器

```Java
//原子累加器LongAdder降低了CAS失败的频次,累加效率远高于AtomicLong
//1:实例化LongAdder
LongAdder adder=new LongAdder();  //初始化值为0
//2:累加计算
void add(long x)    //+x
void decrement()    //-1
void increment()    //+1
void reset()        //值重置为0
long sum()          //返回当前值
//3:转换输出
double doubleValue()
float floatValue()
int intValue()
long longValue()
String toString()
```

# Unsafe

```Java
//Unsafe是JDK内置工具,可以从内存上操作变量,无法直接获取
//1:反射获取Unsafe对象
Field theUnsafe=Unsafe.class.getDeclaredField("theUnsafe");
theUnsafe.setAccessible(true);
Unsafe unsafe=(Unsafe)theUnsafe.get(null);
//2:获取成员偏移量
//objectFieldOffset(Field)    由变量域获取变量偏移量
Field id=Person.class.getDeclaredField("id");
id.setAccessible(true);
long idOffset=unsafe.objectFieldOffset(id);
//3:CAS修改变量值
//compareAndSwapInt()
//compareAndSwapObject()
//compreAndSwapLong()
Person person=new Person();
//(对象,变量偏移量,期望数据值,修改后数据值)
unsafe.compareAndSwapInt(person,idoffset,0,20);
```

# ThreadPoolExecutor

## 线程池创建

```Java
//1:原生线程池构造器ThreadPoolExecutor
//当线程数目超过核心数目时,线程池仍会继续添加到最大数目,再添加就进入阻塞队列
public ThreadPoolExecutor(
    int corePoolSize,                    核心线程数目(运行线程)
    int maximumPoolSize,                 最大线程数目(救急线程)
    long keepAliveTime,                  生存时间(超时)
    TimeUnit unit,                       时间单位
    BlockingQueue<Runnable> workQueue,   阻塞队列(阻塞线程)
    ThreadFactory threadFactory,         线程工厂(创建线程)
    RejectedExecutionHandler handler     拒绝策略
)

//2:固定大小的线程池newFixedThreadPool(适用于任务量已知,相对耗时的任务)
public static ExecutorService newFixedThreadPool(int nThreads) { 
    return new ThreadPoolExecutor(
        //2-1:核心线程数=最大线程数,没有救急线程的空间
        nThreads, nThreads,
        //2-2:无超时时间
        0L, TimeUnit.MILLISECONDS,
        //2-2:阻塞队列无界
        new LinkedBlockingQueue<Runnable>()    
    );
}

//3:不固定大小的线程池newCachedThreadPool(适用于任务密集,每个任务执行时间较短)
public static ExecutorService newCachedThreadPool() { 
    return new ThreadPoolExecutor(
        //3-1:无核心线程,全为救急线程
        0, Integer.MAX_VALUE,
        //3-2:所有救急线程60s后回收
        60L, TimeUnit.SECONDS,
        //3-3:阻塞队列SynchronousQueue<>无容量
        //void put(Object)   向阻塞队列放入元素,此时线程阻塞,等待其它线程取出
        //Object take()      从阻塞队列取出元素,同时让因为put()阻塞的线程解除
        new SynchronousQueue<Runnable>());
}

//4:单一线程池newSingleThreadExecutor(适用于多个任务排队执行)
public static ExecutorService newSingleThreadExecutor() { 
    return new FinalizableDelegatedExecutorService(new ThreadPoolExecutor(
        //4-1:线程数固定为1,只有一个线程能运行
        1, 1,
        //4-2:无超时时间,任务执行完毕才会运行下一个线程
        0L, TimeUnit.MILLISECONDS,
        new LinkedBlockingQueue<Runnable>()));
}
```

## 任务提交

```Java
void execute(Runnable command);                           //单任务执行,无执行结果 
<T> Future<T> submit(Callable<T> task);                   //单任务提交,返回单结果
List<Future<T>> invokeAll(Collection<Callable<T>> tasks)  //多任务提交,返回多结果
List<Future<T>> invokeAll(Collection<Callable<T>> tasks,  
                          long timeout, TimeUnit unit)    //多任务提交(带超时时间)
                          
T invokeAny(Collection<Callable<T>> tasks)    //多任务提交,返回先执行完毕的结果
T invokeAny(Collection<Callable<T>> tasks,    
            long timeout, TimeUnit unit)      //多任务提交+返回最快结果(带超时时间)
```

## 线程池关闭

```Java
//常用的方法是shutdown()和shutdownNow()关闭线程池:
void shutdown()  //线程池状态变为SHUTDOWN,不会接收新任务
                 //已提交任务会继续执行完,不会阻塞调用线程的执行
List<Runnable> shutdownNow()  //线程池状态变为STOP,不会接收新任务
                              //将队列中的任务返回,并interrupted()正在执行的任务

 boolean isShutdown()    //判断线程池状态是否为RUNNING
 boolean isTerminated()  //判断线程池状态是否为TERMINATED
 
 boolean awaitTermination(long timeout, TimeUnit unit)
 //该方法会等待shutdown()后已提交任务的执行,通常这么使用:
 ExecutorService es = Executors.newFixedThreadPool(10);
 ...
 es.shutdown();        //通知关闭线程池,等待已提交任务执行
 if(!es.awaitTermination(20,TimeUnit.SECONDS)){    //等待20s
     es.shutdownNow(); //等不及了直接强行关闭
 }
```

# ForkJoinPool

- 有返回值的任务类需要继承**RecursiveTask<T>**，重写 `protected T compute()`
- 无返回值的任务类需要继承**RecursiveAction**，重写`protected void compute()`

```Java
//(ForkJoinPool的核心思想是分治法,将任务拆分成多个子任务,这里仅作基本演示)
//1:定义任务类:
public class MyTask extends RecursiveTask<Integer>{ //继承特定类
    public MyTask(){...}              //整个任务在类中执行,需要构造器传递参数
    @Override
    protected Integer compute(){...} //重写任务入口方法
}

//2:创建ForkJoinPool线程池对象和任务类对象
ForkJoinPool fjp=new ForkJoinPool(1);
MyTask task=new MyTask(...);

//3:启动任务
//execute(ForkJoinTask) 异步执行无返回值tasks
//invoke(ForkJoinTask)  任务执行后阻塞到任务返回
//submit(ForkJoinTask)  异步执行有返回值tasks
Integer i=pool.invoke(task);
```

# 计划任务

## Timer

```Java
//Timer的所有任务都是串行执行的
//1:创建Timer对象
Timer timer=new Timer();
//2:创建TimerTask线程对象(Runnable的实现抽象类)
TimerTask task1=new TimerTask() {
    @Override
    public void run(){...}
};
TimerTask task2=...;
//3:设定任务计划
//schedule(线程名,毫秒)  设定定时(前一个线程的定时会影响后一个的定时)
timer.schedule(task1,1000);
timer.schedule(task2,1000);
```

## ScheduledExecutorService

```Java
//1:创建线程池对象
ScheduledExecutorService ses=Executors.newScheduledThreadPool(2);
//2:设定任务计划
//2-1:简单延时任务schedule
ses.schedule(()->{
    ...
},1000,TimeUnit.MILLISECONDS);  //延时一秒

//2-2:循环任务scheduleAtFixedRate
//scheduleAtFixedRate的间隔延时:从上个任务开始时就计时
//若任务执行时间超过了间隔延时,间隔延时将被强行加长
ses.scheduleAtFixedRate(()->{
    ...
},1,1,TimeUnit.SECONDS);  //初始化延时 + 间隔延时,延时一秒

//2-3:循环任务scheduleAtFixedDelay
//scheduleAtFixedDelay的间隔延时:从上个任务结束后再计时
ses.scheduleWithFixedDelay(()->{ 
    ...
},1,1,TimeUnit.SECONDS);  //初始化延时 + 间隔延时,延时一秒
```

# 读写锁

## ReentrantReadWriteLock

- 重入升级不支持：持有读锁时不能获取写锁
- 重入降级支持：持有写锁时可以获取读锁

```Java
ReentrantReadWriteLock rw = new ReentrantReadWriteLock();
//1:构造读锁readLock()
//(读锁不支持条件变量)
ReentrantReadWriteLock.ReadLock r = rw.readLock();
//1-2:构造写锁writeLock()
ReentrantReadWriteLock.WriteLock w = rw.writeLock();
//读锁和写锁的加锁和解锁操作仍然是lock()和unlock()
```

## StampedLock

```Java
StampedLock lock = new StampedLock();
//(StampedLock不支持可重入和条件变量)
//1:加读锁/解读锁
long stamp=lock.readLock();    //加锁
lock.unlockRead(stamp);        //解锁
//2:加写锁/解写锁
long stamp=lock.writeLock();    //加锁
lock.unlockWrite(stamp);        //解锁

//3:乐观读锁配置
//validate(long)    验证stamp(戳),检测期间是否有写操作发生
long stamp=lock.tryOptimisticRead();  //乐观读
if(!lock.validate(stamp)){
    ...    //若发生过写操作,升级为悲观读锁
}
```

# Semaphore

```Java
//1:创建信号量对象(参数为最大信号量)
Semaphore sem=new Semaphore(3);
//2:线程获取/释放信号量的逻辑
//acquire()    取信号量(未取得则阻塞)
//release()    释放信号量
try{
    sem.acquire();
}catch(InterruptedException e){
    ...
}
try{
    ...    //临界区
}finally{
    sem.release();
}
```

# CountdownLatch

```Java
//1:创建同步计数器对象(参数为初始计数值)
CountDownLatch latch=new CountDownLatch(3);
//2:计数值操作的逻辑
//countDown()    计数值-1
//await()        等待计数值归0(可实现join()的效果)
for(int i=0;i<3;++i){
    new Thread(()->{
        ...
        latch.countDown();  //等待n个线程执行完才归0
    }).start();
}
latch.await();              //等待子线程执行
...
```

# CyclicBarrier

```Java
//1:创建循环栅栏对象(参数为满足计数值)
CyclicBarrier cb=new CyclicBarrier(3);
//2:线程等待计数值逻辑
//await()    一直等待到线程数到达计数值才继续运行,否则阻塞
for(int i=0;i<3;++i){
    new Thread(()->{
        cb.await();    //等待所有线程全生成完再往下运行
        ...
    }).start();
}
```

# 线程安全集合

1. 遗留的安全集合：`Hashtable`，`Vector`
2. Collections修饰的安全集合：
   1. `Collections.synchronizedCollection`
   2. `Collections.synchronizedList`
   3. `Collections.synchronizedMap`
   4. `Collections.synchronizedSet`
   5. `Collections.synchronizedNavigableMap`
   6. `Collections.synchronizedNavigableSet`
   7. `Collections.synchronizedSortedMap`
   8. `Collections.synchronizedSortedSet`
3. java.util.concurrent下的安全集合：
   1. `BlockingXxx`：大部分基于锁，并提供阻塞的方法
   2. `CopyOnWriteXxx`：修改开销相对较重
   3. `ConcurrentXxx`：内部用CAS优化，支持较高吞吐量；弱一致性

## BlockingQueue

## BlockingDeque

1. `BlockingQueue`：单向阻塞队列
2. `BlockingDeque`：双向阻塞队列
   1. `ArrayBlockingQueue`： 由数组结构组成的有界阻塞队列
   2. `LinkedBlockingQueue`： 由链表结构组成的有界阻塞队列
   3. `PriorityBlockingQueue`： 支持优先级排序的无界阻塞队列
   4. `DelayQueue`： 使用优先级队列实现的无界阻塞队列
   5. `SynchronousQueue`： 不存储元素的阻塞队列
   6. `LinkedTransferQueue`： 由链表结构组成的无界阻塞队列
   7. `LinkedBlockingDeque`： 由链表结构组成的双向阻塞队列

```Java
//单向队列BlockingQueue
//1:插入数据
add(Object)                  //阻塞队列满时抛出异常
offer(Object)                //阻塞队列满时返回false
put(Object)                  //阻塞队列满时一直阻塞
offer(Object, int, TimeUnit) //阻塞队列满时等待超时时间,超时退出
//2:获取并移除队列头元素
remove()              //阻塞队列无元素时抛出异常 
poll()                //阻塞队列无元素时返回null
take()                //阻塞队列无元素时一直阻塞
poll(int, TimeUnit)   //阻塞队列无元素时等待超时时间,超时退出
//3:获取但不移除队列头元素
element()    //阻塞队列无元素时抛出异常
peek()       //阻塞队列无元素时返回null
//双向队列BlockingDeque
//(以操作头部元素为例,操作尾部元素将First改为Last即可)
//1:插入数据
addFirst(Object)                  //阻塞队列满时抛出异常
offerFirst(Object)                //阻塞队列满时返回false
putFirst(Object)                  //阻塞队列满时一直阻塞
offerFirst(Object, int, TimeUnit) //阻塞队列满时等待超时时间,超时退出
//2:获取并移除队列头元素
removeFirst()              //阻塞队列无元素时抛出异常 
pollFirst()                //阻塞队列无元素时返回null
takeFirst()                //阻塞队列无元素时一直阻塞
pollFirst(int, TimeUnit)   //阻塞队列无元素时等待超时时间,超时退出
//3:获取但不移除队列头元素
getFirst()        //阻塞队列无元素时抛出异常
peekFirst()       //阻塞队列无元素时返回null
```