const codeExamples = {
  javascript: `// A queue (FIFO) is what makes this "breadth-first": every same-distance
// vertex is dequeued before any farther vertex is even discovered.
function bfs(adjList, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];

  while (queue.length > 0) {
    const current = queue.shift();
    order.push(current);

    for (const neighbor of adjList[current] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor); // mark visited when enqueued, not when dequeued
        queue.push(neighbor);
      }
    }
  }

  return order;
}

// Usage example
const adjList = { A: ["B", "C"], B: ["A", "D"], C: ["A"], D: ["B"] };
bfs(adjList, "A"); // ["A", "B", "C", "D"]`,

  python: `from collections import deque

# A queue (FIFO) is what makes this "breadth-first": every same-distance
# vertex is dequeued before any farther vertex is even discovered.
def bfs(adj_list, start):
    visited = {start}
    queue = deque([start])
    order = []

    while queue:
        current = queue.popleft()
        order.append(current)

        for neighbor in adj_list.get(current, []):
            if neighbor not in visited:
                visited.add(neighbor)  # mark visited when enqueued, not when dequeued
                queue.append(neighbor)

    return order

# Usage example
adj_list = {"A": ["B", "C"], "B": ["A", "D"], "C": ["A"], "D": ["B"]}
bfs(adj_list, "A")  # ["A", "B", "C", "D"]`,

  c: `#include <stdio.h>

#define MAX_V 26

char adjList[MAX_V][MAX_V];
int adjCount[MAX_V] = {0};
int visited[MAX_V] = {0};

// A queue (FIFO) is what makes this "breadth-first": every same-distance
// vertex is dequeued before any farther vertex is even discovered.
void bfs(char start) {
    char queue[MAX_V];
    int front = 0, back = 0;

    queue[back++] = start;
    visited[start - 'A'] = 1;

    while (front < back) {
        char current = queue[front++];
        printf("%c ", current);

        for (int i = 0; i < adjCount[current - 'A']; i++) {
            char neighbor = adjList[current - 'A'][i];
            if (!visited[neighbor - 'A']) {
                visited[neighbor - 'A'] = 1; // mark visited when enqueued
                queue[back++] = neighbor;
            }
        }
    }
}

int main() {
    // Example: A-B, A-C, B-D (undirected)
    adjList[0][0] = 'B'; adjList[0][1] = 'C'; adjCount[0] = 2; // A
    adjList[1][0] = 'A'; adjList[1][1] = 'D'; adjCount[1] = 2; // B
    adjList[2][0] = 'A'; adjCount[2] = 1;                       // C
    adjList[3][0] = 'B'; adjCount[3] = 1;                       // D

    bfs('A'); // A B C D
    return 0;
}`,

  java: `import java.util.*;

public class BFS {
    // A queue (FIFO) is what makes this "breadth-first": every same-distance
    // vertex is dequeued before any farther vertex is even discovered.
    static List<Character> bfs(Map<Character, List<Character>> adjList, char start) {
        Set<Character> visited = new HashSet<>();
        Queue<Character> queue = new LinkedList<>();
        List<Character> order = new ArrayList<>();

        visited.add(start);
        queue.add(start);

        while (!queue.isEmpty()) {
            char current = queue.poll();
            order.add(current);

            for (char neighbor : adjList.getOrDefault(current, List.of())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor); // mark visited when enqueued, not when dequeued
                    queue.add(neighbor);
                }
            }
        }
        return order;
    }

    public static void main(String[] args) {
        Map<Character, List<Character>> adjList = new HashMap<>();
        adjList.put('A', List.of('B', 'C'));
        adjList.put('B', List.of('A', 'D'));
        adjList.put('C', List.of('A'));
        adjList.put('D', List.of('B'));

        System.out.println(bfs(adjList, 'A')); // [A, B, C, D]
    }
}`,
};

export default codeExamples;
