const codeExamples = {
  javascript: `// The substitution method is a proof technique, not an algorithm.
// Code cannot replace the induction - but it CAN show you, before you
// spend time on algebra, whether a guess is even plausible.

// Compute T(n) = 2T(n/2) + n exactly, with T(1) = 1.
function T(n, memo = new Map()) {
  if (n <= 1) return 1;
  if (memo.has(n)) return memo.get(n);

  const value = 2 * T(Math.floor(n / 2), memo) + n;
  memo.set(n, value);
  return value;
}

// A correct guess: T(n) <= c*n*log2(n) holds with a FIXED c.
// This is what "the constant comes out unchanged" looks like numerically.
function checkNLogN(c = 2) {
  console.log("n\\tT(n)\\t\\tc*n*log2(n)\\tholds?");
  for (let n = 2; n <= 4096; n *= 2) {
    const bound = c * n * Math.log2(n);
    console.log(\`\${n}\\t\${T(n)}\\t\\t\${bound.toFixed(0)}\\t\\t\${T(n) <= bound}\`);
  }
}

// A wrong guess: T(n) <= c*n needs a BIGGER c at every size.
// The ratio T(n)/n keeps climbing, so no single constant works -
// exactly the failure the algebra shows as "(c + 1)n".
function whyLinearFails() {
  console.log("n\\tT(n)/n  <- the 'constant' c would have to be at least this");
  for (let n = 2; n <= 4096; n *= 2) {
    console.log(\`\${n}\\t\${(T(n) / n).toFixed(2)}\`);
  }
}

// T(n) = T(n-1) + n, with T(1) = 1. Guess O(n^2), proved with c = 1.
function TSubtractive(n) {
  let total = 1;
  for (let i = 2; i <= n; i++) total += i;
  return total;
}

function checkQuadratic(c = 1) {
  for (let n = 1; n <= 1000; n *= 10) {
    const bound = c * n * n;
    console.log(\`n=\${n}\\tT(n)=\${TSubtractive(n)}\\tc*n^2=\${bound}\\t\${TSubtractive(n) <= bound}\`);
  }
}

checkNLogN();
whyLinearFails();
checkQuadratic();`,

  python: `# The substitution method is a proof technique, not an algorithm.
# Code cannot replace the induction - but it CAN show you, before you
# spend time on algebra, whether a guess is even plausible.

import math
from functools import lru_cache


# Compute T(n) = 2T(n/2) + n exactly, with T(1) = 1.
@lru_cache(maxsize=None)
def T(n):
    if n <= 1:
        return 1
    return 2 * T(n // 2) + n


# A correct guess: T(n) <= c*n*log2(n) holds with a FIXED c.
# This is what "the constant comes out unchanged" looks like numerically.
def check_n_log_n(c=2):
    print("n\\tT(n)\\t\\tc*n*log2(n)\\tholds?")
    n = 2
    while n <= 4096:
        bound = c * n * math.log2(n)
        print(f"{n}\\t{T(n)}\\t\\t{bound:.0f}\\t\\t{T(n) <= bound}")
        n *= 2


# A wrong guess: T(n) <= c*n needs a BIGGER c at every size.
# The ratio T(n)/n keeps climbing, so no single constant works -
# exactly the failure the algebra shows as "(c + 1)n".
def why_linear_fails():
    print("n\\tT(n)/n  <- the 'constant' c would have to be at least this")
    n = 2
    while n <= 4096:
        print(f"{n}\\t{T(n) / n:.2f}")
        n *= 2


# T(n) = T(n-1) + n, with T(1) = 1. Guess O(n^2), proved with c = 1.
def t_subtractive(n):
    return sum(range(1, n + 1))


def check_quadratic(c=1):
    n = 1
    while n <= 1000:
        bound = c * n * n
        print(f"n={n}\\tT(n)={t_subtractive(n)}\\tc*n^2={bound}\\t"
              f"{t_subtractive(n) <= bound}")
        n *= 10


check_n_log_n()
why_linear_fails()
check_quadratic()`,

  java: `// The substitution method is a proof technique, not an algorithm.
// Code cannot replace the induction - but it CAN show you, before you
// spend time on algebra, whether a guess is even plausible.

import java.util.HashMap;
import java.util.Map;

public class SubstitutionDemo {

    static Map<Integer, Long> memo = new HashMap<>();

    // Compute T(n) = 2T(n/2) + n exactly, with T(1) = 1.
    static long T(int n) {
        if (n <= 1) return 1;
        if (memo.containsKey(n)) return memo.get(n);

        long value = 2 * T(n / 2) + n;
        memo.put(n, value);
        return value;
    }

    // A correct guess: T(n) <= c*n*log2(n) holds with a FIXED c.
    // This is what "the constant comes out unchanged" looks like numerically.
    static void checkNLogN(double c) {
        System.out.println("n\\tT(n)\\t\\tc*n*log2(n)\\tholds?");
        for (int n = 2; n <= 4096; n *= 2) {
            double bound = c * n * (Math.log(n) / Math.log(2));
            System.out.printf("%d\\t%d\\t\\t%.0f\\t\\t%b%n",
                n, T(n), bound, T(n) <= bound);
        }
    }

    // A wrong guess: T(n) <= c*n needs a BIGGER c at every size.
    // The ratio T(n)/n keeps climbing, so no single constant works -
    // exactly the failure the algebra shows as "(c + 1)n".
    static void whyLinearFails() {
        System.out.println("n\\tT(n)/n  <- c would have to be at least this");
        for (int n = 2; n <= 4096; n *= 2) {
            System.out.printf("%d\\t%.2f%n", n, (double) T(n) / n);
        }
    }

    // T(n) = T(n-1) + n, with T(1) = 1. Guess O(n^2), proved with c = 1.
    static long tSubtractive(int n) {
        long total = 1;
        for (int i = 2; i <= n; i++) total += i;
        return total;
    }

    public static void main(String[] args) {
        checkNLogN(2);
        whyLinearFails();
        for (int n = 1; n <= 1000; n *= 10) {
            System.out.printf("n=%d\\tT(n)=%d\\tc*n^2=%d\\t%b%n",
                n, tSubtractive(n), (long) n * n, tSubtractive(n) <= (long) n * n);
        }
    }
}`,

  c: `/* The substitution method is a proof technique, not an algorithm.
   Code cannot replace the induction - but it CAN show you, before you
   spend time on algebra, whether a guess is even plausible. */

#include <stdio.h>
#include <math.h>

/* Compute T(n) = 2T(n/2) + n exactly, with T(1) = 1.
   The chain of halvings is short, so plain recursion is fine here. */
long T(int n) {
    if (n <= 1) return 1;
    return 2 * T(n / 2) + n;
}

/* A correct guess: T(n) <= c*n*log2(n) holds with a FIXED c.
   This is what "the constant comes out unchanged" looks like numerically. */
void checkNLogN(double c) {
    printf("n\\tT(n)\\t\\tc*n*log2(n)\\tholds?\\n");
    for (int n = 2; n <= 4096; n *= 2) {
        double bound = c * n * (log(n) / log(2));
        printf("%d\\t%ld\\t\\t%.0f\\t\\t%s\\n",
               n, T(n), bound, T(n) <= bound ? "true" : "false");
    }
}

/* A wrong guess: T(n) <= c*n needs a BIGGER c at every size.
   The ratio T(n)/n keeps climbing, so no single constant works -
   exactly the failure the algebra shows as "(c + 1)n". */
void whyLinearFails(void) {
    printf("n\\tT(n)/n  <- c would have to be at least this\\n");
    for (int n = 2; n <= 4096; n *= 2) {
        printf("%d\\t%.2f\\n", n, (double) T(n) / n);
    }
}

/* T(n) = T(n-1) + n, with T(1) = 1. Guess O(n^2), proved with c = 1. */
long tSubtractive(int n) {
    long total = 1;
    for (int i = 2; i <= n; i++) total += i;
    return total;
}

int main(void) {
    checkNLogN(2.0);
    whyLinearFails();

    for (int n = 1; n <= 1000; n *= 10) {
        long bound = (long) n * n;
        printf("n=%d\\tT(n)=%ld\\tc*n^2=%ld\\t%s\\n",
               n, tSubtractive(n), bound,
               tSubtractive(n) <= bound ? "true" : "false");
    }
    return 0;
}`,

  cpp: `// The substitution method is a proof technique, not an algorithm.
// Code cannot replace the induction - but it CAN show you, before you
// spend time on algebra, whether a guess is even plausible.

#include <iostream>
#include <cmath>
#include <unordered_map>

// Compute T(n) = 2T(n/2) + n exactly, with T(1) = 1.
long T(int n) {
    static std::unordered_map<int, long> memo;
    if (n <= 1) return 1;

    auto it = memo.find(n);
    if (it != memo.end()) return it->second;

    long value = 2 * T(n / 2) + n;
    memo[n] = value;
    return value;
}

// A correct guess: T(n) <= c*n*log2(n) holds with a FIXED c.
// This is what "the constant comes out unchanged" looks like numerically.
void checkNLogN(double c) {
    std::cout << "n\\tT(n)\\t\\tc*n*log2(n)\\tholds?\\n";
    for (int n = 2; n <= 4096; n *= 2) {
        double bound = c * n * std::log2(n);
        std::cout << n << "\\t" << T(n) << "\\t\\t" << bound << "\\t\\t"
                  << (T(n) <= bound ? "true" : "false") << "\\n";
    }
}

// A wrong guess: T(n) <= c*n needs a BIGGER c at every size.
// The ratio T(n)/n keeps climbing, so no single constant works -
// exactly the failure the algebra shows as "(c + 1)n".
void whyLinearFails() {
    std::cout << "n\\tT(n)/n  <- c would have to be at least this\\n";
    for (int n = 2; n <= 4096; n *= 2) {
        std::cout << n << "\\t" << static_cast<double>(T(n)) / n << "\\n";
    }
}

// T(n) = T(n-1) + n, with T(1) = 1. Guess O(n^2), proved with c = 1.
long tSubtractive(int n) {
    long total = 1;
    for (int i = 2; i <= n; i++) total += i;
    return total;
}

int main() {
    checkNLogN(2.0);
    whyLinearFails();

    for (int n = 1; n <= 1000; n *= 10) {
        long bound = static_cast<long>(n) * n;
        std::cout << "n=" << n << "\\tT(n)=" << tSubtractive(n)
                  << "\\tc*n^2=" << bound << "\\t"
                  << (tSubtractive(n) <= bound ? "true" : "false") << "\\n";
    }
    return 0;
}`,
};

export default codeExamples;
