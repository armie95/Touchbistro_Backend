const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.use(express.json());

// Logic to find prime numbers using the Sieve of Eratosthenes
function sieveOfEratosthenes(n) {
  return new Promise((resolve, reject) => {
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

// Find median prime numbers
function findMedianPrimes(n) {
  return sieveOfEratosthenes(n).then((primeNumbers) => {
    if (primeNumbers.length === 0) {
      return [];
    }

    const mid = Math.floor(primeNumbers.length / 2);

    if (primeNumbers.length % 2 === 0) {
      return [primeNumbers[mid - 1], primeNumbers[mid]];
    }

    return [primeNumbers[mid]];
  });
}

app.get('/findmedians', async (req, res) => {
  const n = parseInt(req.query.n);
  if (!isNaN(n)) {
    try {
      const medians = await findMedianPrimes(n);
      res.json({ medians });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while finding median primes' });
    }
  } else {
    res.status(400).json({ error: 'Invalid input for n' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:8080");
});
