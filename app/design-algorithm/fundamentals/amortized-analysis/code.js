const codeExamples = {
  javascript: `// Amortized analysis, measured rather than asserted.

// ---- A dynamic array that reports what each append really costs ----
class DynamicArray {
  constructor() {
    this.buffer = new Array(1);
    this.capacity = 1;
    this.size = 0;
    this.totalCost = 0;
  }

  append(value) {
    let cost = 1;                       // the write itself

    if (this.size === this.capacity) {  // full: grow and copy
      const bigger = new Array(this.capacity * 2);
      for (let i = 0; i < this.size; i++) bigger[i] = this.buffer[i];

      cost += this.size;                // Theta(n) - but only sometimes
      this.buffer = bigger;
      this.capacity *= 2;
    }

    this.buffer[this.size++] = value;
    this.totalCost += cost;
    return cost;
  }
}

// Aggregate analysis says total < 3n, so the average is O(1).
function measureAppends(n) {
  const arr = new DynamicArray();
  for (let i = 0; i < n; i++) arr.append(i);

  console.log(\`n=\${n}\\ttotal=\${arr.totalCost}\\tper append=\${(arr.totalCost / n).toFixed(3)}\`);
}

// ---- Growing by a CONSTANT instead: the guarantee disappears ----
function measureConstantGrowth(n, step = 10) {
  let capacity = step, size = 0, totalCost = 0;

  for (let i = 0; i < n; i++) {
    let cost = 1;
    if (size === capacity) {
      cost += size;                     // copy everything, again
      capacity += step;                 // ... only to fill up 10 slots later
    }
    totalCost += cost;
    size++;
  }
  console.log(\`n=\${n}\\ttotal=\${totalCost}\\tper append=\${(totalCost / n).toFixed(1)} <- grows with n\`);
}

// ---- Binary counter: a single increment can flip many bits ----
// Potential method: let Phi = number of 1 bits. An increment flipping k
// trailing 1s has actual cost k+1 and changes Phi by 1-k, so the
// amortized cost is (k+1) + (1-k) = 2.
function measureCounter(n) {
  const bits = [];
  let flips = 0;

  for (let k = 0; k < n; k++) {
    let i = 0;
    while (bits[i] === 1) { bits[i] = 0; flips++; i++; }
    bits[i] = 1; flips++;
  }
  console.log(\`n=\${n}\\tflips=\${flips}\\tper increment=\${(flips / n).toFixed(5)}\`);
}

console.log("Doubling array - per-append cost stays constant:");
[1000, 10000, 100000, 1000000].forEach(measureAppends);

console.log("\\nConstant growth - per-append cost does NOT stay constant:");
[1000, 10000, 100000].forEach((n) => measureConstantGrowth(n));

console.log("\\nBinary counter - converges on 2 flips per increment:");
[100, 10000, 1000000].forEach(measureCounter);`,

  python: `# Amortized analysis, measured rather than asserted.


# ---- A dynamic array that reports what each append really costs ----
class DynamicArray:
    def __init__(self):
        self.buffer = [None]
        self.capacity = 1
        self.size = 0
        self.total_cost = 0

    def append(self, value):
        cost = 1                              # the write itself

        if self.size == self.capacity:        # full: grow and copy
            bigger = [None] * (self.capacity * 2)
            for i in range(self.size):
                bigger[i] = self.buffer[i]

            cost += self.size                 # Theta(n) - but only sometimes
            self.buffer = bigger
            self.capacity *= 2

        self.buffer[self.size] = value
        self.size += 1
        self.total_cost += cost
        return cost


# Aggregate analysis says total < 3n, so the average is O(1).
def measure_appends(n):
    arr = DynamicArray()
    for i in range(n):
        arr.append(i)
    print(f"n={n}\\ttotal={arr.total_cost}\\tper append={arr.total_cost / n:.3f}")


# ---- Growing by a CONSTANT instead: the guarantee disappears ----
def measure_constant_growth(n, step=10):
    capacity, size, total_cost = step, 0, 0

    for _ in range(n):
        cost = 1
        if size == capacity:
            cost += size                      # copy everything, again
            capacity += step                  # only to fill up 10 slots later
        total_cost += cost
        size += 1

    print(f"n={n}\\ttotal={total_cost}\\tper append={total_cost / n:.1f} <- grows with n")


# ---- Binary counter: a single increment can flip many bits ----
# Potential method: let Phi = number of 1 bits. An increment flipping k
# trailing 1s has actual cost k+1 and changes Phi by 1-k, so the
# amortized cost is (k+1) + (1-k) = 2.
def measure_counter(n):
    bits = [0] * 64
    flips = 0

    for _ in range(n):
        i = 0
        while bits[i] == 1:
            bits[i] = 0
            flips += 1
            i += 1
        bits[i] = 1
        flips += 1

    print(f"n={n}\\tflips={flips}\\tper increment={flips / n:.5f}")


print("Doubling array - per-append cost stays constant:")
for n in [1000, 10000, 100000]:
    measure_appends(n)

print("\\nConstant growth - per-append cost does NOT stay constant:")
for n in [1000, 10000, 100000]:
    measure_constant_growth(n)

print("\\nBinary counter - converges on 2 flips per increment:")
for n in [100, 10000, 1000000]:
    measure_counter(n)`,

  java: `// Amortized analysis, measured rather than asserted.

import java.util.Arrays;

public class AmortizedDemo {

    // ---- A dynamic array that reports what each append really costs ----
    static class DynamicArray {
        int[] buffer = new int[1];
        int capacity = 1;
        int size = 0;
        long totalCost = 0;

        int append(int value) {
            int cost = 1;                       // the write itself

            if (size == capacity) {             // full: grow and copy
                int[] bigger = new int[capacity * 2];
                System.arraycopy(buffer, 0, bigger, 0, size);

                cost += size;                   // Theta(n) - but only sometimes
                buffer = bigger;
                capacity *= 2;
            }

            buffer[size++] = value;
            totalCost += cost;
            return cost;
        }
    }

    // Aggregate analysis says total < 3n, so the average is O(1).
    static void measureAppends(int n) {
        DynamicArray arr = new DynamicArray();
        for (int i = 0; i < n; i++) arr.append(i);

        System.out.printf("n=%d\\ttotal=%d\\tper append=%.3f%n",
            n, arr.totalCost, (double) arr.totalCost / n);
    }

    // ---- Growing by a CONSTANT instead: the guarantee disappears ----
    static void measureConstantGrowth(int n, int step) {
        long capacity = step, size = 0, totalCost = 0;

        for (int i = 0; i < n; i++) {
            long cost = 1;
            if (size == capacity) {
                cost += size;                   // copy everything, again
                capacity += step;               // only to fill up again soon
            }
            totalCost += cost;
            size++;
        }
        System.out.printf("n=%d\\ttotal=%d\\tper append=%.1f <- grows with n%n",
            n, totalCost, (double) totalCost / n);
    }

    // ---- Binary counter: a single increment can flip many bits ----
    // Potential method: let Phi = number of 1 bits. An increment flipping k
    // trailing 1s has actual cost k+1 and changes Phi by 1-k, so the
    // amortized cost is (k+1) + (1-k) = 2.
    static void measureCounter(int n) {
        int[] bits = new int[64];
        long flips = 0;

        for (int k = 0; k < n; k++) {
            int i = 0;
            while (bits[i] == 1) { bits[i] = 0; flips++; i++; }
            bits[i] = 1; flips++;
        }
        System.out.printf("n=%d\\tflips=%d\\tper increment=%.5f%n",
            n, flips, (double) flips / n);
    }

    public static void main(String[] args) {
        System.out.println("Doubling array - per-append cost stays constant:");
        for (int n : new int[]{1000, 10000, 100000}) measureAppends(n);

        System.out.println("\\nConstant growth - per-append cost does NOT:");
        for (int n : new int[]{1000, 10000, 100000}) measureConstantGrowth(n, 10);

        System.out.println("\\nBinary counter - converges on 2 per increment:");
        for (int n : new int[]{100, 10000, 1000000}) measureCounter(n);
    }
}`,

  c: `/* Amortized analysis, measured rather than asserted. */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* ---- A dynamic array that reports what each append really costs ---- */
typedef struct {
    int *buffer;
    long capacity;
    long size;
    long totalCost;
} DynamicArray;

void initArray(DynamicArray *arr) {
    arr->buffer = malloc(sizeof(int));
    arr->capacity = 1;
    arr->size = 0;
    arr->totalCost = 0;
}

long append(DynamicArray *arr, int value) {
    long cost = 1;                          /* the write itself */

    if (arr->size == arr->capacity) {       /* full: grow and copy */
        int *bigger = malloc(arr->capacity * 2 * sizeof(int));
        memcpy(bigger, arr->buffer, arr->size * sizeof(int));

        cost += arr->size;                  /* Theta(n) - but only sometimes */
        free(arr->buffer);
        arr->buffer = bigger;
        arr->capacity *= 2;
    }

    arr->buffer[arr->size++] = value;
    arr->totalCost += cost;
    return cost;
}

/* Aggregate analysis says total < 3n, so the average is O(1). */
void measureAppends(long n) {
    DynamicArray arr;
    initArray(&arr);
    for (long i = 0; i < n; i++) append(&arr, (int) i);

    printf("n=%ld\\ttotal=%ld\\tper append=%.3f\\n",
           n, arr.totalCost, (double) arr.totalCost / n);
    free(arr.buffer);
}

/* ---- Growing by a CONSTANT instead: the guarantee disappears ---- */
void measureConstantGrowth(long n, long step) {
    long capacity = step, size = 0, totalCost = 0;

    for (long i = 0; i < n; i++) {
        long cost = 1;
        if (size == capacity) {
            cost += size;                   /* copy everything, again */
            capacity += step;               /* only to fill up again soon */
        }
        totalCost += cost;
        size++;
    }
    printf("n=%ld\\ttotal=%ld\\tper append=%.1f <- grows with n\\n",
           n, totalCost, (double) totalCost / n);
}

/* ---- Binary counter: a single increment can flip many bits ----
   Potential method: let Phi = number of 1 bits. An increment flipping k
   trailing 1s has actual cost k+1 and changes Phi by 1-k, so the
   amortized cost is (k+1) + (1-k) = 2. */
void measureCounter(long n) {
    int bits[64] = {0};
    long flips = 0;

    for (long k = 0; k < n; k++) {
        int i = 0;
        while (bits[i] == 1) { bits[i] = 0; flips++; i++; }
        bits[i] = 1; flips++;
    }
    printf("n=%ld\\tflips=%ld\\tper increment=%.5f\\n",
           n, flips, (double) flips / n);
}

int main(void) {
    printf("Doubling array - per-append cost stays constant:\\n");
    measureAppends(1000); measureAppends(10000); measureAppends(100000);

    printf("\\nConstant growth - per-append cost does NOT:\\n");
    measureConstantGrowth(1000, 10); measureConstantGrowth(10000, 10);

    printf("\\nBinary counter - converges on 2 per increment:\\n");
    measureCounter(100); measureCounter(10000); measureCounter(1000000);
    return 0;
}`,

  cpp: `// Amortized analysis, measured rather than asserted.

#include <iostream>
#include <iomanip>
#include <vector>

// ---- A dynamic array that reports what each append really costs ----
class DynamicArray {
public:
    long totalCost = 0;

    long append(int value) {
        long cost = 1;                        // the write itself

        if (size_ == capacity_) {             // full: grow and copy
            std::vector<int> bigger(capacity_ * 2);
            for (long i = 0; i < size_; i++) bigger[i] = buffer_[i];

            cost += size_;                    // Theta(n) - but only sometimes
            buffer_ = std::move(bigger);
            capacity_ *= 2;
        }

        buffer_[size_++] = value;
        totalCost += cost;
        return cost;
    }

private:
    std::vector<int> buffer_ = std::vector<int>(1);
    long capacity_ = 1;
    long size_ = 0;
};

// Aggregate analysis says total < 3n, so the average is O(1).
void measureAppends(long n) {
    DynamicArray arr;
    for (long i = 0; i < n; i++) arr.append(static_cast<int>(i));

    std::cout << "n=" << n << "\\ttotal=" << arr.totalCost << "\\tper append="
              << std::fixed << std::setprecision(3)
              << static_cast<double>(arr.totalCost) / n << "\\n";
}

// ---- Growing by a CONSTANT instead: the guarantee disappears ----
void measureConstantGrowth(long n, long step = 10) {
    long capacity = step, size = 0, totalCost = 0;

    for (long i = 0; i < n; i++) {
        long cost = 1;
        if (size == capacity) {
            cost += size;                     // copy everything, again
            capacity += step;                 // only to fill up again soon
        }
        totalCost += cost;
        size++;
    }
    std::cout << "n=" << n << "\\ttotal=" << totalCost << "\\tper append="
              << std::setprecision(1)
              << static_cast<double>(totalCost) / n << " <- grows with n\\n";
}

// ---- Binary counter: a single increment can flip many bits ----
// Potential method: let Phi = number of 1 bits. An increment flipping k
// trailing 1s has actual cost k+1 and changes Phi by 1-k, so the
// amortized cost is (k+1) + (1-k) = 2.
void measureCounter(long n) {
    std::vector<int> bits(64, 0);
    long flips = 0;

    for (long k = 0; k < n; k++) {
        int i = 0;
        while (bits[i] == 1) { bits[i] = 0; flips++; i++; }
        bits[i] = 1; flips++;
    }
    std::cout << "n=" << n << "\\tflips=" << flips << "\\tper increment="
              << std::setprecision(5)
              << static_cast<double>(flips) / n << "\\n";
}

int main() {
    std::cout << "Doubling array - per-append cost stays constant:\\n";
    for (long n : {1000L, 10000L, 100000L}) measureAppends(n);

    std::cout << "\\nConstant growth - per-append cost does NOT:\\n";
    for (long n : {1000L, 10000L, 100000L}) measureConstantGrowth(n);

    std::cout << "\\nBinary counter - converges on 2 per increment:\\n";
    for (long n : {100L, 10000L, 1000000L}) measureCounter(n);
    return 0;
}`,
};

export default codeExamples;
