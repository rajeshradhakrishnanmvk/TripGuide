using System.ComponentModel;
using Microsoft.SemanticKernel;

namespace Plugins;

public class EmailPlugin
{
    [KernelFunction]
    [Description("Sends an email to a recipient.")]
    public async Task SendEmailAsync(
        [Description("Semicolon delimitated list of emails of the recipients")] string recipientEmails,
        string subject,
        string body
    )
    {
        // Add logic to send an email using the recipientEmails, subject, and body
        // For now, we'll just print out a success message to the console
        Console.WriteLine("Email sent!");
    }
}