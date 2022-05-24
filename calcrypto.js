//Initialize variables
//On-Click for Generate Button
document.getElementById("btnConvert").onclick = function() {
    var first_currency = firstCurrency();
    var second_currency = secondCurrency();
    calculateConversion(first_currency, second_currency)
};

function firstCurrency() {
    var select = document.getElementById("first_currency");
    var value = select.options[select.selectedIndex].value;

    return value;
}

function secondCurrency() {
    var select = document.getElementById("second_currency");
    var value = select.options[select.selectedIndex].value;

    return value;
}

function calculateConversion(fCurrency, sCurrency) {
    var amount = document.getElementById("txtAmount").value;

    switch (fCurrency) {
        case "BTC":
            //Harvard References
            document.getElementById("second_input").value =
                amount * 1000;
            break;

        case "USD":
            //Wikipedia References
            document.getElementById("second_input").value =
                amount / 1000;
            break;
    }
}