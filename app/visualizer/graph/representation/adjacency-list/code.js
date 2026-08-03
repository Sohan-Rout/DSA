const codeExamples = {
  javascript: `class GraphList {
  constructor() {
    this.list = new Map(); // vertex -> [{ to, weight }, ...]
  }

  addVertex(v) {
    if (!this.list.has(v)) this.list.set(v, []);
  }

  addEdge(from, to, weight = 1, directed = false) {
    this.list.get(from).push({ to, weight });
    if (!directed) this.list.get(to).push({ to: from, weight }); // mirror the edge both ways
  }

  hasEdge(from, to) {
    return this.list.get(from).some((entry) => entry.to === to); // O(degree(from))
  }

  neighbors(v) {
    return this.list.get(v).map((entry) => entry.to); // exactly the relevant entries
  }
}

// Usage example
const g = new GraphList();
["A", "B", "C", "D"].forEach((v) => g.addVertex(v));
g.addEdge("A", "B");
g.addEdge("A", "C");
g.hasEdge("A", "B"); // true
g.neighbors("A");    // ["B", "C"]`,

  python: `class GraphList:
    def __init__(self):
        self.list = {}  # vertex -> [(to, weight), ...]

    def add_vertex(self, v):
        self.list.setdefault(v, [])

    def add_edge(self, frm, to, weight=1, directed=False):
        self.list[frm].append((to, weight))
        if not directed:
            self.list[to].append((frm, weight))  # mirror the edge both ways

    def has_edge(self, frm, to):
        return any(t == to for t, _ in self.list[frm])  # O(degree(frm))

    def neighbors(self, v):
        return [t for t, _ in self.list[v]]  # exactly the relevant entries

# Usage example
g = GraphList()
for v in ["A", "B", "C", "D"]:
    g.add_vertex(v)
g.add_edge("A", "B")
g.add_edge("A", "C")
g.has_edge("A", "B")  # True
g.neighbors("A")      # ["B", "C"]`,

  c: `#include <stdio.h>
#include <stdlib.h>

typedef struct EdgeNode {
    char to;
    int weight;
    struct EdgeNode* next;
} EdgeNode;

#define MAX_V 26
EdgeNode* list[MAX_V] = { NULL };

void addEdge(char from, char to, int weight, int directed) {
    EdgeNode* node = malloc(sizeof(EdgeNode));
    node->to = to;
    node->weight = weight;
    node->next = list[from - 'A'];
    list[from - 'A'] = node; // prepend to from's list

    if (!directed) {
        EdgeNode* back = malloc(sizeof(EdgeNode));
        back->to = from;
        back->weight = weight;
        back->next = list[to - 'A'];
        list[to - 'A'] = back; // mirror the edge both ways
    }
}

int hasEdge(char from, char to) {
    for (EdgeNode* n = list[from - 'A']; n != NULL; n = n->next) { // O(degree(from))
        if (n->to == to) return 1;
    }
    return 0;
}

int main() {
    addEdge('A', 'B', 1, 0);
    addEdge('A', 'C', 1, 0);
    printf("A-B edge: %d\\n", hasEdge('A', 'B'));
    return 0;
}`,

  java: `import java.util.*;

public class GraphList {
    Map<Character, List<int[]>> list = new HashMap<>(); // vertex -> [(toAsChar, weight), ...]
    // Using a simple pair representation: [to, weight] where 'to' is stored as its char code.

    void addVertex(char v) {
        list.putIfAbsent(v, new ArrayList<>());
    }

    void addEdge(char from, char to, int weight, boolean directed) {
        list.get(from).add(new int[]{ to, weight });
        if (!directed) list.get(to).add(new int[]{ from, weight }); // mirror the edge both ways
    }

    boolean hasEdge(char from, char to) {
        for (int[] entry : list.get(from)) { // O(degree(from))
            if (entry[0] == to) return true;
        }
        return false;
    }

    List<Character> neighbors(char v) {
        List<Character> result = new ArrayList<>();
        for (int[] entry : list.get(v)) result.add((char) entry[0]);
        return result;
    }

    public static void main(String[] args) {
        GraphList g = new GraphList();
        for (char v : new char[]{'A', 'B', 'C', 'D'}) g.addVertex(v);
        g.addEdge('A', 'B', 1, false);
        g.addEdge('A', 'C', 1, false);
        System.out.println("A-B edge: " + g.hasEdge('A', 'B'));
        System.out.println("A's neighbors: " + g.neighbors('A'));
    }
}`,
};

export default codeExamples;
