import { Circomkit, WasmTester } from "circomkit";

const circomkit = new Circomkit();

describe("fibonacci", () => {
  let circuit: WasmTester<["in"], ["out"]>;
  const N = 19;

  before(async () => {
    circuit = await circomkit.WasmTester(`fibonacci_${N}`, {
      file: "fibonacci",
      template: "Fibonacci",
      params: [N],
    });
    await circuit.checkConstraintCount();
  });

  it("should compute correctly", async () => {
    await circuit.expectPass({ in: [1, 1] }, { out: fibonacci([1, 1], N) });
  });
});

describe("fibonacci recursive", () => {
  let circuit: WasmTester<["in"], ["out"]>;

  const N = 19;

  before(async () => {
    circuit = await circomkit.WasmTester(`fibonacci_${N}_recursive`, {
      file: "fibonacci",
      template: "FibonacciRecursive",
      params: [N],
    });
    await circuit.checkConstraintCount();
  });

  it("should compute correctly", async () => {
    await circuit.expectPass({ in: [1, 1] }, { out: fibonacci([1, 1], N) });
  });
});

// simple fibonacci with 2 variables
function fibonacci(init: [number, number], n: number): number {
  if (n < 0) {
    throw new Error("N must be positive");
  }

  let [a, b] = init;
  for (let i = 2; i <= n; i++) {
    b = a + b;
    a = b - a;
  }
  return n === 0 ? a : b;
}
