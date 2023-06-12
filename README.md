# Circomkit Example Circuits

In this repository, we are using Circomkit to test some example circuits using Mocha. The circuits and the statements that they prove are as follows:

- **Multiplier**: "I know `n` factors that make up some number".
- **Fibonacci**: "I know the `n`'th Fibonacci number".
- **SHA256**: "I know the `n`-byte preimage of some SHA256 digest".
- **Sudoku**: "I know the solution to some `(n^2)x(n^2)` Sudoku puzzle".
- **Floating-Point Addition**: "I know two floating-point numbers that make up some number with `e` exponent and `m` mantissa bits." (adapted from [Berkeley ZKP MOOC 2023 - Lab](https://github.com/rdi-berkeley/zkp-mooc-lab)).

You can use the following commands to test the circuits:

```sh
# test everything
yarn test:all

# test a circuit
yarn test "circuit name"
``
```
