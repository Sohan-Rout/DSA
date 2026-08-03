const codeExamples = {
  javascript: `// Kahn's algorithm: repeatedly process a vertex with no remaining
// prerequisites (in-degree 0), then decrement its neighbors' in-degrees --
// which may free them up to be processed too.
function topologicalSort(vertices, adjList) {
  const inDegree = {};
  vertices.forEach((v) => (inDegree[v] = 0));
  vertices.forEach((v) => (adjList[v] || []).forEach((to) => (inDegree[to] += 1)));

  const queue = vertices.filter((v) => inDegree[v] === 0);
  const order = [];

  while (queue.length > 0) {
    const u = queue.shift();
    order.push(u);

    for (const v of adjList[u] || []) {
      inDegree[v] -= 1;
      if (inDegree[v] === 0) queue.push(v);
    }
  }

  if (order.length < vertices.length) {
    throw new Error("Graph contains a cycle -- no valid topological order exists");
  }
  return order;
}

// Usage example
const adjList = { A: ["B", "C"], B: ["D"], C: ["D"], D: ["E"], E: [] };
topologicalSort(["A", "B", "C", "D", "E"], adjList); // ["A", "B", "C", "D", "E"]`,

  python: `from collections import deque

# Kahn's algorithm: repeatedly process a vertex with no remaining
# prerequisites (in-degree 0), then decrement its neighbors' in-degrees --
# which may free them up to be processed too.
def topological_sort(vertices, adj_list):
    in_degree = {v: 0 for v in vertices}
    for v in vertices:
        for to in adj_list.get(v, []):
            in_degree[to] += 1

    queue = deque(v for v in vertices if in_degree[v] == 0)
    order = []

    while queue:
        u = queue.popleft()
        order.append(u)

        for v in adj_list.get(u, []):
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    if len(order) < len(vertices):
        raise ValueError("Graph contains a cycle -- no valid topological order exists")
    return order

# Usage example
adj_list = {"A": ["B", "C"], "B": ["D"], "C": ["D"], "D": ["E"], "E": []}
topological_sort(["A", "B", "C", "D", "E"], adj_list)  # ["A", "B", "C", "D", "E"]`,

  c: `#include <stdio.h>

#define MAX_V 26

char adjList[MAX_V][MAX_V];
int adjCount[MAX_V] = {0};
int inDegree[MAX_V] = {0};

// Kahn's algorithm: repeatedly process a vertex with no remaining
// prerequisites (in-degree 0), then decrement its neighbors' in-degrees --
// which may free them up to be processed too.
int topologicalSort(int n, char* order) {
    char queue[MAX_V];
    int front = 0, back = 0, count = 0;

    for (int i = 0; i < n; i++) {
        if (inDegree[i] == 0) queue[back++] = 'A' + i;
    }

    while (front < back) {
        char u = queue[front++];
        order[count++] = u;

        for (int i = 0; i < adjCount[u - 'A']; i++) {
            char v = adjList[u - 'A'][i];
            if (--inDegree[v - 'A'] == 0) queue[back++] = v;
        }
    }

    return count; // if count < n, the graph contains a cycle
}

int main() {
    // Example: A->B, A->C, B->D, C->D, D->E
    adjList[0][0]='B'; adjList[0][1]='C'; adjCount[0]=2; inDegree[1]++; inDegree[2]++;
    adjList[1][0]='D'; adjCount[1]=1; inDegree[3]++;
    adjList[2][0]='D'; adjCount[2]=1; inDegree[3]++;
    adjList[3][0]='E'; adjCount[3]=1; inDegree[4]++;

    char order[MAX_V];
    int count = topologicalSort(5, order);
    for (int i = 0; i < count; i++) printf("%c ", order[i]); // A B C D E (order may vary)
    return 0;
}`,

  java: `import java.util.*;

public class TopologicalSort {
    // Kahn's algorithm: repeatedly process a vertex with no remaining
    // prerequisites (in-degree 0), then decrement its neighbors' in-degrees --
    // which may free them up to be processed too.
    static List<Character> topologicalSort(List<Character> vertices, Map<Character, List<Character>> adjList) {
        Map<Character, Integer> inDegree = new HashMap<>();
        for (char v : vertices) inDegree.put(v, 0);
        for (char v : vertices) {
            for (char to : adjList.getOrDefault(v, List.of())) {
                inDegree.merge(to, 1, Integer::sum);
            }
        }

        Queue<Character> queue = new LinkedList<>();
        for (char v : vertices) if (inDegree.get(v) == 0) queue.add(v);

        List<Character> order = new ArrayList<>();
        while (!queue.isEmpty()) {
            char u = queue.poll();
            order.add(u);

            for (char v : adjList.getOrDefault(u, List.of())) {
                inDegree.put(v, inDegree.get(v) - 1);
                if (inDegree.get(v) == 0) queue.add(v);
            }
        }

        if (order.size() < vertices.size()) {
            throw new IllegalStateException("Graph contains a cycle -- no valid topological order exists");
        }
        return order;
    }

    public static void main(String[] args) {
        Map<Character, List<Character>> adjList = new HashMap<>();
        adjList.put('A', List.of('B', 'C'));
        adjList.put('B', List.of('D'));
        adjList.put('C', List.of('D'));
        adjList.put('D', List.of('E'));

        System.out.println(topologicalSort(List.of('A', 'B', 'C', 'D', 'E'), adjList));
    }
}`,
};

export default codeExamples;
