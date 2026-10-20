# SmartShop - Catalogue Angular

[Demo publique](https://smartshop-angular-demo.vercel.app) | [Portfolio](https://portfoliohawala.vercel.app/project)

## Demo Vercel

`npm ci` puis `npm run start:demo` ouvre http://127.0.0.1:5183.
`npm run build:demo` produit `dist/smartphone-shop/browser`.

La demo conserve le catalogue Angular et ses formulaires, avec un header, une
banniere et un footer revus. La navigation est partagee entre les pages. Elle utilise les
produits fictifs du fichier `src/assets/data/smartphones.json` et `sessionStorage` : chaque onglet
conserve ses modifications, sans base partagee, compte, paiement ou commande.
Les prix sont illustratifs ; les visuels des exemples sont les logos fabricants.
Fermer l'onglet termine la session d'exemple. Ne pas saisir de donnees sensibles.

Le mode standard (`npm start`) conserve l'API Express/MongoDB existante a
`http://localhost:3000/api/smartphones`. La demo publique ne lance pas ce backend.
Configuration dans `src/environments/` ; Vercel utilise la configuration `demo`.

Tests du stockage de demonstration :
`npm test -- --watch=false --browsers=ChromeHeadless --include=src/app/shared/demo-catalog.spec.ts`.

Tests complets (16 tests : routes, panier, catalogue et composants) :
`npm test -- --watch=false --browsers=ChromeHeadless`.

## Navigation

Accueil `/`, catalogue `/smartphones`, fiche `/smartphones/:id`, accessoires
`/accessoires`, offres fictives `/promotions`, panier `/panier`, profil local
`/compte`, contact `/contact`, FAQ `/faq`, livraison `/livraison`, retours
`/retours`, mentions `/mentions-legales`, conditions `/conditions` et
confidentialite `/confidentialite`. Une adresse inconnue affiche une page dediee.
Les routes sont accessibles directement et apres rechargement sur Vercel.

Le panier calcule les quantites et totaux et respecte les stocks d'exemple.
Le profil ne cree pas de compte authentifie. Contact prepare un lien `mailto` :
le site n'envoie pas de courriel. Aucun paiement, commande ou livraison reels.
Les accessoires sont dans `src/assets/data/accessoires.json` ; les anciens prix
fictifs des promotions sont dans `src/assets/data/smartphones.json`.

---

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

La compilation de la demo, les 16 tests et les parcours navigateur
(routes, CRUD, filtres, panier, fiches, rechargement et mobile) ont ete verifies
le 20 octobre 2026.

## Limites et améliorations prévues

Le backend local reste un prototype : les operations de gestion ne sont pas
protegees par une authentification ou des roles. Ne pas l'exposer publiquement
sans renforcer sa securite. La demo Vercel ne contacte pas ce backend.

Le panier est une simulation locale. Aucun paiement ou commande reelle n'est
implemente. Les anciens liens factices et la newsletter ont ete remplaces par
des pages fonctionnelles et des liens vers le projet.
Le stockage des donnees fictives valide les champs obligatoires, le prix positif,
le stock entier et les protocoles des images ; limite de 100 produits par onglet.

## Auteur

[Yassine Ben Hawala](https://github.com/hawalayessin)
