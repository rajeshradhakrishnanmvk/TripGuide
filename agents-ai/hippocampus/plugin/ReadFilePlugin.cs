using System;
using System.ComponentModel;
using Microsoft.SemanticKernel;
using System.IO;

public class ReadFilePlugin
{

    [KernelFunction]
    [Description("Read the content in the given filename.")]
    public string ReadFile(string fileName)
    {
        string content = File.ReadAllText(fileName);
        Console.WriteLine($"File '{fileName}' read successfully.");
        return content;
    }
}
