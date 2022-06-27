document.getElementById("btnConvert").onclick = function() {
    const base = document.getElementById('input-currency').value;
    fetch(`https://api.exchangerate.host/latest?/source=ecb&base=${base}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            const amount = document.getElementById("input-amount").value;
            const currencyTo = document.getElementById('output-currency').value;
            const rate = data.rates[currencyTo];
            function convert(){
                return amount * rate;
            }
            document.getElementById("output-amount").value = convert();
        })
        .catch((error) =>{
            console.log("Error: ", error);
        });

    return false;
};