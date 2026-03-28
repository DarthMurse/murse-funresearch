# Understanding Attention Mechanisms in Transformers

The Transformer architecture revolutionized natural language processing and has since expanded into vision, audio, and beyond. At its heart lies the **attention mechanism**.

## The Problem with Sequence Models

Traditional RNNs and LSTMs process sequences one token at a time, creating a bottleneck:

- Long-range dependencies are hard to capture
- Sequential processing prevents parallelization
- Information gets compressed into fixed-size hidden states

## Self-Attention: The Core Idea

Self-attention allows every token in a sequence to directly attend to every other token. For each token, we compute three vectors:

- **Query (Q)**: "What am I looking for?"
- **Key (K)**: "What do I contain?"
- **Value (V)**: "What information do I provide?"

The attention score is computed as:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) V$$

## Multi-Head Attention

Instead of computing a single attention function, multi-head attention runs several attention operations in parallel:

```python
class MultiHeadAttention:
    def __init__(self, d_model, num_heads):
        self.num_heads = num_heads
        self.d_k = d_model // num_heads
        self.W_q = Linear(d_model, d_model)
        self.W_k = Linear(d_model, d_model)
        self.W_v = Linear(d_model, d_model)
        self.W_o = Linear(d_model, d_model)

    def forward(self, x):
        Q = self.W_q(x).reshape(-1, self.num_heads, self.d_k)
        K = self.W_k(x).reshape(-1, self.num_heads, self.d_k)
        V = self.W_v(x).reshape(-1, self.num_heads, self.d_k)

        scores = (Q @ K.transpose(-2, -1)) / sqrt(self.d_k)
        attn = softmax(scores, dim=-1)
        return self.W_o((attn @ V).reshape(-1, d_model))
```

Each head can learn to focus on different types of relationships — syntax, semantics, positional patterns, etc.

## Why It Works

> "Attention is all you need" — and here's why:

1. **Global context**: Every token sees every other token directly
2. **Parallelism**: All attention computations happen simultaneously
3. **Interpretability**: Attention weights show what the model focuses on

## Beyond NLP

Attention has found success far beyond text:

- **Vision Transformers (ViT)**: Treating image patches as tokens
- **DALL-E / Stable Diffusion**: Cross-attention between text and image
- **AlphaFold**: Predicting protein structures with attention over amino acids

The attention mechanism remains one of the most elegant and impactful ideas in modern deep learning.
