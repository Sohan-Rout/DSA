const codeExamples = {
  javascript: `class GraphMatrix {
  constructor(vertices) {
    this.vertices = vertices; // e.g. ["A", "B", "C"]
    this.index = Object.fromEntries(vertices.map((v, i) => [v, i]));
    this.matrix = Array.from({ length: vertices.length }, () => Array(vertices.length).fill(0));
  }

  addEdge(from, to, weight = 1, directed = false) {
    const i = this.index[from];
    const j = this.index[to];
    this.matrix[i][j] = weight;
    if (!directed) this.matrix[j][i] = weight; // mirror the edge both ways
  }

  hasEdge(from, to) {
    return this.matrix[this.index[from]][this.index[to]] !== 0; // O(1) lookup
  }

  neighbors(vertex) {
    const i = this.index[vertex];
    return this.vertices.filter((_, j) => this.matrix[i][j] !== 0); // O(V) scan
  }
}

// Usage example
const g = new GraphMatrix(["A", "B", "C", "D"]);
g.addEdge("A", "B");
g.addEdge("A", "C");
g.hasEdge("A", "B"); // true
g.neighbors("A");    // ["B", "C"]`,

  python: `class GraphMatrix:
    def __init__(self, vertices):
        self.vertices = vertices  # e.g. ["A", "B", "C"]
        self.index = {v: i for i, v in enumerate(vertices)}
        n = len(vertices)
        self.matrix = [[0] * n for _ in range(n)]

    def add_edge(self, frm, to, weight=1, directed=False):
        i, j = self.index[frm], self.index[to]
        self.matrix[i][j] = weight
        if not directed:
            self.matrix[j][i] = weight  # mirror the edge both ways

    def has_edge(self, frm, to):
        return self.matrix[self.index[frm]][self.index[to]] != 0  # O(1) lookup

    def neighbors(self, vertex):
        i = self.index[vertex]
        return [v for j, v in enumerate(self.vertices) if self.matrix[i][j] != 0]  # O(V) scan

# Usage example
g = GraphMatrix(["A", "B", "C", "D"])
g.add_edge("A", "B")
g.add_edge("A", "C")
g.has_edge("A", "B")  # True
g.neighbors("A")      # ["B", "C"]`,

  c: `#include <stdio.h>
#include <string.h>

#define MAX_V 10

int matrix[MAX_V][MAX_V];
char vertices[MAX_V];
int vertexCount = 0;

int indexOf(char v) {
    for (int i = 0; i < vertexCount; i++) if (vertices[i] == v) return i;
    return -1;
}

void addVertex(char v) {
    vertices[vertexCount++] = v;
}

void addEdge(char from, char to, int weight, int directed) {
    int i = indexOf(from), j = indexOf(to);
    matrix[i][j] = weight;
    if (!directed) matrix[j][i] = weight; // mirror the edge both ways
}

int hasEdge(char from, char to) {
    return matrix[indexOf(from)][indexOf(to)] != 0; // O(1) lookup
}

int main() {
    addVertex('A'); addVertex('B'); addVertex('C');
    addEdge('A', 'B', 1, 0);
    addEdge('A', 'C', 1, 0);
    printf("A-B edge: %d\\n", hasEdge('A', 'B'));
    return 0;
}`,

  java: `import java.util.*;

public class GraphMatrix {
    List<Character> vertices = new ArrayList<>();
    Map<Character, Integer> index = new HashMap<>();
    int[][] matrix;

    GraphMatrix(char[] vertexList) {
        for (char v : vertexList) {
            index.put(v, vertices.size());
            vertices.add(v);
        }
        matrix = new int[vertices.size()][vertices.size()];
    }

    void addEdge(char from, char to, int weight, boolean directed) {
        int i = index.get(from), j = index.get(to);
        matrix[i][j] = weight;
        if (!directed) matrix[j][i] = weight; // mirror the edge both ways
    }

    boolean hasEdge(char from, char to) {
        return matrix[index.get(from)][index.get(to)] != 0; // O(1) lookup
    }

    List<Character> neighbors(char vertex) {
        List<Character> result = new ArrayList<>();
        int i = index.get(vertex);
        for (int j = 0; j < vertices.size(); j++) { // O(V) scan
            if (matrix[i][j] != 0) result.add(vertices.get(j));
        }
        return result;
    }

    public static void main(String[] args) {
        GraphMatrix g = new GraphMatrix(new char[]{'A', 'B', 'C', 'D'});
        g.addEdge('A', 'B', 1, false);
        g.addEdge('A', 'C', 1, false);
        System.out.println("A-B edge: " + g.hasEdge('A', 'B'));
        System.out.println("A's neighbors: " + g.neighbors('A'));
    }
}`,
};

export default codeExamples;
