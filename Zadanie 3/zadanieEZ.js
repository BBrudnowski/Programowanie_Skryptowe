function funkcja_zwrotna(){
    let poleTekstowe = form.elements.pole_tekstowe
    let poleLiczbowe = form.elements.pole_liczbowe
    console.log("wczytanaWartośćZPolaTekstowego:", poleTekstowe.value);
    console.log("wczytanaWartośćZPolaTekstowego:", poleLiczbowe.value);
    parseInt(pole_liczbowe);
    parseInt(pole_tekstowe);
    if (isNaN(pole_liczbowe) && isNaN(pole_tekstowe)) {
        wynik.value = parseInt(pole_liczbowe.value + pole_tekstowe.value)
    }
    else{
        alert("Podano złą wartość")
    }
}