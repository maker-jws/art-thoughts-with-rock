function parseQuery(string) {
    let isQuestion = null;
    const wordsArray = string.split(" ") //non destructive array 
    const firstWord = wordsArray[0]
    const firstThree = [wordsArray[0], wordsArray[1], wordsArray[2]] //
    console.log("fired from inside parseQuery")
    const containsQuestionMark = () => {
        for (let l = 0; l < string.length; l++) {
            if (string[l] === "?") {
                return true
            }
        }
    }
    //clean up word list
    //nouns 
    //verbs
    //adjectives
    //position
    //Test if question 
    if (containsQuestionMark(string)) {
        isQuestion = true;
        console.log("isQuestion: ", isQuestion)
    }

    // console.log(string, 'was passed')
    console.log(string, 'original string', wordsArray, 'new array', firstWord, 'first', firstThree, "firstThree", isQuestion, 'isQuestion')
    // hasQuestionMark();
}
module.exports = parseQuery