const codeExamples = {
  javascript: `// Gini impurity: 0 when a set is pure (all one class), higher when mixed.
function gini(labels) {
  const counts = {};
  labels.forEach((l) => (counts[l] = (counts[l] || 0) + 1));
  const n = labels.length;
  let impurity = 1;
  Object.values(counts).forEach((c) => {
    const p = c / n;
    impurity -= p * p;
  });
  return impurity;
}

function majorityLabel(labels) {
  const counts = {};
  labels.forEach((l) => (counts[l] = (counts[l] || 0) + 1));
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

// Tries every midpoint between consecutive distinct values, keeping whichever
// split minimizes the weighted Gini impurity of the two resulting groups.
function bestSplit(data) {
  const values = [...new Set(data.map((d) => d.value))].sort((a, b) => a - b);
  let best = null;

  for (let i = 0; i < values.length - 1; i++) {
    const threshold = (values[i] + values[i + 1]) / 2;
    const left = data.filter((d) => d.value <= threshold);
    const right = data.filter((d) => d.value > threshold);
    if (left.length === 0 || right.length === 0) continue;

    const weighted =
      (left.length / data.length) * gini(left.map((d) => d.label)) +
      (right.length / data.length) * gini(right.map((d) => d.label));

    if (!best || weighted < best.weighted) best = { threshold, weighted, left, right };
  }
  return best;
}

// Recursively splits the data on whichever threshold most reduces impurity.
function buildTree(data, depth = 0, maxDepth = 4) {
  const labels = data.map((d) => d.label);

  if (new Set(labels).size === 1 || depth >= maxDepth || data.length < 2) {
    return { isLeaf: true, prediction: majorityLabel(labels) };
  }

  const split = bestSplit(data);
  if (!split) return { isLeaf: true, prediction: majorityLabel(labels) };

  return {
    isLeaf: false,
    threshold: split.threshold,
    left: buildTree(split.left, depth + 1, maxDepth),
    right: buildTree(split.right, depth + 1, maxDepth),
  };
}

function predict(tree, value) {
  if (tree.isLeaf) return tree.prediction;
  return value <= tree.threshold ? predict(tree.left, value) : predict(tree.right, value);
}

// Usage example
const data = [
  { value: 45, label: "No" }, { value: 70, label: "Yes" }, { value: 90, label: "No" },
];
const tree = buildTree(data);
predict(tree, 72); // "Yes"`,

  python: `# Gini impurity: 0 when a set is pure (all one class), higher when mixed.
def gini(labels):
    counts = {}
    for l in labels:
        counts[l] = counts.get(l, 0) + 1
    n = len(labels)
    impurity = 1
    for c in counts.values():
        p = c / n
        impurity -= p * p
    return impurity

def majority_label(labels):
    counts = {}
    for l in labels:
        counts[l] = counts.get(l, 0) + 1
    return max(counts.items(), key=lambda kv: kv[1])[0]

# Tries every midpoint between consecutive distinct values, keeping whichever
# split minimizes the weighted Gini impurity of the two resulting groups.
def best_split(data):
    values = sorted(set(d["value"] for d in data))
    best = None

    for i in range(len(values) - 1):
        threshold = (values[i] + values[i + 1]) / 2
        left = [d for d in data if d["value"] <= threshold]
        right = [d for d in data if d["value"] > threshold]
        if not left or not right:
            continue

        weighted = (len(left) / len(data)) * gini([d["label"] for d in left]) + \\
                   (len(right) / len(data)) * gini([d["label"] for d in right])

        if best is None or weighted < best["weighted"]:
            best = {"threshold": threshold, "weighted": weighted, "left": left, "right": right}
    return best

# Recursively splits the data on whichever threshold most reduces impurity.
def build_tree(data, depth=0, max_depth=4):
    labels = [d["label"] for d in data]

    if len(set(labels)) == 1 or depth >= max_depth or len(data) < 2:
        return {"is_leaf": True, "prediction": majority_label(labels)}

    split = best_split(data)
    if split is None:
        return {"is_leaf": True, "prediction": majority_label(labels)}

    return {
        "is_leaf": False,
        "threshold": split["threshold"],
        "left": build_tree(split["left"], depth + 1, max_depth),
        "right": build_tree(split["right"], depth + 1, max_depth),
    }

def predict(tree, value):
    if tree["is_leaf"]:
        return tree["prediction"]
    branch = tree["left"] if value <= tree["threshold"] else tree["right"]
    return predict(branch, value)

# Usage example
data = [{"value": 45, "label": "No"}, {"value": 70, "label": "Yes"}, {"value": 90, "label": "No"}]
tree = build_tree(data)
predict(tree, 72)  # "Yes"`,

  c: `#include <stdio.h>

typedef struct { double value; char label[8]; } Sample;

// Gini impurity for a binary-ish label set, simplified for two classes "Yes"/"No".
double gini(Sample* data, int n) {
    int yes = 0;
    for (int i = 0; i < n; i++) if (data[i].label[0] == 'Y') yes++;
    double pYes = (double)yes / n;
    double pNo = 1.0 - pYes;
    return 1.0 - pYes * pYes - pNo * pNo;
}

// A full C implementation needs dynamic node/tree structures; this sketch
// shows the core impurity calculation used to score every candidate split
// (as in the JavaScript/Python versions) when searching for the best threshold.
int main() {
    Sample data[] = { {45, "No"}, {70, "Yes"}, {90, "No"} };
    printf("Gini: %f\\n", gini(data, 3));
    return 0;
}`,

  java: `import java.util.*;

public class DecisionTree {
    static class Sample {
        double value;
        String label;
        Sample(double value, String label) { this.value = value; this.label = label; }
    }

    static class Node {
        boolean isLeaf;
        String prediction;
        double threshold;
        Node left, right;
    }

    // Gini impurity: 0 when a set is pure (all one class), higher when mixed.
    static double gini(List<Sample> data) {
        Map<String, Integer> counts = new HashMap<>();
        for (Sample s : data) counts.merge(s.label, 1, Integer::sum);
        double impurity = 1.0;
        for (int c : counts.values()) {
            double p = (double) c / data.size();
            impurity -= p * p;
        }
        return impurity;
    }

    static String majorityLabel(List<Sample> data) {
        Map<String, Integer> counts = new HashMap<>();
        for (Sample s : data) counts.merge(s.label, 1, Integer::sum);
        return Collections.max(counts.entrySet(), Map.Entry.comparingByValue()).getKey();
    }

    // Recursively splits the data on whichever threshold most reduces impurity.
    static Node buildTree(List<Sample> data, int depth, int maxDepth) {
        Node node = new Node();
        Set<String> labels = new HashSet<>();
        for (Sample s : data) labels.add(s.label);

        if (labels.size() == 1 || depth >= maxDepth || data.size() < 2) {
            node.isLeaf = true;
            node.prediction = majorityLabel(data);
            return node;
        }

        double bestWeighted = Double.MAX_VALUE;
        double bestThreshold = 0;
        List<Sample> bestLeft = null, bestRight = null;

        List<Double> values = new ArrayList<>();
        for (Sample s : data) if (!values.contains(s.value)) values.add(s.value);
        Collections.sort(values);

        for (int i = 0; i < values.size() - 1; i++) {
            double threshold = (values.get(i) + values.get(i + 1)) / 2;
            List<Sample> left = new ArrayList<>(), right = new ArrayList<>();
            for (Sample s : data) (s.value <= threshold ? left : right).add(s);
            if (left.isEmpty() || right.isEmpty()) continue;

            double weighted = ((double) left.size() / data.size()) * gini(left)
                             + ((double) right.size() / data.size()) * gini(right);
            if (weighted < bestWeighted) {
                bestWeighted = weighted;
                bestThreshold = threshold;
                bestLeft = left;
                bestRight = right;
            }
        }

        if (bestLeft == null) {
            node.isLeaf = true;
            node.prediction = majorityLabel(data);
            return node;
        }

        node.isLeaf = false;
        node.threshold = bestThreshold;
        node.left = buildTree(bestLeft, depth + 1, maxDepth);
        node.right = buildTree(bestRight, depth + 1, maxDepth);
        return node;
    }

    public static void main(String[] args) {
        List<Sample> data = Arrays.asList(new Sample(45, "No"), new Sample(70, "Yes"), new Sample(90, "No"));
        Node root = buildTree(data, 0, 4);
        System.out.println("Root threshold: " + root.threshold);
    }
}`,
};

export default codeExamples;
