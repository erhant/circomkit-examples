import { Circomkit, WasmTester } from "circomkit";
import { randomBytes, createHash } from "crypto";

const circomkit = new Circomkit();

describe("sha256", () => {
  let circuit: WasmTester<["in"], ["out"]>;

  // number of bytes for the sha256 input
  const NUM_BYTES = 36;

  // preimage and its byte array
  const PREIMAGE = randomBytes(NUM_BYTES);
  const PREIMAGE_BYTES = PREIMAGE.toJSON().data;

  // digest and its byte array
  const DIGEST = createHash("sha256").update(PREIMAGE).digest("hex");
  const DIGEST_BYTES = Buffer.from(DIGEST, "hex").toJSON().data;

  // circuit signals
  const INPUT = {
    in: PREIMAGE_BYTES,
  };
  const OUTPUT = {
    out: DIGEST_BYTES,
  };

  before(async () => {
    circuit = await circomkit.WasmTester(`sha256_${NUM_BYTES}`, {
      file: "sha256",
      template: "Sha256Bytes",
      params: [NUM_BYTES],
    });
    await circuit.checkConstraintCount();
  });

  it("should compute hash correctly", async () => {
    await circuit.expectPass(INPUT, OUTPUT);
  });
});
