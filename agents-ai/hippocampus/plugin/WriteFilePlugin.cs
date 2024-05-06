using System.ComponentModel;
using Microsoft.SemanticKernel;
using System.IO;

public class WriteFilePlugin
{
    private string fileName =$"TextBook_{DateTime.Now:yyyyMMddHHmmss}.txt";

    [KernelFunction]
    [Description("Creates a file with the given content.")]
    public void CreateFile(string content)
    {
        File.WriteAllText(fileName, content);
        Console.WriteLine($"File '{fileName}' created successfully.");
    }
}
