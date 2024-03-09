public class Program
{
    public Action<int>? UpdateCapturedLocalVariable;

    public void Run(int input)
    {
        int j = 0;
        UpdateCapturedLocalVariable = x =>
        {
            j = x;
            bool result = j > input;
            Console.WriteLine($"{j} is greater than {input}: {result}");
        };
    }

    public static void Main(string[] args)
    {
        Program p = new Program();
        p.Run(1);
        p.UpdateCapturedLocalVariable(2);
    }
}
