// 01 - using
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using Microsoft.SemanticKernel.Plugins.Core;
//using hippocampus.HttpClient;

//02 - create a kernel
var (useAzureOpenAI, model, azureEndpoint, apiKey, orgId) = Settings.LoadFromFile();

var config = new ConfigurationBuilder()
                                    .AddInMemoryCollection(new Dictionary<string, string>
                                    {
                                        { "OpenAI:Model", model },
                                        { "OpenAI:ApiKey", apiKey },
                                        { "OpenAI:OrgId", orgId }
                                    })
                                    .Build();

var builder = Kernel.CreateBuilder();
builder.AddOpenAIChatCompletion(model=config["OpenAI:Model"]
                                ,apiKey=config["OpenAI:ApiKey"]
                                ,orgId=config["OpenAI:OrgId"]);
#pragma warning disable SKEXP0050
builder.Plugins.AddFromType<CoursePlanner>();
builder.Plugins.AddFromType<GameValidatorPlugin>();
builder.Plugins.AddFromType<WriteFilePlugin>();     
builder.Plugins.AddFromType<ReadFilePlugin>();                          
var kernel = builder.Build();

IChatCompletionService chatCompletionService = kernel.GetRequiredService<IChatCompletionService>();

string language = "Japanese";
string romanization = "Romaji";
ChatHistory chatMessages = new ChatHistory($"""
You are a {language} professor who teaches student to learn words. 
You will complete required steps and request approval before taking any consequential actions. 
If the user doesn't provide enough information for you to complete a task, you will keep asking questions until you have
enough information to complete the task. send the response in json format to a file.
Kindly fill in the connections and conversations in {language}, English and Romaji
there should be 4 words in Japanese, English  - use only hiragana not katagana or Kanji
""");

chatMessages.AddSystemMessage($"""
- the output should be of json format
- use only hiragana
- dont' use katakana or kanji
- a json object with the following keys:
    - connections: an array of strings, the connections between the words
    - connections has three keys
        - pattern: a string, the pattern of the connection, one word in english
        - {language}: string of comma separated strings,there must be four words, the connection between the four words in {language}, use only hiragana, dont' use katakana or kanji
        - english: string of comma separated strings, the connection between the four in English
    - conversation: a array of strings, the conversation between the two personnels
    - there must be four objects in connections
    - conversation has keys
        - speaker: a string name in {language}, the speaker of the conversation use only hiragana, dont' use katakana or kanji
        - {language} a string, the conversation in {language}, use only hiragana, dont' use katakana or kanji
        - {romanization}: a string, the conversation in {romanization}
        - english: a string, the conversation in English
    - there must be four objects in conversation        
""");

// Start the conversation
while (true)
{
    // Get user input
    Console.Write("Teacher > ");
    chatMessages.AddUserMessage(Console.ReadLine()!);

    // Get the chat completions
    OpenAIPromptExecutionSettings openAIPromptExecutionSettings = new()
    {
        ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions
    };
    var result = chatCompletionService.GetStreamingChatMessageContentsAsync(
        chatMessages,
        executionSettings: openAIPromptExecutionSettings,
        kernel: kernel);

    // Stream the results
    string fullMessage = "";
    await foreach (var content in result)
    {
        if (content.Role.HasValue)
        {
            System.Console.Write("Assistant > ");
        }
        System.Console.Write(content.Content);
        fullMessage += content.Content;
    }
    System.Console.WriteLine();

    // Add the message from the agent to the chat history
    chatMessages.AddAssistantMessage(fullMessage);

}

