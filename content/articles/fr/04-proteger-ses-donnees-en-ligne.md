---
title: "Protéger ses données en ligne : fuites, comptes compromis et sauvegardes"
description: "Vérifier si vos données ont fuité, reconnaître un compte compromis, reprendre le contrôle dans le bon ordre, et sauvegarder ce qui ne peut pas être perdu."
date: "2026-08-15"
category: "securite-en-ligne"
level: "debutant"
draft: false
image: "/img/articles/proteger-ses-donnees-en-ligne.jpg"
imageCredit: "Illustration générée par IA (Midjourney)"
fiche: "/fiches/domaformalis-fiche-04-compte-compromis-FR.pdf"
slug: "proteger-ses-donnees-en-ligne"
tags: ["cybersécurité", "fuite de données", "compte compromis", "sauvegarde"]
---

# Protéger ses données en ligne : fuites, comptes compromis et sauvegardes

## Objectif d'apprentissage

Après avoir lu cet article, vous saurez vérifier si vos données sont apparues dans une fuite, reconnaître les signes d'un compte compromis, reprendre le contrôle dans le bon ordre, et mettre en place la sauvegarde qui rend une attaque récupérable — dès aujourd'hui.

---

## Une situation que vous reconnaîtrez peut-être

Vous recevez une notification : un appareil inconnu vient de se connecter à l'un de vos comptes. Vous ne savez pas quand c'est arrivé, ni comment, ni à quoi cette personne a maintenant accès. Vous changez votre mot de passe — mais est-ce suffisant ? A-t-elle déjà téléchargé vos fichiers ? Lu vos messages ? Utilisé ce qu'elle a trouvé dans ce premier compte pour en ouvrir un autre ?

Les trois premiers articles de ce parcours vous ont appris à prévenir : [les bons réflexes](/fr/articles/eviter-les-arnaques-en-ligne), [la détection du phishing](/fr/articles/reconnaitre-un-email-de-phishing), [la réduction de votre exposition](/fr/articles/proteger-sa-vie-privee-en-ligne). Celui-ci couvre ce qu'aucune prévention n'élimine complètement : **le jour où c'est quand même arrivé.** Savoir réagir vite et dans le bon ordre fait toute la différence entre un incident et une catastrophe.

---

## D'abord, comprendre : la fuite ne vient (presque) jamais de vous

Quand vos identifiants circulent, c'est rarement parce qu'on vous a « piraté » personnellement. C'est parce qu'une entreprise chez qui vous aviez un compte a subi une **violation de données** — et ça arrive régulièrement, y compris aux plus grandes. Les combinaisons e-mail + mot de passe volées sont ensuite revendues et testées automatiquement sur des centaines d'autres services : banque, messagerie, réseaux sociaux. C'est le **credential stuffing** (bourrage d'identifiants).

Deux conséquences pratiques :

**1.** Vous ne pouvez pas empêcher les fuites — elles se produisent chez les autres. Vous pouvez seulement faire en sorte qu'une fuite ne compromette qu'un seul compte : c'est exactement ce que font les mots de passe uniques ([article 1](/fr/articles/eviter-les-arnaques-en-ligne)).

**2.** Vous pouvez savoir si vous êtes concerné — c'est la section suivante.

---

## Vérifier si vos données ont fuité — 5 minutes

**[haveibeenpwned.com](https://haveibeenpwned.com)** est un service gratuit et reconnu qui recense les violations de données publiques. Entrez votre adresse e-mail : il vous dit dans quelles fuites elle apparaît, à quelle date, et quelles données étaient concernées (mots de passe, téléphone, adresse…).

**Comment lire le résultat :** apparaître dans une fuite de 2019 n'est pas une urgence en soi — c'est une information. La question est : *le mot de passe de ce service est-il encore utilisé quelque part ?* Si oui, changez-le partout où il sert, immédiatement.

**Automatisez ensuite :** votre gestionnaire de mots de passe (Bitwarden : « Rapports » ; navigateurs Chrome/Firefox : vérification intégrée) vous alerte quand un de vos mots de passe apparaît dans une fuite connue. Activez cette vérification une fois, elle travaille pour vous en continu.

---

## Reconnaître un compte compromis : les 4 signes

1. **Une connexion depuis un appareil ou un lieu inconnu** — les notifications « nouvelle connexion » ne sont pas du bruit : lisez-les.
2. **Des e-mails de réinitialisation que vous n'avez pas demandés** — quelqu'un teste vos portes.
3. **Des messages envoyés que vous n'avez pas écrits** — vos contacts reçoivent des liens « de votre part ».
4. **Le signe que presque personne ne vérifie : des règles créées dans votre boîte mail.** Un attaquant qui accède à votre messagerie installe souvent une **règle de transfert automatique** (copie de vos mails vers son adresse) ou des filtres qui suppriment les alertes de sécurité — pour garder l'accès même après votre changement de mot de passe. Réglages → Filtres et règles de transfert : si vous n'avez rien configuré, cette liste doit être vide.

---

## Le protocole de reprise de contrôle — dans cet ordre

L'ordre compte : sécuriser le compte 4 avant le compte 1 laisse la porte principale ouverte.

**Étape 1 — La messagerie d'abord, toujours.** C'est la clé maîtresse : qui la contrôle peut réinitialiser tout le reste. Même si c'est un autre compte qui semble touché, commencez par vérifier la messagerie.

**Étape 2 — Changez le mot de passe ET déconnectez toutes les sessions.** Changer le mot de passe ne suffit pas : les sessions déjà ouvertes de l'attaquant restent valides. Cherchez « Se déconnecter de tous les appareils » (chaque grand service le propose dans ses paramètres de sécurité).

**Étape 3 — Inspectez les options de récupération et les règles.** Adresse de secours, numéro de téléphone : sont-ils bien les vôtres ? Règles de transfert et filtres : rien d'inconnu ? C'est ici que l'attaquant s'installe pour durer.

**Étape 4 — Activez la 2FA, puis traitez les comptes liés.** Double authentification sur le compte repris, puis changez le mot de passe de tous les comptes qui partageaient le même — et de ceux accessibles depuis la messagerie compromise.

**Étape 5 — Prévenez qui doit l'être.** Coordonnées bancaires exposées : opposition immédiate. Messages envoyés en votre nom : prévenez vos contacts (ne cliquez pas sur mes derniers messages). Et signalez : en France, [cybermalveillance.gouv.fr](https://www.cybermalveillance.gouv.fr) vous guide gratuitement selon votre situation.

---

## La dernière ligne de défense : la sauvegarde

Tout ce qui précède protège vos comptes. Reste vos **données** — photos, documents, travail — qu'un rançongiciel, un vol ou une simple panne peut faire disparaître. La règle simplifiée, dite **3-2-1** :

- **Deux copies en plus de l'original** : une dans un cloud de confiance (synchronisation automatique), une sur un disque externe.
- **Le disque externe reste déconnecté** en dehors des sauvegardes — un disque branché en permanence est chiffré par le rançongiciel en même temps que l'ordinateur.
- **Testez une restauration une fois par an.** Une sauvegarde jamais testée est un espoir, pas une sauvegarde.

Un fichier sauvegardé ne peut être ni pris en otage, ni perdu. C'est la mesure qui transforme le pire scénario en mauvais souvenir.

---

## Ce qui compte vraiment

**1. Sachez si vous avez fuité.** haveibeenpwned une fois, puis les alertes automatiques de votre gestionnaire. On ne réagit pas à ce qu'on ignore.

**2. En cas de compromission : messagerie d'abord, sessions déconnectées, règles vérifiées.** Les trois gestes que l'attaquant espère que vous oublierez.

**3. Sauvegardez en 3-2-1.** La seule protection qui fonctionne encore quand tout le reste a échoué.

---

## Une méthode simple à mettre en place

**Cette semaine :** passez votre adresse principale (et la secondaire) dans haveibeenpwned. Changez tout mot de passe fuité encore en service. Activez les alertes de fuite de votre gestionnaire.

**La semaine prochaine :** ouvrez les paramètres de sécurité de votre messagerie : appareils connectés (supprimez l'inconnu), options de récupération (vérifiez-les), règles de transfert (liste vide ou connue).

**Ce mois-ci :** mettez en place la sauvegarde 3-2-1 : synchronisation cloud + premier export sur disque externe, disque rangé débranché.

**Ce que « suffisamment bien » veut dire :**

- **Débutant** — vérification haveibeenpwned faite, mots de passe fuités changés, appareils connectés à la messagerie passés en revue
- **Intermédiaire** — alertes de fuite automatiques actives, protocole de reprise connu (la fiche est imprimée quelque part), sauvegarde cloud en place
- **Avancé** — sauvegarde 3-2-1 complète avec test de restauration annuel, revue périodique des journaux d'accès de vos comptes critiques

---

## Une note honnête

Il y a quelque chose de désagréable à découvrir son adresse dans six fuites de données — c'est pourtant le cas de la plupart des internautes de longue date, et ce n'est la faute d'aucun d'entre eux. La sécurité numérique n'est pas un état qu'on atteint : c'est la capacité à encaisser un incident sans qu'il devienne une catastrophe.

Avec des mots de passe uniques, une messagerie verrouillée et une sauvegarde testée, une fuite de données devient ce qu'elle devrait être : un e-mail d'information, pas une crise.

---

## Pour aller plus loin

📄 **[Téléchargez la fiche « Compte compromis : le protocole »](/fiches/domaformalis-fiche-04-compte-compromis-FR.pdf)** — les 5 étapes dans le bon ordre, à imprimer avant d'en avoir besoin.

📘 **[Recevez le guide complet « Internet & arnaques »](/fr/membres)** — notre guide détaillé, gratuit, envoyé par e-mail sur simple inscription.

Cet article clôt le parcours **Sécurité sur Internet** : [1. Éviter les arnaques](/fr/articles/eviter-les-arnaques-en-ligne) · [2. Reconnaître le phishing](/fr/articles/reconnaitre-un-email-de-phishing) · [3. Réduire son exposition](/fr/articles/proteger-sa-vie-privee-en-ligne) · 4. Réagir aux fuites — vous y êtes.
