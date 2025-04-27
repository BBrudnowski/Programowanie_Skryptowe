function funkcja_zwrotna() {
    const poleTekstowe = document.getElementById('pole_tekstowe').value;
    const poleLiczbowe = document.getElementById('pole_liczbowe').value;

    // Konwertuj wartość liczbową na liczbę całkowitą
    const liczba = parseInt(poleLiczbowe);

    // Sprawdź, czy liczba jest poprawna (czy nie jest NaN)
    if (!isNaN(liczba)) {
        // Jeśli liczba jest poprawna, dodaj tekst do liczby
        const wynik = poleTekstowe + liczba;
        document.querySelector('output[name="wynik"]').value = wynik;
    } else {
        alert('Proszę wprowadzić poprawną liczbę całkowitą!');
    }
}