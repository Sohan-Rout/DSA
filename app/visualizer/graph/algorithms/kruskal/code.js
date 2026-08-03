const codeExamples = {
  javascript: `// Union-Find (disjoint set): tracks which component each vertex belongs to.
function find(parent, v) {
  while (parent[v] !== v) v = parent[v];
  return v;
}

function union(parent, a, b) {
  parent[find(parent, a)] = find(parent, b);
}

// Process edges cheapest-first; only accept an edge if its endpoints are
// in different components -- accepting it otherwise would create a cycle.
function kruskal(vertices, edges) {
  const parent = {};
  vertices.forEach((v) => (parent[v] = v));

  const sorted = [...edges].sort((a, b) => a.weight - b.weight);
  const mst = [];
  let totalWeight = 0;

  for (const edge of sorted) {
    const rootA = find(parent, edge.from);
    const rootB = find(parent, edge.to);
    if (rootA !== rootB) {
      union(parent, rootA, rootB);
      mst.push(edge);
      totalWeight += edge.weight;
    }
  }

  return { mst, totalWeight };
}

// Usage example
const vertices = ["A", "B", "C", "D"];
const edges = [
  { from: "A", to: "B", weight: 4 },
  { from: "A", to: "C", weight: 1 },
  { from: "C", to: "B", weight: 2 },
  { from: "B", to: "D", weight: 5 },
  { from: "C", to: "D", weight: 8 },
];
kruskal(vertices, edges); // mst: A-C, C-B, B-D — totalWeight: 8`,

  python: `# Union-Find (disjoint set): tracks which component each vertex belongs to.
def find(parent, v):
    while parent[v] != v:
        v = parent[v]
    return v

def union(parent, a, b):
    parent[find(parent, a)] = find(parent, b)

# Process edges cheapest-first; only accept an edge if its endpoints are
# in different components -- accepting it otherwise would create a cycle.
def kruskal(vertices, edges):
    parent = {v: v for v in vertices}
    sorted_edges = sorted(edges, key=lambda e: e["weight"])
    mst = []
    total_weight = 0

    for edge in sorted_edges:
        root_a = find(parent, edge["from"])
        root_b = find(parent, edge["to"])
        if root_a != root_b:
            union(parent, root_a, root_b)
            mst.append(edge)
            total_weight += edge["weight"]

    return mst, total_weight

# Usage example
vertices = ["A", "B", "C", "D"]
edges = [
    {"from": "A", "to": "B", "weight": 4},
    {"from": "A", "to": "C", "weight": 1},
    {"from": "C", "to": "B", "weight": 2},
    {"from": "B", "to": "D", "weight": 5},
    {"from": "C", "to": "D", "weight": 8},
]
kruskal(vertices, edges)  # mst: A-C, C-B, B-D -- total_weight: 8`,

  c: `#include <stdio.h>
#include <stdlib.h>

typedef struct { int from, to, weight; } Edge;

int parent[26];

// Union-Find (disjoint set): tracks which component each vertex belongs to.
int find(int v) {
    while (parent[v] != v) v = parent[v];
    return v;
}

void unite(int a, int b) {
    parent[find(a)] = find(b);
}

int compareEdges(const void* a, const void* b) {
    return ((Edge*)a)->weight - ((Edge*)b)->weight;
}

// Process edges cheapest-first; only accept an edge if its endpoints are
// in different components -- accepting it otherwise would create a cycle.
int kruskal(Edge edges[], int edgeCount, int vertexCount) {
    for (int i = 0; i < vertexCount; i++) parent[i] = i;
    qsort(edges, edgeCount, sizeof(Edge), compareEdges);

    int totalWeight = 0;
    for (int i = 0; i < edgeCount; i++) {
        int rootA = find(edges[i].from);
        int rootB = find(edges[i].to);
        if (rootA != rootB) {
            unite(rootA, rootB);
            totalWeight += edges[i].weight;
            printf("Accepted: %d-%d (%d)\\n", edges[i].from, edges[i].to, edges[i].weight);
        }
    }
    return totalWeight;
}

int main() {
    Edge edges[] = { {0,1,4}, {0,2,1}, {2,1,2}, {1,3,5}, {2,3,8} }; // A=0,B=1,C=2,D=3
    printf("Total weight: %d\\n", kruskal(edges, 5, 4));
    return 0;
}`,

  java: `import java.util.*;

public class Kruskal {
    static class Edge {
        char from, to;
        int weight;
        Edge(char from, char to, int weight) { this.from = from; this.to = to; this.weight = weight; }
    }

    static Map<Character, Character> parent = new HashMap<>();

    // Union-Find (disjoint set): tracks which component each vertex belongs to.
    static char find(char v) {
        while (parent.get(v) != v) v = parent.get(v);
        return v;
    }

    static void union(char a, char b) {
        parent.put(find(a), find(b));
    }

    // Process edges cheapest-first; only accept an edge if its endpoints are
    // in different components -- accepting it otherwise would create a cycle.
    static List<Edge> kruskal(List<Character> vertices, List<Edge> edges) {
        for (char v : vertices) parent.put(v, v);
        edges.sort(Comparator.comparingInt(e -> e.weight));

        List<Edge> mst = new ArrayList<>();
        for (Edge edge : edges) {
            char rootA = find(edge.from);
            char rootB = find(edge.to);
            if (rootA != rootB) {
                union(rootA, rootB);
                mst.add(edge);
            }
        }
        return mst;
    }

    public static void main(String[] args) {
        List<Character> vertices = List.of('A', 'B', 'C', 'D');
        List<Edge> edges = new ArrayList<>(List.of(
            new Edge('A', 'B', 4), new Edge('A', 'C', 1), new Edge('C', 'B', 2),
            new Edge('B', 'D', 5), new Edge('C', 'D', 8)
        ));

        for (Edge e : kruskal(vertices, edges)) {
            System.out.println(e.from + "-" + e.to + " (" + e.weight + ")");
        }
    }
}`,
};

export default codeExamples;
