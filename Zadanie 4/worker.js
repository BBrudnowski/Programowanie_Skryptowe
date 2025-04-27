
self.onmessage = function(it_value){
    const iterations = it_value.data
    let primes = [];
    for (let i = 0; i < 1000*iterations; i++) {
        let candidate = Math.floor(Math.random() * 1000000000);
        let isPrime = true;
        for (let c = 2; c <= Math.sqrt(candidate); ++c) {
            if (candidate % c === 0) {
                // not prime
                isPrime = false;
                break;
            }
        } 
        if (isPrime) {
            primes.push(candidate);
        }
    }
    postMessage(primes)

}