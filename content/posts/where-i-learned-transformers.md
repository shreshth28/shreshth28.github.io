---
title: "Where I learned transformers and LLMs"
date: 2026-03-05
summary: "The videos, write-ups and interactive visualizations that helped me get a picture of how transformers work."
tags: [llm, transformers, learning]
---

Once I'd learned some CUDA, the obvious question was what all these GPUs are actually being used for right now, and the answer is mostly transformers. I'd been using LLMs for a while without really knowing what happens inside one, so I went looking for good explanations. Here's what helped me get a picture of it.

## 1. Get the intuition: 3Blue1Brown

The [neural networks series](https://www.3blue1brown.com/topics/neural-networks), especially the chapters on transformers and attention. Great for building a picture of what an embedding is, what attention is doing to it, and why you'd want many heads of it. No code, which is fine for a first pass.

## 2. The Illustrated Transformer

Jay Alammar's [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) walks through the architecture with a diagram for every step. Queries, keys and values started making sense to me as three matrix multiplies and not as magic. His [Illustrated GPT-2](https://jalammar.github.io/illustrated-gpt2/) does the same for the decoder-only models that chat models are built on.

## 3. Build a tiny one: Karpathy

Andrej Karpathy's [Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html), and in particular "Let's build GPT: from scratch, in code, spelled out". You write a small GPT in a notebook and train it on Shakespeare. Following along and typing it out myself helped more than reading about it.

## 4. Play with it: interactive visualizations

These were my favourite part, because you can poke at a model instead of reading about one.

- **[Transformer Explainer](https://poloclub.github.io/transformer-explainer/)** runs a small GPT-2 right in your browser. You type a prompt and can follow it through embeddings, attention and the MLP layers to the probabilities for the next token, and see how temperature changes them.
- **[LLM Visualization](https://bbycroft.net/llm)** by Brendan Bycroft is a 3D walkthrough of a tiny GPT, step by step, showing every matrix and how it flows into the next one. It's a good way to see how big each piece actually is.
- **[Tiktokenizer](https://tiktokenizer.vercel.app/)** shows how text gets split into tokens. Worth five minutes, because a lot of "why does the model do that" comes down to tokens not being words.
- **[BertViz](https://github.com/jessevig/bertviz)** draws the attention patterns of real models inside a notebook, so you can see which tokens each head is looking at.
