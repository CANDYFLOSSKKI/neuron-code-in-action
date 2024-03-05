namespace advanced.async_sp.task;

public class Program
{
    // 多线程并发任务
    public void TestTask()
    {
        // 1-Task的实例化
        // Task是并发任务的通用形式,使用构造函数传入需要多线程执行的操作即可
        // Task实例化时不能显式接收参数,但可以有返回值,异步操作的返回值类型和Task<>的泛型相同
        // 1-1 Task()构造函数实例化(包含需要异步执行的操作)
        // ①Task(无返回值的异步操作)
        Task task = new Task(() =>
        {
            for(int i=0;i<1000;++i){ Console.WriteLine(i); }
        });

        // ②Task<TResult>(有返回值的异步操作)
        Task<int> taskResult = new(() =>
        {
            int i = 0;
            for (; i < 100; ++i) {}
            return i;
        });

        // 1-2 Task.Yield()
        // Task.Yield()用于创建已经完成的任务,通常用于实现线程调度功能
        Task.Yield();

        // 1-3 Task.Delay()
        // Task.Delay()用于创建指定时间后完成的任务
        // Delay(TimeSpan)  创建一个在指定的时间间隔后完成的任务
        // Delay(Int32)     创建一个在指定的毫秒数后完成的任务
        Task.Delay(1000);
        Task.Delay(TimeSpan.FromSeconds(1));

        // 1-4 Task.FromResult()
        // Task.FromResult()用于创建已经完成且有指定返回值的任务
        Task<string> taskFr = Task.FromResult("Finished");


        // 2-Task的执行
        // 以下方法均可以实现Task的执行,通常如果不使用async,只使用Run()
        // 2-1 Task.Run() 接收操作参数返回对应的Task
        Task taskRun = Task.Run(() =>
        {
            for (int i = 0; i < 1000; ++i) { Console.WriteLine(i); }
        });

        // 2-2 TaskFactory.NewStart() 接收操作参数返回对应的Task
        Task taskFsn = Task.Factory.StartNew(() =>
        {
            for (int i = 0; i < 1000; ++i) { Console.WriteLine(i); }
        });

        // 2-3 Task.Start()
        // Task.Start()是Task的实例方法,执行时不考虑当前程序的上下文,通常不使用
        taskResult.Start();


        // 3-Task的批量操作
        // 调用Task.WhenAll()和Task.WhenAny()可以传递多个任务实参,使他们都执行操作
        //  ①Task.WhenAll()只有所有参数任务均完成时才完成,返回结果标识任务组完成
        //  ②Task.WhenAny()当任意参数任务完成时就完成,返回结果是该完成任务
        // (通常上述方法配合await使用)
        Task allComplete = Task.WhenAll(task, taskResult);
        Task anyComplete = Task.WhenAny(task, taskResult);


        // 4-Task的同步等待
        // 同步等待的意思是,目标Task操作完成之前,当前线程会一直阻塞,等待操作完成为止
        // 4-1 Wait() 等待单任务完成
        // Wait()	        等待Task完成执行过程
        // Wait(Int32)	    等待Task在指定的毫秒数内完成执行
        // Wait(TimeSpan)   等待Task在指定的时间间隔内完成执行
        task.Wait();
        task.Wait(1000);
        task.Wait(TimeSpan.FromMinutes(1));

        // 4-2 WaitAll() 等待所有任务完成
        // WaitAll(Task[])	            等待提供的所有Task对象完成执行过程
        // WaitAll(Task[], Int32)       等待所有提供的Task在指定的毫秒数内完成执行
        // WaitAll(Task[], TimeSpan)    等待所有提供的可取消Task对象在指定的时间间隔内完成执行
        Task.WaitAll(task, taskResult);
        Task.WaitAll(new Task[]{task,taskResult},1000);
        Task.WaitAll(new Task[]{task,taskResult},TimeSpan.FromMinutes(1));

        // 4-3 WaitAny() 等待任意任务完成
        // WaitAny(Task[])              等待提供的任一Task对象完成执行过程
        // WaitAny(Task[], Int32)       等待任何提供的Task对象在指定的毫秒数内完成执行
        // WaitAny(Task[], TimeSpan)	等待任何提供的Task对象在指定的时间间隔内完成执行
        Task.WaitAny(task, taskResult);
        Task.WaitAny(new Task[]{task,taskResult},1000);
        Task.WaitAny(new Task[]{task,taskResult},TimeSpan.FromMinutes(1));


        // 5-Task的任务取消
        // 5-1 外部控制标志CancellationToken
        // 实例化Task的方法通常都可以传入参数CancellationToken,用于控制异步任务
        // 通常使用CancellationTokenSource生成该参数,和Task配合使用:
        CancellationTokenSource cts = new CancellationTokenSource();
        // ①通过CancellationTokenSource获取Token
        CancellationToken token = cts.Token;
        Task taskCancel = Task.Run(() =>
        {
            // ②异步任务内部循环检测Token是否已被撤销(代表异步任务结束)
            while (!token.IsCancellationRequested) { }  // 异步任务逻辑
        }, token);
        // ③异步任务外部调用Cancel()显式撤销Token
        cts.Cancel();

        // 还可以定义该Token显式撤销时的回调方法Register()
        token.Register(() =>
        {
            Console.WriteLine("异步任务已被取消");
        });

        // 5-2 可撤销的封装异步任务TaskCompletionSource
        // 通过TaskCompletionSource可以获取无需Token也可以从外部主动撤销的异步任务
        TaskCompletionSource tcs = new TaskCompletionSource(() =>
        {
            for (int i = 0; i < 1000; ++i) { Console.WriteLine(i); }
        });
        Task taskCs = tcs.Task;
        tcs.SetCanceled();


        // 6-Task的资源释放
        // 调用Dispose()即可释放Task当前实例所使用的所有资源
        task.Dispose();
    }
}
