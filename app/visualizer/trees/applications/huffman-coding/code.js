const codeExamples = {
  javascript: `class HuffmanNode {
  constructor(char, freq, left = null, right = null) {
    this.char = char;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

// Repeatedly merges the two lowest-frequency nodes until one tree remains.
function buildHuffmanTree(text) {
  const freqMap = {};
  for (const ch of text) freqMap[ch] = (freqMap[ch] || 0) + 1;

  let nodes = Object.entries(freqMap).map(([char, freq]) => new HuffmanNode(char, freq));

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);
    const [a, b] = nodes;
    const merged = new HuffmanNode(null, a.freq + b.freq, a, b);
    nodes = nodes.slice(2).concat([merged]);
  }

  return nodes[0]; // root
}

// Root-to-leaf path gives each character's code: 0 for left, 1 for right.
function buildCodes(node, path = "", codes = {}) {
  if (!node) return codes;
  if (node.left === null && node.right === null) {
    codes[node.char] = path || "0";
    return codes;
  }
  buildCodes(node.left, path + "0", codes);
  buildCodes(node.right, path + "1", codes);
  return codes;
}

function encode(text) {
  const root = buildHuffmanTree(text);
  const codes = buildCodes(root);
  const encoded = [...text].map((ch) => codes[ch]).join("");
  return { encoded, codes };
}

// Usage example
encode("abracadabra");
// codes: { a: "0", b: "111", r: "10", c: "1100", d: "1101" } (exact codes vary by tie-breaking)`,

  python: `class HuffmanNode:
    def __init__(self, char, freq, left=None, right=None):
        self.char = char
        self.freq = freq
        self.left = left
        self.right = right

# Repeatedly merges the two lowest-frequency nodes until one tree remains.
def build_huffman_tree(text):
    freq_map = {}
    for ch in text:
        freq_map[ch] = freq_map.get(ch, 0) + 1

    nodes = [HuffmanNode(ch, freq) for ch, freq in freq_map.items()]

    while len(nodes) > 1:
        nodes.sort(key=lambda n: n.freq)
        a, b = nodes[0], nodes[1]
        merged = HuffmanNode(None, a.freq + b.freq, a, b)
        nodes = nodes[2:] + [merged]

    return nodes[0]  # root

# Root-to-leaf path gives each character's code: 0 for left, 1 for right.
def build_codes(node, path="", codes=None):
    if codes is None:
        codes = {}
    if node is None:
        return codes
    if node.left is None and node.right is None:
        codes[node.char] = path or "0"
        return codes
    build_codes(node.left, path + "0", codes)
    build_codes(node.right, path + "1", codes)
    return codes

def encode(text):
    root = build_huffman_tree(text)
    codes = build_codes(root)
    encoded = "".join(codes[ch] for ch in text)
    return encoded, codes

# Usage example
encode("abracadabra")
# codes: {'a': '0', 'b': '111', 'r': '10', 'c': '1100', 'd': '1101'} (exact codes vary by tie-breaking)`,

  c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct HuffmanNode {
    char ch;
    int freq;
    int isLeaf;
    struct HuffmanNode *left, *right;
} HuffmanNode;

HuffmanNode* makeNode(char ch, int freq, int isLeaf, HuffmanNode* left, HuffmanNode* right) {
    HuffmanNode* node = malloc(sizeof(HuffmanNode));
    node->ch = ch;
    node->freq = freq;
    node->isLeaf = isLeaf;
    node->left = left;
    node->right = right;
    return node;
}

// Root-to-leaf path gives each character's code: 0 for left, 1 for right.
void buildCodes(HuffmanNode* node, char* path, int depth, char codes[256][32]) {
    if (node == NULL) return;
    if (node->isLeaf) {
        path[depth] = '\\0';
        strcpy(codes[(unsigned char)node->ch], depth == 0 ? "0" : path);
        return;
    }
    path[depth] = '0';
    buildCodes(node->left, path, depth + 1, codes);
    path[depth] = '1';
    buildCodes(node->right, path, depth + 1, codes);
}

// Note: a real implementation uses a min-heap; this sketch shows the core
// merge step — repeatedly pull the two lowest-frequency nodes and merge them.
int main() {
    // Build freqMap, wrap each into a leaf HuffmanNode, repeatedly merge the
    // two lowest-frequency nodes (as in the JavaScript/Python versions)
    // until one root node remains, then call buildCodes(root, path, 0, codes).
    return 0;
}`,

  java: `import java.util.*;

class HuffmanNode implements Comparable<HuffmanNode> {
    Character ch;
    int freq;
    HuffmanNode left, right;

    HuffmanNode(Character ch, int freq, HuffmanNode left, HuffmanNode right) {
        this.ch = ch;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }

    boolean isLeaf() {
        return left == null && right == null;
    }

    public int compareTo(HuffmanNode other) {
        return this.freq - other.freq;
    }
}

public class HuffmanCoding {

    // Repeatedly merges the two lowest-frequency nodes until one tree remains.
    static HuffmanNode buildTree(String text) {
        Map<Character, Integer> freqMap = new HashMap<>();
        for (char ch : text.toCharArray()) {
            freqMap.merge(ch, 1, Integer::sum);
        }

        PriorityQueue<HuffmanNode> queue = new PriorityQueue<>();
        for (Map.Entry<Character, Integer> entry : freqMap.entrySet()) {
            queue.add(new HuffmanNode(entry.getKey(), entry.getValue(), null, null));
        }

        while (queue.size() > 1) {
            HuffmanNode a = queue.poll();
            HuffmanNode b = queue.poll();
            queue.add(new HuffmanNode(null, a.freq + b.freq, a, b));
        }

        return queue.poll();
    }

    // Root-to-leaf path gives each character's code: 0 for left, 1 for right.
    static void buildCodes(HuffmanNode node, String path, Map<Character, String> codes) {
        if (node == null) return;
        if (node.isLeaf()) {
            codes.put(node.ch, path.isEmpty() ? "0" : path);
            return;
        }
        buildCodes(node.left, path + "0", codes);
        buildCodes(node.right, path + "1", codes);
    }

    public static void main(String[] args) {
        String text = "abracadabra";
        HuffmanNode root = buildTree(text);
        Map<Character, String> codes = new HashMap<>();
        buildCodes(root, "", codes);
        System.out.println(codes);
    }
}`,
};

export default codeExamples;
