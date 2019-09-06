
function parseQuery(string) {

    const testProcess = ["painting", "word", "poetry", "novel", "essay", "lecture", "contraption", "sketch", "sculpture", "drawing", "installation", "video", "film", "dance", "performance", "etching", "screen", "screenprint", "screen-print", "serigraph", "lithograph", "bronze", "marble", "oil", "canvas", "photograph", "photography", "snapshot", "build", "chord", "study", "tool", "hardware", "thought", "landscape", "still-life", "genre", "casting", "write", "mold", "relief", "carving", "bas", "work", "piece", "concept", "line", "artistry", "artist", "masterpiece", "master", "studio", "institutional"];
    const proNouns = ["I", "you", "he", "him", "they", "his", "we", "her", "hers", "us", `y'all`, "other", "our", `our's`, `their's`, "theirs", "its"];
    const dropWords = ["a", "the", "this", "to", "and", "in", "that", "it", "as", "at", "for", "on", "from", "or", "by"];
    const quantityWords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "hundred", "teen", "thousand", "some", "all", "none", "quotient", "division", "again"];
    const locationWords = ["out", "there", "up", "over", "down", "left", "right", "far", "outside", "foreign", "local", "urban", "regional"];
    const transitionWords = ["but", "yet", "next", "so", "first", "last", "lastly", "finally"];
    const questionWords = ["what", "who", "when", "where", "why", "how", "which", "can"];
    const testAdjectives = ["hot", "fat", "original", "big", "high"];
    const testVerbs = ["be", "said", "keep", "populate", "understand", "have", "let", "watch", "do", "begin", "follow", "say", "seem", "stop", "go", "help", "create", "can", "talk", "speak", "get", "turn", "read", "would", "start", "allow", "make", "might", "add", "know", "show", "spend", "will", "hear", "grow", "think", "play", "open", "take", "run", "walk", "see", "move", "win", "come", "like", "offer", "could", "live", "remember", "want", "believe", "love", "look", "hold", "consider", "use", "bring", "appear", "find", "happen", "buy", "give", "must", "wait", "tell", "write", "serve", "work", "provide", "die", "may", "sit", "send", "should", "stand", "expect", "call", "lose", "try", "pay", "stay", "ask", "meet", "fall", "need", "include", "cut", "feel", "continue", "reach", "become", "set", "kill", "leave", "learn", "remain"]
    const sentimentWords = ["happy", "sad", "mourning", "mourning", "angry", "shy", "embarrassed", "cold", "hot", "glad", "mean"]
    const evaluativeWords = ["good", "bad", "ugly", "pretty", "beautiful", "terrible", "successful"]

    const parsedString = {
        filteredString: "",
        isQuestion: false,
        isExclamation: false,
        wordsArray: [],
        firstWord: "",
        firstThree: [],
        nouns: [],
        verbs: [],
        adjectives: [],
        sentimentWords: [],
        evaluativeWords: [],
        specialCharacters: [],
        quoteMarks: [],
        hasQuote: false,
        targetStrings: []
    }

    //clean up word list
    const cleanString = (stage1) => {
        let rawString = stage1;
        rawString = rawString.replace(/[@|#|%|^|*|{|}|:|,|\|/|;|]/g, "")
        rawString = rawString.toLowerCase();
        console.log(rawString)
        for (let k = 0; k < rawString.length; k++) {
            //replace special characters for matching

            if (rawString[k] === "$" || rawString[k] === "&" || rawString[k] === "(" || rawString[k] === ")" || rawString[k] === ";") {
                const previousPosition = k
                const character = rawString[k]
                parsedString.specialCharacters.push([previousPosition, character])
                rawString = rawString.replace(rawString[k], "");

            } else if (rawString[k] === "?") {
                parsedString.isQuestion = true
                rawString = rawString.replace(rawString[k], "");

            } else if (rawString[k] === `"` || rawString[k] === `'`) {
                const quotePosition = k
                const character = rawString[k]
                parsedString.quoteMarks.push([quotePosition, character])
                rawString = rawString.replace(rawString[k], "");
            } else if (rawString[k] === "!") {
                parsedString.isExclamation = true
                rawString = rawString.replace(rawString[k], "");
            }
        }
        parsedString.filteredString = rawString;
    }
    function preFilterProcess() {
        cleanString(string);
        const pStr = parsedString
        pStr.wordsArray = pStr.filteredString.split(" ") //non destructive array 
        pStr.firstWord = pStr.wordsArray[0]
        pStr.firstThree = [pStr.wordsArray[0], pStr.wordsArray[1], pStr.wordsArray[2]] //
        console.log(parsedString)
        const list = testProcess //array 
        const source = pStr.wordsArray
        for (let n = 0; n < source.length; n++) {
            for (let p = 0; p < list.length; p++) {
                if (source[n] === list[p]) {
                    pStr.targetStrings.push(source[n])
                    console.log(source[n])
                    source.splice(n, 1);
                    //could remove from array
                }
                //later use regex - https://www.w3schools.com/js/js_regexp.asp
            }
        }
        console.log(pStr);
    }
    function gatherSentiment() {
        console.log("gatherSentiment");
    }

    gatherSentiment();
    preFilterProcess();
    console.log(parsedString)
    return parsedString;
}
module.exports = parseQuery


