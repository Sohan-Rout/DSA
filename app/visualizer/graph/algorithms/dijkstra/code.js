const codeExamples = {
  javascript: `// Greedy relaxation: since all weights are non-negative, always finalizing
// the closest unvisited vertex guarantees its distance can never improve.
function dijkstra(vertices, adjList, start) {
  const dist = {};
  const prev = {};
  const visited = new Set();
  vertices.forEach((v) => (dist[v] = Infinity));
  dist[start] = 0;

  while (visited.size < vertices.length) {
    // Pick the unvisited vertex with the smallest tentative distance
    let u = null;
    let best = Infinity;
    for (const v of vertices) {
      if (!visited.has(v) && dist[v] < best) {
        best = dist[v];
        u = v;
      }
    }
    if (u === null) break; // remaining vertices are unreachable

    visited.add(u);

    for (const { to, weight } of adjList[u] || []) {
      if (visited.has(to)) continue;
      const candidate = dist[u] + weight;
      if (candidate < dist[to]) {
        dist[to] = candidate; // relax the edge
        prev[to] = u;
      }
    }
  }

  return { dist, prev };
}

function reconstructPath(prev, start, target) {
  const path = [];
  let current = target;
  while (current !== undefined && current !== start) {
    path.unshift(current);
    current = prev[current];
  }
  if (current !== start) return null; // unreachable
  path.unshift(start);
  return path;
}

// Usage example
const adjList = {
  A: [{ to: "B", weight: 4 }, { to: "C", weight: 1 }],
  B: [{ to: "A", weight: 4 }, { to: "C", weight: 2 }, { to: "D", weight: 5 }],
  C: [{ to: "A", weight: 1 }, { to: "B", weight: 2 }, { to: "D", weight: 8 }],
  D: [{ to: "B", weight: 5 }, { to: "C", weight: 8 }],
};
const { dist, prev } = dijkstra(["A", "B", "C", "D"], adjList, "A");
reconstructPath(prev, "A", "D"); // ["A", "C", "B", "D"]`,

  python: `import math

# Greedy relaxation: since all weights are non-negative, always finalizing
# the closest unvisited vertex guarantees its distance can never improve.
def dijkstra(vertices, adj_list, start):
    dist = {v: math.inf for v in vertices}
    prev = {}
    visited = set()
    dist[start] = 0

    while len(visited) < len(vertices):
        # Pick the unvisited vertex with the smallest tentative distance
        u, best = None, math.inf
        for v in vertices:
            if v not in visited and dist[v] < best:
                best, u = dist[v], v
        if u is None:
            break  # remaining vertices are unreachable

        visited.add(u)

        for to, weight in adj_list.get(u, []):
            if to in visited:
                continue
            candidate = dist[u] + weight
            if candidate < dist[to]:
                dist[to] = candidate  # relax the edge
                prev[to] = u

    return dist, prev

def reconstruct_path(prev, start, target):
    path = []
    current = target
    while current is not None and current != start:
        path.insert(0, current)
        current = prev.get(current)
    if current != start:
        return None  # unreachable
    path.insert(0, start)
    return path

# Usage example
adj_list = {
    "A": [("B", 4), ("C", 1)],
    "B": [("A", 4), ("C", 2), ("D", 5)],
    "C": [("A", 1), ("B", 2), ("D", 8)],
    "D": [("B", 5), ("C", 8)],
}
dist, prev = dijkstra(["A", "B", "C", "D"], adj_list, "A")
reconstruct_path(prev, "A", "D")  # ["A", "C", "B", "D"]`,

  c: `#include <stdio.h>
#include <limits.h>
#include <stdbool.h>

#define MAX_V 26
#define INF INT_MAX

int graph[MAX_V][MAX_V]; // graph[i][j] = weight, or 0 for no edge
int dist[MAX_V];
bool visited[MAX_V];

// Greedy relaxation: since all weights are non-negative, always finalizing
// the closest unvisited vertex guarantees its distance can never improve.
void dijkstra(int n, int start) {
    for (int i = 0; i < n; i++) { dist[i] = INF; visited[i] = false; }
    dist[start] = 0;

    for (int count = 0; count < n; count++) {
        int u = -1, best = INF;
        for (int v = 0; v < n; v++) {
            if (!visited[v] && dist[v] < best) { best = dist[v]; u = v; }
        }
        if (u == -1) break; // remaining vertices are unreachable

        visited[u] = true;

        for (int v = 0; v < n; v++) {
            if (graph[u][v] != 0 && !visited[v] && dist[u] != INF) {
                int candidate = dist[u] + graph[u][v];
                if (candidate < dist[v]) dist[v] = candidate; // relax the edge
            }
        }
    }
}

int main() {
    int n = 4; // A=0, B=1, C=2, D=3
    graph[0][1] = graph[1][0] = 4;
    graph[0][2] = graph[2][0] = 1;
    graph[1][2] = graph[2][1] = 2;
    graph[1][3] = graph[3][1] = 5;
    graph[2][3] = graph[3][2] = 8;

    dijkstra(n, 0);
    for (int i = 0; i < n; i++) printf("dist[%d] = %d\\n", i, dist[i]);
    return 0;
}`,

  java: `import java.util.*;

public class Dijkstra {
    static class Edge {
        char to;
        int weight;
        Edge(char to, int weight) { this.to = to; this.weight = weight; }
    }

    // Greedy relaxation: since all weights are non-negative, always finalizing
    // the closest unvisited vertex guarantees its distance can never improve.
    static Map<Character, Integer> dijkstra(List<Character> vertices, Map<Character, List<Edge>> adjList, char start) {
        Map<Character, Integer> dist = new HashMap<>();
        Set<Character> visited = new HashSet<>();
        for (char v : vertices) dist.put(v, Integer.MAX_VALUE);
        dist.put(start, 0);

        while (visited.size() < vertices.size()) {
            char u = 0;
            int best = Integer.MAX_VALUE;
            boolean found = false;
            for (char v : vertices) {
                if (!visited.contains(v) && dist.get(v) < best) {
                    best = dist.get(v);
                    u = v;
                    found = true;
                }
            }
            if (!found) break; // remaining vertices are unreachable

            visited.add(u);

            for (Edge edge : adjList.getOrDefault(u, List.of())) {
                if (visited.contains(edge.to)) continue;
                int candidate = dist.get(u) + edge.weight;
                if (candidate < dist.get(edge.to)) {
                    dist.put(edge.to, candidate); // relax the edge
                }
            }
        }
        return dist;
    }

    public static void main(String[] args) {
        Map<Character, List<Edge>> adjList = new HashMap<>();
        adjList.put('A', List.of(new Edge('B', 4), new Edge('C', 1)));
        adjList.put('B', List.of(new Edge('A', 4), new Edge('C', 2), new Edge('D', 5)));
        adjList.put('C', List.of(new Edge('A', 1), new Edge('B', 2), new Edge('D', 8)));
        adjList.put('D', List.of(new Edge('B', 5), new Edge('C', 8)));

        System.out.println(dijkstra(List.of('A', 'B', 'C', 'D'), adjList, 'A'));
    }
}`,
};

export default codeExamples;
