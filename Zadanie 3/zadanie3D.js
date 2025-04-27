let liczba1 = parseInt(pole_liczbowe)
let liczba2 = parseInt(pole_tekstowe)

function funkcja_zwrotna(){
    const wynik = document.forms[0]["wynik"]
    console.log("wczytanaWartośćZPolaTekstowego:", pole_liczbowe);
    console.log("wczytanaWartośćZPolaTekstowego:", pole_tekstowe);
    if (!isNan(liczba1)) {
        wynik.value = pole_tekstowe.value + pole_liczbowe.value;
    }
    else{
        console.log("Podano złą wartość")
    }
}