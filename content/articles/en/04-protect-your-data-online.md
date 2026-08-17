---
title: "Protect Your Data Online: Breaches, Compromised Accounts and Backups"
description: "Check whether your data has leaked, recognize a compromised account, take back control in the right order, and back up what cannot be lost."
date: "2026-08-15"
category: "securite-en-ligne"
level: "debutant"
draft: false
image: "/img/articles/proteger-ses-donnees-en-ligne.jpg"
imageCredit: "AI-generated illustration (Midjourney)"
fiche: "/fiches/domaformalis-fiche-04-compte-compromis-EN.pdf"
slug: "protect-your-data-online"
tags: ["cybersecurity", "data breach", "compromised account", "backup"]
---

# Protect Your Data Online: Breaches, Compromised Accounts and Backups

## Learning objective

After reading this article, you will be able to check whether your data has appeared in a breach, recognize the signs of a compromised account, take back control in the right order, and set up the backup that makes an attack recoverable — starting today.

---

## A situation you might recognize

You receive a notification: an unknown device just signed in to one of your accounts. You don't know when it happened, or how, or what that person now has access to. You change your password — but is that enough? Have they already downloaded your files? Read your messages? Used what they found in that first account to open another?

The first three articles in this track taught you prevention: [the right reflexes](/en/articles/avoiding-online-scams), [phishing detection](/en/articles/recognize-a-phishing-email), [reducing your exposure](/en/articles/protect-your-private-life-online). This one covers what no prevention fully eliminates: **the day it happens anyway.** Reacting fast, and in the right order, is the difference between an incident and a catastrophe.

---

## First, understand: the leak (almost) never comes from you

When your credentials are circulating, it's rarely because you were personally "hacked". It's because a company where you had an account suffered a **data breach** — and that happens regularly, including to the biggest names. The stolen email + password combinations are then resold and tested automatically against hundreds of other services: banking, email, social media. This is **credential stuffing**.

Two practical consequences:

**1.** You cannot prevent breaches — they happen at other people's companies. You can only ensure a breach compromises a single account: that is exactly what unique passwords do ([article 1](/en/articles/avoiding-online-scams)).

**2.** You can find out whether you're affected — that's the next section.

---

## Check whether your data has leaked — 5 minutes

**[haveibeenpwned.com](https://haveibeenpwned.com)** is a free, widely recognized service that catalogues publicly known data breaches. Enter your email address: it tells you which breaches it appears in, when, and which data was affected (passwords, phone, address…).

**How to read the result:** appearing in a 2019 breach is not an emergency in itself — it's information. The question is: *is the password from that service still in use anywhere?* If so, change it everywhere it's used, immediately.

**Then automate:** your password manager (Bitwarden: "Reports"; Chrome/Firefox: built-in check) alerts you when one of your passwords appears in a known breach. Turn that check on once, and it works for you continuously.

---

## Recognizing a compromised account: the 4 signs

1. **A sign-in from an unknown device or location** — "new sign-in" notifications are not noise: read them.
2. **Password-reset emails you didn't request** — someone is testing your doors.
3. **Sent messages you didn't write** — your contacts receive links "from you".
4. **The sign almost nobody checks: rules created in your mailbox.** An attacker with access to your email often installs an **automatic forwarding rule** (copying your mail to their address) or filters that delete security alerts — to keep access even after you change your password. Settings → Filters and forwarding: if you configured nothing, that list should be empty.

---

## The recovery protocol — in this order

Order matters: securing account 4 before account 1 leaves the front door open.

**Step 1 — Email first, always.** It's the master key: whoever controls it can reset everything else. Even if another account seems affected, start by checking your email.

**Step 2 — Change the password AND sign out all sessions.** Changing the password isn't enough: the attacker's already-open sessions remain valid. Look for "Sign out of all devices" (every major service offers it in its security settings).

**Step 3 — Inspect recovery options and rules.** Backup email, phone number: are they really yours? Forwarding rules and filters: nothing unknown? This is where the attacker settles in for the long term.

**Step 4 — Turn on 2FA, then handle linked accounts.** Two-factor authentication on the recovered account, then change the password of every account that shared the same one — and of those reachable from the compromised mailbox.

**Step 5 — Notify who needs to know.** Bank details exposed: block the card immediately. Messages sent in your name: warn your contacts (don't click my recent messages). And report it: in the UK via **Action Fraud**, in the US at [ic3.gov](https://www.ic3.gov), in France [cybermalveillance.gouv.fr](https://www.cybermalveillance.gouv.fr), in Spain INCIBE's **017** helpline, in Bulgaria [cybercrime.bg](https://www.cybercrime.bg).

---

## The last line of defense: backups

Everything above protects your accounts. That still leaves your **data** — photos, documents, work — which ransomware, theft or a simple hardware failure can erase. The simplified rule, known as **3-2-1**:

- **Two copies besides the original**: one in a trusted cloud (automatic sync), one on an external drive.
- **The external drive stays disconnected** outside of backup time — a permanently plugged-in drive gets encrypted by ransomware along with the computer.
- **Test a restore once a year.** A backup that was never tested is a hope, not a backup.

A backed-up file can neither be held hostage nor lost. It's the measure that turns the worst-case scenario into a bad memory.

---

## What really matters

**1. Know whether you've leaked.** haveibeenpwned once, then your manager's automatic alerts. You can't react to what you don't know.

**2. If compromised: email first, sessions signed out, rules checked.** The three moves the attacker hopes you'll forget.

**3. Back up 3-2-1.** The only protection that still works when everything else has failed.

---

## A simple method to put in place

**This week:** run your main address (and the secondary one) through haveibeenpwned. Change any leaked password still in service. Turn on your manager's breach alerts.

**Next week:** open your email's security settings: connected devices (remove the unknown), recovery options (verify them), forwarding rules (empty or known list).

**This month:** set up the 3-2-1 backup: cloud sync + a first export to an external drive, drive stored unplugged.

**What "good enough" looks like:**

- **Beginner** — haveibeenpwned check done, leaked passwords changed, devices connected to your email reviewed
- **Intermediate** — automatic breach alerts active, recovery protocol known (the cheat sheet is printed somewhere), cloud backup in place
- **Advanced** — full 3-2-1 backup with an annual restore test, periodic review of access logs on your critical accounts

---

## An honest note

There is something unpleasant about finding your address in six data breaches — yet that's the situation of most long-time Internet users, and it's not the fault of any of them. Digital security isn't a state you reach: it's the ability to absorb an incident without it becoming a catastrophe.

With unique passwords, a locked-down mailbox and a tested backup, a data breach becomes what it should be: an informational email, not a crisis.

---

## To go further

📄 **[Download the "Compromised Account: The Protocol" cheat sheet](/fiches/domaformalis-fiche-04-compte-compromis-EN.pdf)** — the 5 steps in the right order, to print before you need them.

📘 **[Get the full "Internet & Scams" guide](/en/membres)** — our detailed guide, free, sent by email upon simple sign-up.

This article closes the **Internet Security** track: [1. Avoiding scams](/en/articles/avoiding-online-scams) · [2. Recognizing phishing](/en/articles/recognize-a-phishing-email) · [3. Reducing exposure](/en/articles/protect-your-private-life-online) · 4. Reacting to breaches — you are here.
