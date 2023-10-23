function sieveOfEratosthenes(n) {
  return new Promise((resolve) => {
    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = false;
    isPrime[1] = false;

    for (let p = 2; p * p <= n; p++) {
      if (isPrime[p]) {
        for (let i = p * p; i <= n; i += p) {
          isPrime[i] = false;
        }
      }
    }

    const primes = [];
    for (let i = 2; i <= n; i++) {
      if (isPrime[i]) {
        primes.push(i);
      }
    }

    resolve(primes);
  });
}

async function findMedianPrimes(n) {
  const primeNumbers = await sieveOfEratosthenes(n);

  if (primeNumbers.length === 0) {
    return [];
  }

  const mid = Math.floor(primeNumbers.length / 2);

  if (primeNumbers.length % 2 === 0) {
    return [primeNumbers[mid - 1], primeNumbers[mid]];
  }

  return [primeNumbers[mid]];
}

module.exports = findMedianPrimes;
