using System.ComponentModel;
using Microsoft.SemanticKernel;

public class CoursePlanner
{
    [KernelFunction]
    [Description("Returns back the required steps necessary to author a language learning tool")]
    [return: Description("The list of steps validate a json with a specific language content")]
    public async Task<string> GenerateRequiredStepsAsync(
        Kernel kernel,
        [Description("A 2-3 sentence description of what the language should be about")] string language
    )
    {
        // Prompt the LLM to generate a list of steps to complete the task
        var result = await kernel.InvokePromptAsync($"""
        Before I do that, can you succinctly recommend the top 3 steps I should take in a numbered list?
        1. Create a json file with the content
        2. Validate the json content
        3. Analyze the validation errors
        4. Try to correct the json file to fix the validation error
        5. If the issue persist, as the user to provide more information
        6. Do NOT Repeat yourselves
        7. make sure there is not validation errors
        """, new() {
            { "language", language }
        });

        // Return the plan back to the agent
        return result.ToString();
    }
}