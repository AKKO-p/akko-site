---
title: "Qu'est-ce qu'une plateforme data souveraine ?"
description: "Une définition concrète, cinq critères vérifiables (hébergement, clés, modèles, sortie, réversibilité) et une grille d'auto-évaluation pour situer votre organisation."
category: "Souveraineté"
date: 2026-08-15
minutes: 9
author: "Équipe AKKO"
---

**Une plateforme data souveraine est une plateforme que votre organisation héberge et gouverne
elle-même : les données, les traitements, les modèles d'IA et les clés de chiffrement restent
dans un périmètre que vous contrôlez.** Le terme est devenu un argument commercial ; cet
article propose des critères vérifiables pour l'évaluer, quel que soit le fournisseur.

## Cinq critères vérifiables

- **L'hébergement.** La plateforme tourne-t-elle sur une infrastructure que vous choisissez, y
  compris sans accès internet ? Une offre « souveraine » qui exige une connexion permanente au
  fournisseur ne l'est pas.
- **Les clés.** Qui détient les clés de chiffrement et les secrets ? Si la réponse est « le
  fournisseur », le contrôle est délégué, pas exercé.
- **Les modèles d'IA.** Où s'exécutent-ils, et que reçoivent-ils ? Un assistant qui envoie vos
  prompts à une API externe fait sortir de la donnée, même « anonymisée ».
- **La sortie.** Quelles données quittent le périmètre en fonctionnement normal : télémétrie,
  licences, mises à jour ? La réponse doit être écrite et vérifiable.
- **La réversibilité.** Le jour où vous partez, que reste-t-il ? Des formats ouverts (tables
  Apache Iceberg, SQL standard) rendent la sortie réelle plutôt que théorique.

> Point de repère : le format de table Apache Iceberg est lu nativement par plus de **10
> moteurs de requête** du marché. La réversibilité d'un lakehouse ouvert n'est pas un argument,
> c'est une propriété mesurable.

## Souverain ne veut pas dire isolé

Une plateforme souveraine n'interdit pas le cloud : elle exige que le choix reste le vôtre. Un
cluster Kubernetes chez un hébergeur qualifié, dans votre datacenter ou sur un poste
d'expérimentation relèvent du même modèle d'exploitation. Ce qui compte est que le fournisseur
de la plateforme n'ait besoin d'aucun accès à votre environnement.

## La grille d'auto-évaluation

Pour chaque critère, trois réponses possibles : contrôle exercé, contrôle délégué, contrôle
absent. Une plateforme mérite le mot « souveraine » quand les cinq critères sont en contrôle
exercé. C'est la grille que nous appliquons à AKKO, et celle que nous recommandons d'appliquer
à toute offre, la nôtre comprise.

## Sources et références

1. [Spécification du format de table Apache Iceberg](https://iceberg.apache.org/spec/)
2. [Référentiel SecNumCloud, ANSSI](https://cyber.gouv.fr/produits-services-qualifies)
3. [Documentation AKKO : installation](https://docs.akko-ai.com/install/client-install/)
