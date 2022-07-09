// const key = "53C9B0CF-E34D-4EFC-8079-6A9A259ABA2F";
const key = "0";
const fiatCurrency = ["USD", "AUD", "CNY", "EUR", "GBP", "JPY", "MYR", "SGD"];
const CryptoCurrency = ["ADA", "AXS", "BNB", "BTC", "DOGE", "ETH", "SHIB", "SLP", "SOL", "XRP"];
const recentInputCurrency = [];
const recentOutputCurrency = [];

// When Extension is Loaded
document.addEventListener("DOMContentLoaded", ()=>{
    var inputFiatList = document.getElementById("input-fiat");
    var outputFiatList = document.getElementById("output-fiat");
    var inputCryptoList = document.getElementById("input-crypto");
    var outputCryptoList = document.getElementById("output-crypto");

    // Initialize Fiat List
    fiatCurrency.forEach(element => {
        inputFiatList.innerHTML += "<option value=" + element + ">" + element + "</option>";
        outputFiatList.innerHTML += "<option value=" + element + ">" + element + "</option>";
    });

    // Initialize Crypto List
    CryptoCurrency.forEach(element => {
        inputCryptoList.innerHTML += "<option value=" + element + ">" + element + "</option>";
        outputCryptoList.innerHTML += "<option value=" + element + ">" + element + "</option>";
    });

    retrieveRecentList();
    updateRecent();
});

function updateRecent() {
    var inputRecentList = document.getElementById("input-recent");
    var outputRecentList = document.getElementById("output-recent");

    while (inputRecentList.firstChild) inputRecentList.removeChild(inputRecentList.firstChild);
    while (outputRecentList.firstChild) outputRecentList.removeChild(outputRecentList.firstChild);

    recentInputCurrency.forEach(element => {
        inputRecentList.innerHTML += "<option value=" + element + ">" + element + "</option>";
    });

    recentOutputCurrency.forEach(element => {
        outputRecentList.innerHTML += "<option value=" + element + ">" + element + "</option>";
    });
}

document.getElementById("btnConvert").onclick = function() {
    const inputCurrency = document.getElementById('input-currency').value;
    const outputCurrency = document.getElementById('output-currency').value;
    fetch(`https://rest.coinapi.io/v1/exchangerate/${inputCurrency}/${outputCurrency}?apikey=${key}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            const amount = document.getElementById("input-amount").value;
            const rate = data.rate;

            function convert(){
                return amount * rate;
            }
            // document.getElementById("output-amount").value = convert();
            document.getElementById("output-amount").value = "Test";

            if (recentInputCurrency.length === 0) {
                recentInputCurrency.push(inputCurrency);
            } else {
                var flagExist = false;
                for (let i = 0; i < recentInputCurrency.length; i++ ) {
                    if (recentInputCurrency[i] == inputCurrency) flagExist = true;
                }
                if (!flagExist) recentInputCurrency.push(inputCurrency);
            }

            if (recentOutputCurrency.length === 0) {
                recentOutputCurrency.push(outputCurrency);
            } else {
                var flagExist = false;
                for (let i = 0; i < recentOutputCurrency.length; i++ ) {
                    if (recentOutputCurrency[i] == outputCurrency) flagExist = true;
                }
                if (!flagExist) recentOutputCurrency.push(outputCurrency);
            }

            updateRecent();
            storeRecentList();
        })
        .catch((error) =>{
            console.log("Error: ", error);
        });

    return false;
};

function storeRecentList() {
    // Check browser support
    if (typeof(Storage) !== "undefined") {

        localStorage.setItem('recentInput', JSON.stringify(recentInputCurrency));
        localStorage.setItem('recentOutput', JSON.stringify(recentOutputCurrency));

    } else {
        document.getElementById("console").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}

function retrieveRecentList() {
        if (typeof(Storage) !== "undefined") {

            tempInputList = JSON.parse(localStorage.getItem('recentInput'));
            tempOutputList = JSON.parse(localStorage.getItem('recentOutput'));

            for (let i = 0; i < tempInputList.length; i++ ) {
                recentInputCurrency.push(tempInputList[i]);
            }

            for (let i = 0; i < tempOutputList.length; i++ ) {
                recentOutputCurrency.push(tempOutputList[i]);
            }
    
        } else {
            document.getElementById("console").innerHTML = "Sorry, your browser does not support Web Storage...";
        }

    }