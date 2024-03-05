namespace advanced.async_sp.async;

public class Program
{
    // 异步编程

    // 1-异步方法async
    // async用于声明异步方法,异步方法有如下的特征:
    //  ①返回值是Task或Task<TResult>(用于事件处理函数时可以定义为async void)
    //  ②内部包含await结构
    //  ③可以作为异步操作被await调用,实现异步操作的嵌套

    // await后跟Task或Task<TResult>,await会自动执行这个任务
    // await是非阻塞的,主线程可以先跳过异步函数执行后面的逻辑,任务执行完后该函数会继续执行
    // 如果异步任务有返回类型泛型,可以直接用该类型接收await的返回值,相当于方法调用

    // ①函数签名上声明async异步函数,返回值设为Task<TResult>类型
    public async Task<int> GetUrlContentLengthAsync()
    {
        var client = new HttpClient();
        // ②实例化函数内部执行的异步操作
        Task<string> getStringTask =
            client.GetStringAsync("https://learn.microsoft.com/dotnet");
        // ③await非阻塞执行该异步操作,使用对应类型接收返回值
        string contents = await getStringTask;
        // ④返回值会自动包装为Task类型
        return contents.Length;
    }


    // 2-有限时间的await等待
    // 如果await的异步操作出现故障,可能导致外部的async函数所在线程无限阻塞
    // 利用Task.AsyncWait()可以指定await的最长等待时间,超时抛出异常TimeoutException
    public async Task MyMethodAsync(Task myTask)
    {
        try
        {
            // ①调用WaitAsync(TimeSpan)设置最长等待5s
            await new Task(() =>
                {
                    for (int i = 0; i < 1000; ++i) { Console.WriteLine(i); }

                }).WaitAsync(TimeSpan.FromSeconds(5));
        }
        // ②处理可能出现的TimeoutException超时异常
        catch (TimeoutException e) { Console.WriteLine(e.ToString()); }
    }

    // 使用CancellationTokenSource的CancelAfter()也可以实现相同效果
    // 和Task中循环读取Token标志不同,对await超时直接外部抛出异常终止执行方法
    // 通常将CancellationTokenSource声明为静态结构使用
    static readonly CancellationTokenSource s_cts = new CancellationTokenSource();
    static async Task TestCancelAwait()
    {
        try
        {
            // ①调用CancelAfter()设置最长等待时间
            s_cts.CancelAfter(3500);
            // ②await运行异步任务
            await new Task(() =>
            {
                for (int i = 0; i < 1000; ++i) { Console.WriteLine(i); }
            });
        }
        // ③超时抛出异常OperationCanceledException,强制结束异步任务
        catch (OperationCanceledException)
        {
            Console.WriteLine("\nTasks cancelled: timed out.\n");
        }
        // ④无论超时与否,完成任务后调用Dispose()释放资源
        finally
        {
            s_cts.Dispose();
        }
    }

    // 还可以把上述s_cts.Cancel()包装到位置靠前的非await异步任务中,预先设定好异步任务执行的时间
    // 该异步任务结束后同样会调用Cancel()导致进入catch语句块,实现任务的超时控制功能


    // 3-多功能的await异步任务
    // 利用Task不同的实例化方式,可以通过await实现异步操作的不同功能
    public async Task TestMultiFuncAwait()
    {
        // 3-1 配合Task.Yield()
        // Task.Yield()用于创建已经完成的任务
        // await该任务可以建议任务调度程序先去执行队列中的其他任务,用于调控线程优先级
        // 如果函数都是同步方法却想异步执行,可以await该任务防止方法签名上的async报错
        await Task.Yield();

        // 3-2 配合Task.Delay()
        // Task.Delay()用于创建指定时间后完成的任务
        // Task.Delay()不包含具体的异步操作,await该任务可以实现延时执行和线程调度的效果
        await Task.Delay(TimeSpan.FromSeconds(1));

        // 3-3 配合批量操作
        // 如果想包装多个Task进行批量执行,Task.WaitAll()/WaitAny()会造成主线程的阻塞
        // 更换为await Task.WhenAll()/WhenAny()可以实现非阻塞的批量执行和等待操作
    }
}
