let gl_pattern,gl_solutions,gl_meanings, gamecount=1, currentPage=1; // Declare a global variable

const fetchConnectionsFromStorage = async (key) => {
   
    const pattern = [];
    const solutions = [];
    const meanings = [];
    console.log("fetchConnectionsFromStorage: ",'gemma-' + key);
    var data = getFromLocalStorage('gemma-' + key);
    data = data.toLowerCase(); // Convert data to lowercase
    data = JSON.parse(cleanJson(data));
    if (data && data.patterns) {
        data = data.patterns;
    } 
    console.log(data);
    // Assuming the JSON has an array of objects with pattern, solutions, and meanings properties
    if (data && data.length > 0) {
        data.forEach(obj => {
            if (Array.isArray(obj.japanese)) {
                pattern.push(obj.pattern.slice(0, 4));
            } else {
                pattern.push(obj.pattern.split(", ").map(item => item.trim()).slice(0, 4));
            }
            if (Array.isArray(obj.japanese)) {
                solutions.push(obj.japanese.slice(0, 4));
            } else {
                solutions.push(obj.japanese.split(", ").map(item => item.trim()).slice(0, 4));
            }
            if (Array.isArray(obj.english)) {
                meanings.push(obj.english.slice(0, 4));
            } else {
                meanings.push(obj.english.split(", ").map(item => item.trim()).slice(0, 4));
            }
        });
    }
    // console.log(pattern);
    // console.log(solutions);
    // console.log(meanings);
    return { pattern, solutions, meanings };
};
// Function to remove unnecessary text from JSON data
function cleanJson(jsonString) {
    // Define regular expression to remove triple backticks and 'json' keyword
    const regex = /```|json/g;
    // Replace unnecessary text with an empty string
    const cleanedJson = jsonString.replace(regex, '');
    return cleanedJson;
}
const fetchConnectionsFromDisk_v1 = async (fileNumber) => {
   
    const pattern = [];
    const solutions = [];
    const meanings = [];
    const fileName = 'patterns\\batch-'+fileNumber+'.json';
    const response = await fetch(fileName); // Fetch the file
    var data = await response.json(); // Parse the JSON
    data = JSON.parse(cleanJson(data)).patterns;
    // Assuming the JSON has an array of objects with pattern, solutions, and meanings properties
    if (data && data.length > 0) {
        data.forEach(obj => {
            if (Array.isArray(obj.japanese)) {
                pattern.push(obj.pattern);
            } else {
                pattern.push(obj.pattern.split(", ").map(item => item.trim()));
            }
            if (Array.isArray(obj.japanese)) {
                solutions.push(obj.japanese);
            } else {
                solutions.push(obj.japanese.split(", ").map(item => item.trim()));
            }
            if (Array.isArray(obj.japanese)) {
                meanings.push(obj.english);
            } else {
                meanings.push(obj.english.split(", ").map(item => item.trim()));
            }
        });
    }
    // console.log(pattern);
    // console.log(solutions);
    // console.log(meanings);
    return { pattern, solutions, meanings };
};
function shuffleTwoDimensionalArray(arr) {
    const flatArr = arr.flat(); // Flatten the array
    flatArr.sort(() => Math.random() - 0.5); // Shuffle the flattened array
    const shuffledArr = [];
    let index = 0;
    // Reconstruct the shuffled two-dimensional array
    for (let i = 0; i < arr.length; i++) {
        const row = [];
        for (let j = 0; j < arr[i].length; j++) {
            row.push(flatArr[index++]);
        }
        shuffledArr.push(row);
    }
    return shuffledArr;
}

// Function to shuffle a two-dimensional array
function shuffleTwoArrays(A, B) {
    // Shuffle arrays A and B while preserving relationships between corresponding elements
    const shuffledA = shuffleTwoDimensionalArray(A);
    const shuffledB = shuffleTwoDimensionalArray(B);
    //console.log(shuffledA);
    //console.log(shuffledB);
    return [shuffledA, shuffledB];
}


function fetchConnectionsFromDisk() {
    gamecount = Object.keys(localStorage).filter(key => key.startsWith('gemma-')).length;
    console.log("fetchConnectionsFromDisk: ",gamecount);
    backend(1)

    
    return
}

function showGridLoading(isLoading) {
    const gameBoard = document.querySelector('.game-board');
    if (isLoading) {
        const loadingSpinner = document.createElement('div');
        loadingSpinner.classList.add('loading-spinner');
        gameBoard.appendChild(loadingSpinner);
    } else {
        const loadingSpinner = gameBoard.querySelector('.loading-spinner');
        if (loadingSpinner) {
            loadingSpinner.remove();
        }
    }
}
const fetchDinkanPrompt = async () => {
    const fileName = 'jn.txt'
    const response = await fetch(fileName); 
    return await response.text();
}
function dinkan(){
    showGridLoading(true);
    fetchDinkanPrompt().then(result => {
            fetchConnectionsFromGemma(result).then((gemmaresponse) => {
                console.log('Data fetched from Gemma!');


            }).catch(error => {
                console.error('Error:', error);
            });
        }).catch(error => {
            // Handle any errors here
            console.error('Error:', error);
        }
    );
    showGridLoading(false);
}
function boardSetup() {
    let clickedPositions = [];
    const gameBoard = document.querySelector('.game-board');
    const rows = gameBoard.querySelectorAll('.row');
    //const cards = gameBoard.querySelectorAll('.card');

    for (let i = 0; i < gamewords.length; i++) {
        const row = rows[i];
        const words = gamewords[i];
        for (let j = 0; j < words.length ; j++) {
            const card = row.children[j];
            card.textContent = words[j];
            card.setAttribute('title', gamemeaning[i][j]);
            card.addEventListener('click', () => {
                const i = Array.from(row.parentNode.children).indexOf(row);
                const j = Array.from(row.children).indexOf(card);
                console.log(`Clicked on card at position (${i}, ${j})`);
                
                // Store the clicked position
                clickedPositions.push({ row: i, column: j });
            
                // Check if four consecutive clicks have been made
                if (clickedPositions.length === 4) {
                    const patternFound = findPattern(clickedPositions, gamewords, gl_pattern, gl_solutions);
                    console.log("Pattern found:", patternFound);
                    // Reset clickedPositions after finding the pattern
                    clickedPositions = [];
                }
            });
        }
    }
    console.log('Board setup!');
}   

async function fetchConnectionsFromGemma(examples_prompt) {
   
    const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "contents": [
                {
                    "role": "user",
                    "parts": [
                        {
                            "text": examples_prompt
                        }
                    ]
                }
            ]
        })
    });
    gamecount++;
    const data = await response.json();
    //console.log(data.candidates[0].content.parts[0].text);
    saveToLocalStorage('gemma-' + gamecount, data.candidates[0].content.parts[0].text);

}
// Function to save data to local storage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Data saved to local storage with key: ${key}`);
}

function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
}

function previousPage() {
    const prevPage = currentPage - 1;
    console.log("Previous page ",prevPage);
    if (currentPage > 1 && getFromLocalStorage('gemma-' + prevPage)) {
        console.log("Fetching previous page...", prevPage)
        currentPage = prevPage;
        backend(prevPage);
    } else {
        console.log("No previous page available.");
    }
}

function nextPage() {
    const nextPage = currentPage + 1;
    console.log("Next page ",nextPage);
    if (currentPage < gamecount  && getFromLocalStorage('gemma-' + nextPage)) {
        console.log("Fetching next page...", nextPage)
        currentPage = nextPage;
        backend(nextPage);
    } else {
        console.log("No next page available.");
    }
}

function backend(pageNumber){
    //fetchConnectionsFromDisk_v1(pageNumber).then(result => {
    fetchConnectionsFromStorage(pageNumber).then(result => {
        // Use the result here
        showGridLoading(true);

        gl_pattern=result.pattern;
        gl_solutions=result.solutions;
        gl_meanings=result.meanings;
        [gamewords,gamemeaning] = shuffleTwoArrays(gl_solutions,gl_meanings);
        
        boardSetup();
        showGridLoading(false);
      }).catch(error => {
        // Handle any errors here
        console.error('Error:', error);
      });
}
// Array to store clicked positions
let clickedPositions = [];

// Function to find the pattern for four consecutive clicks
function findPattern(clickedPositions, shuffledArray, pattern, originalArray) {
    if (clickedPositions.length < 4) {
        return "Keep clicking to select four consecutive positions.";
    }
    const clickedWords = clickedPositions.map(pos => shuffledArray[pos.row][pos.column]);
    console.log("Clicked words:", clickedWords);
    let patternIndex = -1;
    for (let i = 0; i < originalArray.length; i++) {
        console.log(originalArray[i])
        const indices = originalArray[i].map(word => clickedWords.indexOf(word));
      
        const sortedIndices = indices.slice().sort((a, b) => a - b); // Sort indices to find consecutive clicks
        console.log("Indices:", sortedIndices);
        if (sortedIndices.every((index, idx) => idx === 0 || (index === sortedIndices[idx - 1] + 1))) {
            patternIndex = i;
            break;
        }

    }
    return patternIndex !== -1 ? pattern[patternIndex] : "Invalid pattern";
}