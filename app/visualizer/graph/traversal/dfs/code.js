const codeExamples = {
  javascript: `// Recursive DFS: the call stack itself plays the role of the stack —
// each recursive call goes one level deeper before returning to try
// the next neighbor.
function dfs(adjList, start, visited = new Set(), order = []) {
  visited.add(start);
  order.push(start);

  for (const neighbor of adjList[start] || []) {
    if (!visited.has(neighbor)) {
      dfs(adjList, neighbor, visited, order);
    }
  }

  return order;
}

// Iterative version with an explicit stack. A vertex may be pushed more
// than once; the visited check happens when it's popped, not when it's
// pushed, so a duplicate pop is simply skipped.
function dfsIterative(adjList, start) {
  const visited = new Set();
  const stack = [start];
  const order = [];

  while (stack.length > 0) {
    const current = stack.pop();
    if (visited.has(current)) continue;

    visited.add(current);
    order.push(current);

    for (const neighbor of [...(adjList[current] || [])].reverse()) {
      if (!visited.has(neighbor)) stack.push(neighbor);
    }
  }

  return order;
}

// Usage example
const adjList = { A: ["B", "C"], B: ["A", "D"], C: ["A"], D: ["B"] };
dfs(adjList, "A"); // ["A", "B", "D", "C"]`,

  python: `# Recursive DFS: the call stack itself plays the role of the stack --
# each recursive call goes one level deeper before returning to try
# the next neighbor.
def dfs(adj_list, start, visited=None, order=None):
    if visited is None:
        visited = set()
        order = []

    visited.add(start)
    order.append(start)

    for neighbor in adj_list.get(start, []):
        if neighbor not in visited:
            dfs(adj_list, neighbor, visited, order)

    return order

# Iterative version with an explicit stack. A vertex may be pushed more
# than once; the visited check happens when it's popped, not when it's
# pushed, so a duplicate pop is simply skipped.
def dfs_iterative(adj_list, start):
    visited = set()
    stack = [start]
    order = []

    while stack:
        current = stack.pop()
        if current in visited:
            continue

        visited.add(current)
        order.append(current)

        for neighbor in reversed(adj_list.get(current, [])):
            if neighbor not in visited:
                stack.append(neighbor)

    return order

# Usage example
adj_list = {"A": ["B", "C"], "B": ["A", "D"], "C": ["A"], "D": ["B"]}
dfs(adj_list, "A")  # ["A", "B", "D", "C"]`,

  c: `#include <stdio.h>

#define MAX_V 26

char adjList[MAX_V][MAX_V];
int adjCount[MAX_V] = {0};
int visited[MAX_V] = {0};

// Recursive DFS: the call stack itself plays the role of the stack --
// each recursive call goes one level deeper before returning to try
// the next neighbor.
void dfs(char current) {
    visited[current - 'A'] = 1;
    printf("%c ", current);

    for (int i = 0; i < adjCount[current - 'A']; i++) {
        char neighbor = adjList[current - 'A'][i];
        if (!visited[neighbor - 'A']) {
            dfs(neighbor);
        }
    }
}

int main() {
    // Example: A-B, A-C, B-D (undirected)
    adjList[0][0] = 'B'; adjList[0][1] = 'C'; adjCount[0] = 2; // A
    adjList[1][0] = 'A'; adjList[1][1] = 'D'; adjCount[1] = 2; // B
    adjList[2][0] = 'A'; adjCount[2] = 1;                       // C
    adjList[3][0] = 'B'; adjCount[3] = 1;                       // D

    dfs('A'); // A B D C
    return 0;
}`,

  java: `import java.util.*;

public class DFS {
    // Recursive DFS: the call stack itself plays the role of the stack --
    // each recursive call goes one level deeper before returning to try
    // the next neighbor.
    static void dfs(Map<Character, List<Character>> adjList, char current, Set<Character> visited, List<Character> order) {
        visited.add(current);
        order.add(current);

        for (char neighbor : adjList.getOrDefault(current, List.of())) {
            if (!visited.contains(neighbor)) {
                dfs(adjList, neighbor, visited, order);
            }
        }
    }

    public static void main(String[] args) {
        Map<Character, List<Character>> adjList = new HashMap<>();
        adjList.put('A', List.of('B', 'C'));
        adjList.put('B', List.of('A', 'D'));
        adjList.put('C', List.of('A'));
        adjList.put('D', List.of('B'));

        List<Character> order = new ArrayList<>();
        dfs(adjList, 'A', new HashSet<>(), order);
        System.out.println(order); // [A, B, D, C]
    }
}`,
};

export default codeExamples;
