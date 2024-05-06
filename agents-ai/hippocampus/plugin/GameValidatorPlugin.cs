using System.ComponentModel;
using Microsoft.SemanticKernel;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Schema;
using Newtonsoft.Json.Linq;
public class GameValidatorPlugin
{


    [KernelFunction]
    [Description("Return true if json is valid, false otherwise.")]
    public string Validate(string data)
{
    try
    {
        // Parse the input data as JSON
        JToken json = JToken.Parse(data);

        // Define the JSON schema
        JSchema schema = JSchema.Parse(@"{
            'type': 'object',
            'properties': {
                'connections': {
                    'type': 'array',
                    'items': {
                        'type': 'object',
                        'properties': {
                            'pattern': {
                                'type': 'string',
                                'pattern': '^[\\w\\s-]+$'
                            },
                            'japanese':  {
                                'type': 'string',
                                'pattern': '^(.+,\\s*){3}.+$'
                            },
                            'english': {'type': 'string'},
                        },
                        'required': ['pattern', 'japanese', 'english']
                    }
                },
                'conversation': {
                    'type': 'array',
                    'items': {
                        'type': 'object',
                        'properties': {
                            'speaker': {'type': 'string'},
                            'japanese': {'type': 'string'},
                            'romaji': {'type': 'string'},
                            'english': {'type': 'string'},
                        },
                        'required': ['speaker', 'japanese', 'romaji', 'english']
                    }
                }
            },
            'required': ['connections', 'conversation']
        }");

        // Validate the JSON against the schema
        IList<string> validationErrors;
        bool isValid = json.IsValid(schema, out validationErrors);

        if (isValid)
        {
            // The data is valid, return the data
            return data;
        }
        else
        {
            // The data is not valid, handle the validation errors
            foreach (string error in validationErrors)
            {
                Console.WriteLine($"Validation error: {error}");
            }
            return string.Join(", ", validationErrors);
        }
    }
    catch (JsonReaderException ex)
    {
        // Handle any JSON parsing errors
        Console.WriteLine($"JSON parsing error: {ex.Message}");
        return ex.Message;
    }
}

}
