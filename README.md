# SmartphoneShop — Hawala Smart Boutique

Projet d'apprentissage full stack : catalogue de smartphones et gestion des produits et stocks.

## Technologies

Angular 17, TypeScript, RxJS, formulaires réactifs, Bootstrap 5 ; Node.js, Express 5, API REST et MongoDB/Mongoose.

## Fonctionnalités

- Liste et fiche détaillée des smartphones.
- Ajout, modification et suppression via l'API REST.
- Recherche par nom et filtres par marque, prix et disponibilité.

## Démarrage local

Prérequis : Node.js et npm compatibles avec Angular 17, MongoDB local démarré sur le port 27017. La base utilisée est `smartphoneShop`.

À la racine :

```sh
npm ci
cd backend
npm ci
npm start
```

Dans un deuxième terminal, à la racine :

```sh
npm start -- --host 127.0.0.1 --port 4200
```

Ouvrir http://127.0.0.1:4200. L'API utilise http://localhost:3000/api/smartphones.
Une base vide affiche un catalogue vide ; les produits peuvent être ajoutés depuis l'interface. Aucune donnée MongoDB locale n'est incluse dans le dépôt.

## Vérification

```sh
npm run build
npm test -- --watch=false --browsers=ChromeHeadless
```

La compilation de production et le démarrage local ont été vérifiés le 19 octobre 2026. Les tests existants sont à remettre en état : le test du composant de détail importe encore `DetailComponent` au lieu de `SmartphoneDetailComponent`, et les tests générés doivent être adaptés à l'application.

## Limites et améliorations prévues

Prototype à utiliser en local : les opérations de gestion ne sont pas encore protégées par une authentification ou des rôles. La validation des champs et la gestion des erreurs restent à renforcer.

Les boutons panier, compte, newsletter et certains liens sont des éléments de maquette. Le panier, les commandes et le paiement ne sont pas implémentés. Les adresses de l'API et de MongoDB sont actuellement locales et doivent être configurées avant un déploiement.

## Auteur

[Yassine Ben Hawala](https://github.com/hawalayessin)
