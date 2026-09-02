---
title: "AI Under the Hood: 5 Advanced Notions That Change How You Use It"
description: "How a model learns, why it “forgets“, where its biases come from, why two answers differ: five plain-language notions that explain the behaviors you observe — and how to turn them to your advantage."
date: "2026-08-21"
category: "ia"
level: "debutant"
draft: false
image: "/img/articles/ia-notions-avancees.jpg"
imageCredit: "AI-generated illustration (Midjourney)"
fiche: "/fiches/domaformalis-fiche-10-ia-sous-le-capot-EN.pdf"
slug: "ai-advanced-notions"
tags: ["artificial intelligence", "generative AI", "how AI works", "digital literacy"]
---

# AI Under the Hood: 5 Advanced Notions That Change How You Use It

## Learning objective

After reading this article, you will understand five notions about how AI assistants work (learning by adjusting billions of parameters, tokens, the role of training data, the context window, and probabilistic generation), without a single line of code, and you will know exactly what each one changes in the way you use them.

---

## A situation you might recognize

You've been using an AI assistant for a few months. You've internalized [the basic reflexes](/en/articles/ai-foundations): verifying facts, protecting your data, formulating precisely. But some behaviors keep puzzling you: why does it give two different answers to the same question? Why does it "forget" what you said twenty messages ago? Why is it brilliant on one topic and strangely bad on another, sometimes a simpler one?

These behaviors are not bugs: they are direct consequences of how these systems are built. Understanding them (without becoming a computer scientist) transforms your usage: you stop enduring the quirks and start anticipating them.

---

## The 5 notions

### Notion 1 — The model isn't a database: it's billions of tuned dials

An AI model is, at bottom, an immense mathematical function full of **parameters**: picture billions of tiny adjustment dials. During training, it's shown enormous quantities of text, and an adjustment mechanism runs millions of times: the model produces an output, the gap with what was expected is measured, and each dial is nudged in the direction that reduces the error. Repeated at massive scale, this process gives rise to a general ability to produce coherent language.

**What it changes for you:** there is **no file** anywhere that your question goes to look up "the" answer in. The model consults nothing: it generates, from regularities memorized in its settings. That's why it can misstate a well-known fact, blend two neighboring topics, or invent a plausible detail: it reconstructs, it doesn't copy. Verifying important facts ([reflex #1 from the foundations](/en/articles/ai-foundations)) follows directly from this architecture.

---

### Notion 2 — It doesn't read words: it reads tokens

Before processing your text, the model chops it into **tokens**: fragments that sometimes correspond to a whole word, sometimes a piece of a word, sometimes a punctuation mark. "Hello" may be one token; a rare or invented word gets split into several.

**What it changes for you:** it explains an entire family of surprising weaknesses. Counting the letters in a word, handling anagrams, playing with spelling: the model doesn't "see" individual letters, it sees fragments, hence errors on tasks a child gets right. Same for very rare words, unusual proper nouns and narrow technical vocabulary: badly split, badly mastered. The practical reflex: when an answer goes off the rails around a specific term, **rephrase with more common words**. You change the splitting, and often the result.

---

### Notion 3 — Training data sets the ceiling — and the biases

"Mediocre data, mediocre results" isn't a slogan: it's a structural constraint. Everything the model can do comes from its training data, and it inherits three properties from it:

- **What's abundant in the data is well mastered**; what's rare, poorly. Hence the paradox you've noticed: excellent on a mainstream topic, fragile in your professional niche. It's precisely on rare topics that hallucinations multiply, with the same confidence.
- **What's recent is missing**: the data stops at a date ([the cutoff notion from the foundations](/en/articles/ai-foundations)).
- **The biases of human texts become the model's.** Stereotypes, dominant viewpoints, representation imbalances present in the source texts carry through (attenuated or not) into the answers.

**What it changes for you:** calibrate your trust by the rarity of the topic. The more specialized your question, the more verification is required. And keep in mind that the AI's "standard" answer reflects the majority viewpoint of its data, not a neutral truth: on societal topics, explicitly ask for the other perspectives.

---

### Notion 4 — The context window: why it "forgets"

A model has no memory in the human sense. At every message, it rereads the whole conversation (your full history is sent back to it), and generates the continuation. But that rereading has a maximum size: the **context window**. When the conversation gets very long, the beginning eventually falls out of the window, or weighs less in the generation.

**What it changes for you:** three concrete habits. **One conversation = one topic**: start fresh when you switch tasks, rather than stacking. **Restate the essential context** when an exchange drags on ("reminder: we're working on X with constraint Y"). And for long documents, don't ask for everything at once: work section by section. What looked like absent-mindedness is a mechanical limit, and it's easy to work around once you know it.

---

### Notion 5 — A probability machine: why two answers differ

The model generates its answer piece by piece, choosing at each step among the most probable continuations, with a deliberate dose of randomness, tuned by what designers call "temperature". Two direct consequences: the same question can produce two different answers, and the wording of your request shifts the probabilities. And therefore the result.

There's a deeper lesson behind it: an AI system optimizes **the measure it was given**, not your intention. The classic machine-learning example: on data where 95% of cases are "positive", a model that always answers "positive" reaches 95% accuracy, excellent score, perfectly useless system. Designers spend their days choosing the right measures; you, as a user, see the effect: the model aims for the *plausible and satisfying on average*, not the true-for-you.

**What it changes for you:** re-asking an important question, or rephrasing it from two angles, isn't a whim. It's a legitimate sampling strategy. If two phrasings give incompatible answers, you've just located a zone of model uncertainty: that is exactly where to verify elsewhere.

---

## What really matters

**1. A trained generator, not an encyclopedia.** All the strange behaviors (hallucinations, forgetting, variance) flow from this single idea. It advantageously replaces dozens of memorized rules.

**2. Context is your #1 lever.** Context window, formulation, chunking: what you put into the conversation shapes what comes out, far more than any setting.

**3. Variance is information.** Answers that change from one phrasing to the next signal the model's uncertainty. Use it as a detector: where it varies, you verify.

---

## A simple method: 3 experiments, without a line of code

The best way to anchor these notions is to observe them yourself, the user's equivalent of the engineers' "break it deliberately":

**Experiment 1 — The window.** In an already long conversation, ask: "Remind me precisely of my very first question." Watch what comes back, and what has faded. You'll see the context limit at work.

**Experiment 2 — The variance.** Ask the same non-trivial factual question three times (fresh conversations), then a fourth time rephrased. Compare: what's stable is probably solid; what varies is to be verified.

**Experiment 3 — The data ceiling.** Ask a question on a very mainstream topic, then one of equal difficulty in your professional niche. Verify both answers: you'll find that the confidence of the tone, however, doesn't change, the definitive demonstration that "confidence is not evidence".

**What "good enough" looks like:**

- **Beginner**: you can explain in your own words why AI isn't a database, and you start a fresh conversation for every new topic
- **Intermediate**: you rephrase when a term trips it up, you calibrate your trust by topic rarity, and you use variance as an uncertainty detector
- **Advanced** (you can explain the five notions and their practical consequences to someone else) the real test of understanding

---

## An honest note

This article owns its simplifications: how these systems really work is the subject of active research, and specialists themselves still debate what "understanding" means for a model. But the five notions presented here are structural. They will remain valid whatever models come next, because they describe the family of architecture, not a product.

And if this trip under the hood has made you want to go all the way to code (building a small network yourself, training a first model) that's an excellent learning project. It's simply not a prerequisite: everything above is enough to make you a markedly more clear-eyed user than average.

---

## To go further

📄 **[Download the "AI Under the Hood" cheat sheet](/fiches/domaformalis-fiche-10-ia-sous-le-capot-EN.pdf)** — the 5 notions, their practical consequences and the 3 experiments, on one A4 page.

📘 **[Get our AI guide when it's released](/en/membres)** — sign up and be notified as soon as it's published.

This article is the second in the **Artificial Intelligence** track. Previous: [understanding AI — the foundations](/en/articles/ai-foundations). The track will soon grow: deepfakes, AI ethics and dangers, digital balance.
