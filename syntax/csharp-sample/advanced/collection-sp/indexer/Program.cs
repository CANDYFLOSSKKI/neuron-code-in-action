namespace advanced.collection_sp.indexer;

public class Program
{
    // 集合索引器

    // 1-整数索引和键值索引
    // ①支持整数索引的集合使用集合元素的顺序作为索引值
    // ②支持键值索引的集合存储键值对类型的集合元素,使用键Key作为索引值


    // 2-自定义索引器
    // 索引器可看作特殊的属性,可使用属性方式声明
    // 使用this关键字作为属性名声明索引器,并在方括号[]内声明参数

    // public int this[string key]
    // {
    //     get { return storage.Find(key); }    适用 item = someObject["key"];
    //     set { storage.SetAt(key, value); }   适用 someObject["key"] = item;
    // }

    // 2-1 组合键索引器
    // 单个索引参数不能确定集合元素时,可在索引器中声明多个参数作为组合键构成多维映射
    private int maxIterations = 100;
    public int this [double x, double y]
    {
        get
        {
            var iterations = 0;
            var x0 = x;
            var y0 = y;
            while ((x * x + y * y < 4) &&(iterations < maxIterations))
            {
                var newX = x * x - y * y + x0;
                y = 2 * x * y + y0;
                x = newX;
                iterations++;
            }
            return iterations;
        }
    }

    // 2-2 接口索引器
    // 接口上声明的索引器不使用访问修饰符,其访问器不包含正文
    // 接口索引器仅限制实现类索引器的参数列表和返回值,为实现类提供访问和操作集合元素的统一方式
    public interface ISomeInterface
    {
        string this[int index]
        {
            get;
            set;
        }
    }
}
