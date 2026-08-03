const codeExamples = {
  javascript: `// Trie (Prefix Tree) node
class TrieNode {
  constructor() {
    this.children = {}; // character -> TrieNode
    this.isEnd = false;  // true if a word ends at this node
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) {
        node.children[ch] = new TrieNode();
      }
      node = node.children[ch];
    }
    node.isEnd = true;
  }

  search(word) {
    const node = this._walk(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix) {
    return this._walk(prefix) !== null;
  }

  _walk(str) {
    let node = this.root;
    for (const ch of str) {
      if (!node.children[ch]) return null;
      node = node.children[ch];
    }
    return node;
  }
}

// Usage example
const trie = new Trie();
["cat", "car", "cart", "dog"].forEach((w) => trie.insert(w));

trie.search("car");       // true
trie.search("ca");        // false — only a prefix, not inserted as a word
trie.startsWith("ca");    // true — "cat"/"car"/"cart" all start with "ca"`,

  python: `# Trie (Prefix Tree) node
class TrieNode:
    def __init__(self):
        self.children = {}   # character -> TrieNode
        self.is_end = False  # True if a word ends at this node

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word):
        node = self._walk(word)
        return node is not None and node.is_end

    def starts_with(self, prefix):
        return self._walk(prefix) is not None

    def _walk(self, s):
        node = self.root
        for ch in s:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node

# Usage example
trie = Trie()
for word in ["cat", "car", "cart", "dog"]:
    trie.insert(word)

trie.search("car")        # True
trie.search("ca")         # False -- only a prefix, not inserted as a word
trie.starts_with("ca")    # True -- "cat"/"car"/"cart" all start with "ca"`,

  c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define ALPHABET_SIZE 26

typedef struct TrieNode {
    struct TrieNode* children[ALPHABET_SIZE];
    int isEnd;
} TrieNode;

TrieNode* newNode() {
    TrieNode* node = (TrieNode*)malloc(sizeof(TrieNode));
    node->isEnd = 0;
    for (int i = 0; i < ALPHABET_SIZE; i++) node->children[i] = NULL;
    return node;
}

void insert(TrieNode* root, const char* word) {
    TrieNode* node = root;
    for (int i = 0; word[i] != '\\0'; i++) {
        int idx = word[i] - 'a';
        if (!node->children[idx]) node->children[idx] = newNode();
        node = node->children[idx];
    }
    node->isEnd = 1;
}

TrieNode* walk(TrieNode* root, const char* s) {
    TrieNode* node = root;
    for (int i = 0; s[i] != '\\0'; i++) {
        int idx = s[i] - 'a';
        if (!node->children[idx]) return NULL;
        node = node->children[idx];
    }
    return node;
}

int search(TrieNode* root, const char* word) {
    TrieNode* node = walk(root, word);
    return node != NULL && node->isEnd;
}

int startsWith(TrieNode* root, const char* prefix) {
    return walk(root, prefix) != NULL;
}

int main() {
    TrieNode* root = newNode();
    const char* words[] = {"cat", "car", "cart", "dog"};
    for (int i = 0; i < 4; i++) insert(root, words[i]);

    printf("search(car): %d\\n", search(root, "car"));         // 1
    printf("search(ca): %d\\n", search(root, "ca"));            // 0
    printf("startsWith(ca): %d\\n", startsWith(root, "ca"));    // 1
    return 0;
}`,

  java: `import java.util.HashMap;
import java.util.Map;

class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isEnd = false;
}

public class Trie {
    private final TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode node = root;
        for (char ch : word.toCharArray()) {
            node = node.children.computeIfAbsent(ch, c -> new TrieNode());
        }
        node.isEnd = true;
    }

    public boolean search(String word) {
        TrieNode node = walk(word);
        return node != null && node.isEnd;
    }

    public boolean startsWith(String prefix) {
        return walk(prefix) != null;
    }

    private TrieNode walk(String s) {
        TrieNode node = root;
        for (char ch : s.toCharArray()) {
            node = node.children.get(ch);
            if (node == null) return null;
        }
        return node;
    }

    public static void main(String[] args) {
        Trie trie = new Trie();
        for (String word : new String[]{"cat", "car", "cart", "dog"}) {
            trie.insert(word);
        }

        System.out.println(trie.search("car"));       // true
        System.out.println(trie.search("ca"));        // false -- only a prefix
        System.out.println(trie.startsWith("ca"));    // true
    }
}`,
};

export default codeExamples;
