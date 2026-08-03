const codeExamples = {
  javascript: `// "key" is the weight of the cheapest edge discovered so far connecting a
// vertex directly to the tree -- not a cumulative distance like Dijkstra's.
function prim(vertices, adjList, start) {
  const key = {};
  const parent = {};
  const inTree = new Set();
  vertices.forEach((v) => (key[v] = Infinity));
  key[start] = 0;

  while (inTree.size < vertices.length) {
    // Pick the outside vertex with the smallest key
    let u = null;
    let best = Infinity;
    for (const v of vertices) {
      if (!inTree.has(v) && key[v] < best) {
        best = key[v];
        u = v;
      }
    }
    if (u === null) break; // remaining vertices are unreachable

    inTree.add(u);

    for (const { to, weight } of adjList[u] || []) {
      if (!inTree.has(to) && weight < key[to]) {
        key[to] = weight; // a cheaper direct connection was just found
        parent[to] = u;
      }
    }
  }

  const mstEdges = [];
  vertices.forEach((v) => {
    if (parent[v] !== undefined) mstEdges.push({ from: parent[v], to: v, weight: key[v] });
  });
  return mstEdges;
}

// Usage example
const adjList = {
  A: [{ to: "B", weight: 4 }, { to: "C", weight: 1 }],
  B: [{ to: "A", weight: 4 }, { to: "C", weight: 2 }, { to: "D", weight: 5 }],
  C: [{ to: "A", weight: 1 }, { to: "B", weight: 2 }, { to: "D", weight: 8 }],
  D: [{ to: "B", weight: 5 }, { to: "C", weight: 8 }],
};
prim(["A", "B", "C", "D"], adjList, "A"); // A-C, C-B, B-D`,

  python: `import math

# "key" is the weight of the cheapest edge discovered so far connecting a
# vertex directly to the tree -- not a cumulative distance like Dijkstra's.
def prim(vertices, adj_list, start):
    key = {v: math.inf for v in vertices}
    parent = {}
    in_tree = set()
    key[start] = 0

    while len(in_tree) < len(vertices):
        # Pick the outside vertex with the smallest key
        u, best = None, math.inf
        for v in vertices:
            if v not in in_tree and key[v] < best:
                best, u = key[v], v
        if u is None:
            break  # remaining vertices are unreachable

        in_tree.add(u)

        for to, weight in adj_list.get(u, []):
            if to not in in_tree and weight < key[to]:
                key[to] = weight  # a cheaper direct connection was just found
                parent[to] = u

    mst_edges = []
    for v in vertices:
        if v in parent:
            mst_edges.append((parent[v], v, key[v]))
    return mst_edges

# Usage example
adj_list = {
    "A": [("B", 4), ("C", 1)],
    "B": [("A", 4), ("C", 2), ("D", 5)],
    "C": [("A", 1), ("B", 2), ("D", 8)],
    "D": [("B", 5), ("C", 8)],
}
prim(["A", "B", "C", "D"], adj_list, "A")  # A-C, C-B, B-D`,

  c: `#include <stdio.h>
#include <limits.h>
#include <stdbool.h>

#define MAX_V 26
#define INF INT_MAX

int graph[MAX_V][MAX_V]; // graph[i][j] = weight, or 0 for no edge
int key_[MAX_V];
int parent_[MAX_V];
bool inTree[MAX_V];

// "key" is the weight of the cheapest edge discovered so far connecting a
// vertex directly to the tree -- not a cumulative distance like Dijkstra's.
void prim(int n, int start) {
    for (int i = 0; i < n; i++) { key_[i] = INF; inTree[i] = false; }
    key_[start] = 0;
    parent_[start] = -1;

    for (int count = 0; count < n; count++) {
        int u = -1, best = INF;
        for (int v = 0; v < n; v++) {
            if (!inTree[v] && key_[v] < best) { best = key_[v]; u = v; }
        }
        if (u == -1) break; // remaining vertices are unreachable

        inTree[u] = true;

        for (int v = 0; v < n; v++) {
            if (graph[u][v] != 0 && !inTree[v] && graph[u][v] < key_[v]) {
                key_[v] = graph[u][v]; // a cheaper direct connection was just found
                parent_[v] = u;
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

    prim(n, 0);
    for (int v = 1; v < n; v++) printf("%d-%d (%d)\\n", parent_[v], v, key_[v]);
    return 0;
}`,

  java: `import java.util.*;

public class Prim {
    static class Edge {
        char to;
        int weight;
        Edge(char to, int weight) { this.to = to; this.weight = weight; }
    }

    // "key" is the weight of the cheapest edge discovered so far connecting a
    // vertex directly to the tree -- not a cumulative distance like Dijkstra's.
    static List<int[]> prim(List<Character> vertices, Map<Character, List<Edge>> adjList, char start) {
        Map<Character, Integer> key = new HashMap<>();
        Map<Character, Character> parent = new HashMap<>();
        Set<Character> inTree = new HashSet<>();
        for (char v : vertices) key.put(v, Integer.MAX_VALUE);
        key.put(start, 0);

        while (inTree.size() < vertices.size()) {
            char u = 0;
            int best = Integer.MAX_VALUE;
            boolean found = false;
            for (char v : vertices) {
                if (!inTree.contains(v) && key.get(v) < best) {
                    best = key.get(v);
                    u = v;
                    found = true;
                }
            }
            if (!found) break; // remaining vertices are unreachable

            inTree.add(u);

            for (Edge edge : adjList.getOrDefault(u, List.of())) {
                if (!inTree.contains(edge.to) && edge.weight < key.get(edge.to)) {
                    key.put(edge.to, edge.weight); // a cheaper direct connection was just found
                    parent.put(edge.to, u);
                }
            }
        }

        List<int[]> mstEdges = new ArrayList<>();
        for (char v : vertices) {
            if (parent.containsKey(v)) {
                mstEdges.add(new int[]{ parent.get(v), v, key.get(v) });
            }
        }
        return mstEdges;
    }

    public static void main(String[] args) {
        Map<Character, List<Edge>> adjList = new HashMap<>();
        adjList.put('A', List.of(new Edge('B', 4), new Edge('C', 1)));
        adjList.put('B', List.of(new Edge('A', 4), new Edge('C', 2), new Edge('D', 5)));
        adjList.put('C', List.of(new Edge('A', 1), new Edge('B', 2), new Edge('D', 8)));
        adjList.put('D', List.of(new Edge('B', 5), new Edge('C', 8)));

        System.out.println(prim(List.of('A', 'B', 'C', 'D'), adjList, 'A').size() + " edges in MST");
    }
}`,
};

export default codeExamples;
