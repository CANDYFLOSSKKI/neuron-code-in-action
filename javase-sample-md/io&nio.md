# IO

|        | 字节流（非文本） | 字符流（文本） |
| ------ | ---------------- | -------------- |
| 输入流 | InputStream      | Reader         |
| 输出流 | OutputStream     | Writer         |

- **节点流**：FileInputStream / FileOutputSream / FileReader / FileWriter
- **缓冲流**：BufferedInputStream / BufferedOutputStream / BufferedReader / BufferedWriter
- **转换流**：InputStreamReader / OutputStreamWriter
- **标准流**：System.in / System.out / System.err
- **打印流**：PrintStream / PrintWriter
- **数据流**：DataInputStream / DataOutputStream
- **对象流**：ObjectInputStream / ObjectOutputStream
- **随机存取文件流**： RandomAccessFile

## File

```Java
//1:绝对路径创建File
File(String pathname)
//2:相对路径创建File
File(String parent, String child)    //父路径和子路径
File(File parent, String child)      //将另一个File对象作为父路径
String getAbsolutePath()    //获取绝对路径
String getPath()            //获取路径(创建时的路径)
String getName()            //获取名称
String getParent()          //获取上层文件目录的路径,没有则输出null
long length()               //获取文件长度(目录没有长度)
long lastModified()         //获取最后修改时间(时间戳)
String[] list()             //获取指定目录下所有文件的名称
File[] listFiles()          //获取指定目录下所有文件的File(绝对路径形式创建)
boolean renameTo(File dest) //把文件重命名到指定的文件路径
boolean isDirectory()       //判断是否为文件目录
boolean isFile()            //判断是否为文件
boolean exists()            //判断是否存在
boolean canRead()           //判断是否可读
boolean canWrite()          //判断是否可写
boolean isHidden()          //判断是否隐藏 
boolean createNewFile()     //创建文件,已存在则返回false
boolean mkdir()             //创建文件目录,已存在或上层目录不存在返回false
boolean mkdirs()            //创建文件目录,上层目录不存在则会一并创建
boolean delete()            //删除文件/文件夹(不经过回收站)
```

## 节点流

1. 文本文件操作

```Java
//1:创建节点流
FileReader fr=new FileReader(new File("A.txt"));
FileWriter fw=new FileWriter(new File("B.txt"));
//2:读取/写出文件数据
//read(char[],int off,int length)    读取,指定char[]的起始点和长度
//read(char[])                       直接读取到char[]中,返回读取的字符个数
//write(char[],int off,int length)   写出,指定char[]的起始点和长度
//write(String str)                  直接写出指定字符串
char[] cb=new char[10];
int len;
while((len=fr.read(cb))!=-1){
    fw.write(cb,0,len);
}
//3:关闭节点流
fr.close();
fw.close();
```

1. 非文本文件操作

```Java
//1:创建节点流
//FileOutputStream可指定append参数,如果为true则将数据添加在文件末尾,不清除
FileInputStream fis=new FileInputStream(new File("A.jpg"));
FileOutputStream fos=new FileOutputStream(new File("B.jpg"),true);
//2:读取/写出文件数据(把char[]改为byte[]即可)
byte[] buffer=new Byte[10];
int len;
while((len=fis.read(buffer))!=-1){
    fos.write(buffer,0,len);
}
//3:关闭节点流
fos.close();
fis.close();
```

## 缓冲流

1. 文本文件操作

```Java
//1:创建缓冲流(嵌套节点流)
BufferedReader br=new BufferedReader(new FileReader(new File("A.txt")));
BufferedWriter bw=new BufferedWriter(new FileWriter(new File("B.txt")));
//2:读取/写出文件数据
//readLine()    一次性从文本文件中读取一行数据,返回该行字符串
//newLine()     对文本文件写入换行符
//flush()       清空缓冲流的缓冲区,将缓冲数据发往目的地
String data;
while((data=br.readLine())!=null){
    bw.write(data);
    bw.newLine();
    bw.flush();
}
//3:关闭缓冲流(外层流关闭内层也会关闭)
br.close();
bw.close();
```

1. 非文本文件操作

```Java
//1:创建缓冲流(嵌套节点流)
BufferedInputStream bis=new BufferedInputStream(new FileInputStream(new File("A.jpg")));
BufferedOutputStream bos=new BufferedOutputStream(new FileOutputStream(new File("B.jpg")));
//2:读取/写出文件数据
byte[] buffer=new Byte[5];
int len;
while((len=bis.read(buffer))!=-1){
    bos.write(buffer,0,len);
}
//3:关闭缓冲流
bos.close();
bis.close();
```

## 转换流

```Java
//1:创建转换流(注意添加字符集参数)
//转换流是字节流-->字符流,因此内层嵌套的流要是字节流
InputStreamReader isr=new InputStreamReader(new FileInputStream("A.jpg"),"UTF-8");
OutputStream osw=new OutputStream(new FileOutputStream("B.jpg"),"gbk");
//2:读取/写出文件数据
char[] cbuf=new char[20];
int len;
while((len=isr.read(cbuf))!=-1){
    osw.write(cbuf,0,len);
}
//3:关闭缓冲流
isr.close();
osw.close();
```

## 标准流

```Java
//System封装的标准流:
//(从类型上可看出,标准流都属于字节流)
public static InputStream in     //System.in
public static PrintStream out    //System.out
public static PrintStream err    //System.err

System.setIn(InputStream in)     //重新指定输入流(默认从键盘输入)
System.setOut(OutputSream out)   //重新指定输出流(默认从控制台输出) 
//一般的应用场景是将输出流设定为打印流,输出到文件中
```

## 打印流

```Java
//1:创建打印流
//PrintStream(File file)        输出的目的地是一个文件
//PrintStream(OutputStream out) 输出的目的地是一个字节输出流
//PrintStream(String fileName)  输出的目的地是一个文件路径
PrintStream ps=new PrintStream("A.jpg");
PrintWriter pw=new PrintWriter("A.txt");
//2:输出到文件(自动flush())
void print(String str)        //写入字符串
void println(String str)      //写入字符串+换行符
//3:关闭打印流
ps.close();
pw.close();
```

## 数据流

```Java
//1:创建数据流(嵌套在任意InputStream/OutputStream的流上)
DataInputStream dis=new DataInputStream(new InputStream(new File("A.jpg")));
DataOutputStream dos=new DataOutputStream(new OutputStream(new File("B.jpg")));
//2:读取/写入文件数据(write同理,仅列出read方法)
boolean readBoolean()
byte readByte()
char readChar()
float readFloat()
double readDouble()
short readShort()
long readLong()
int readInt()
void readFully(byte[] b,int offset,int length) //指定文件偏移量长度读取到byte[]中
//2-1:读取UTF字符串数据
//String readUTF()    读取UTF-8字符串(使用readUTF()后,写出也要writeUTF())
//int avaliable()     判断文件还有多少字符可被读取(可读取时>0)
StringBuilder stb=new StringBuilder();
while(dis.avaliable()>0){
    stb.append(dis.readUTF());
}
String str=stb.toString();
//3:关闭数据流
dis.close();
dos.close();
```

## 对象流

```Java
//1:创建对象流
ObjectInputStream ois=new ObjectInputStream(new InputStream(new File("A.jpg")));
ObjectOutputStream oos=new ObjectOutputStream(new OutputStream(new File("B.jpg")));
//2:读取/写入文件数据
//readObject()              从文件中读出Object类型数据
//writeObject(Object obj)   向文件写入任意可序列化的类型数据
String str=(String)ois.readObject();
oos.writeObject(new String("ABC"));
oos.flush()；
//3:关闭对象流
ois.close();
oos.close();
```

自定义类可序列化的条件：

```Java
//1:实现接口Serializable
public Person implements Serializable{
    //2:提供全局常量serialVersionUID(对序列化对象版本控制)
    public static final long serialVersionUID=475463534532L;
    //3:类中的所有其它属性也要是可序列化的
}
```

## 随机存取文件流

```Java
//1:创建随机存取文件流
//RandomAccessFile(File file,String mode)    传递File文件类型
//RandomAccessFile(String name,String mode)  传递String路径类型
RandomAccessFile raf=new RandomAccessFile(new File("A.jpg"),"rw");
//常用访问模式(mode):
//r->以只读方式打开(如果文件不存在会报异常,不会自动创建)
//rw->打开以便读取和写入(以下3种如果文件不存在,会自动创建文件)
//rwd->打开以便读取和写入;同步文件内容的更新
//rws->打开以便读取和写入;同步文件内容和元数据的更新

//2:指定位置插入数据
//seek(long pos)    指定文件指针位置
//getFilePointer()  获取文件指针位置
raf.seek(new File("A.jpg").length());    //指针指向文件末尾,追加数据
raf.write("ABC".getBytes());             //主要要转成字节流再写入
//3:关闭随机存取文件流
raf.close();
```

# NIO

- File：指代文件
- Path：指代路径

## File转换Path

```Java
//1:实例化
File file=new File("index.html");
Path path=Paths.get("index.html");
//2:互转
//toFile()    Path-->File
//toPath()    File-->Path
File file_n=path.toFile();
Path path_n=file.toPath();
```

## Paths

```Java
//Paths仅包含Path的静态工厂方法:
Paths.get(String first,String ... more) //将多个字符串连成路径(默认路径分隔符连接)
Paths.get(URI uri)                      //返回指定URI对应的Path路径
```

## Files

```Java
byte[] readAllBytes(Path path)                        //读取所有内容
String readString(Path path, Charset charset)         //按指定字符集读取内容(1行)
List<String> readAllLines(Path path, Charset charset) //行集合读取所有文件内容

Path write(Path path, byte[] contents, OpenOption... options)  //写出字节数组
Path write(Path path, String contents, Charset charset, OpenOption... options) 
Path write(Path path, Iterable<> contents, OpenOption options) //写出字符串
Path copy(Path src, Path dest, CopyOption … how)               //文件复制
//1:常用OpenOption
//StandardOpenOption.READ    读方式
//StandardOpenOption.WRITE   写方式
//StandardOpenOption.APPEND  追加方式
//StandardOpenOption.CREATE  创建文件
//2:常用CopyOption
//StandardCopyOption.COPY_ATTRIBUTES    追加文件
//StandardCopyOption.REPLACE_EXISTING   替换文件

Path createDirectory(Path path, FileAttribute<?> … attr) //创建目录
Path createFile(Path path, FileAttribute<?> … arr)       //创建文件
void delete(Path path)                                   //删除文件/目录,不存在则报错
void deleteIfExists(Path path)                           //文件/目录如果存在执行删除
Path move(Path src, Path dest, CopyOption…how)           //将src移动到dest位置
long size(Path path)                                     //返回指定文件的大小

boolean exists(Path path, LinkOption … opts)         //判断文件是否存在
boolean isDirectory(Path path, LinkOption … opts)    //判断是否是目录
boolean isRegularFile(Path path, LinkOption … opts)  //判断是否是文件
boolean isHidden(Path path)                          //判断是否是隐藏文件
boolean isReadable(Path path)                        //判断文件是否可读
boolean isWritable(Path path)                        //判断文件是否可写
boolean notExists(Path path, LinkOption … opts)      //判断文件是否不存在

SeekableByteChannel newByteChannel(Path path, OpenOption…how) //获取与指定文件的连接
DirectoryStream<Path>  newDirectoryStream(Path path)          //打开path指定的目录
InputStream newInputStream(Path path, OpenOption…how)        //获取InputStream对象
OutputStream newOutputStream(Path path, OpenOption…how)      //获取OutputStream对象
```

## Path

```Java
String toString()                //返回调用Path对象的字符串表示形式
boolean startsWith(String path)  //判断是否以 path 路径开始
boolean endsWith(String path)    //判断是否以 path 路径结束
boolean isAbsolute()             //判断是否是绝对路径
Path getParent()                 //返回Path对象当前目录
Path getRoot()                   //返回调用Path对象的根路径
Path getFileName()               //返回与调用Path对象关联的文件名
int getNameCount()               //返回Path根目录后面元素的数量
Path getName(int idx)            //返回指定索引位置idx的路径名称
Path toAbsolutePath()            //作为绝对路径返回调用Path对象
Path resolve(Path p)             //合并两个路径，返回合并后路径对应的Path
```