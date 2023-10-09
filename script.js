const container = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const qutoeAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const quoteBtn = document.getElementById("new-quote");
const loadingSign = document.querySelector(".loader");

let apiQuotes = []

// Loading
const showLoadingSign = () => {
    loadingSign.hidden = false;
    container.hidden = true;
}
const hideLoadingSign = () => {
    loadingSign.hidden = true;
    container.hidden = false;
}

//Generate quotes 

const newQuote = () => {
    showLoadingSign()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if author value from api is empty
    if(!quote.author){
        qutoeAuthor.textContent = 'Unknown';
    }else{
        qutoeAuthor.textContent = quote.author
    }
    
    // Change text styling based of quote length
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }

    

    quoteText.textContent = quote.text;
    qutoeAuthor.textContent = quote.author;
    hideLoadingSign()
}
// Get quotes from api
const getQuotes = async () => {
    const url = `https://jacintodesign.github.io/quotes-api/data/quotes.json`
    try {
        const response = await fetch(url)
        apiQuotes = await response.json();
        newQuote()
        
    } catch (error) {
        getQuotes(); //Recursion
    }
}

const tweetButton = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${qutoeAuthor.textContent}`
    window.open(twitterUrl,'_blank')
}

//Event Listeners 
quoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetButton)

//On Load
getQuotes()