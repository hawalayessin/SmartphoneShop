import { Routes } from '@angular/router';
import { SmartphoneDashboardComponent } from './smartphone-dashboard/smartphone-dashboard.component';
import { SmartphoneDetailComponent } from './smartphone/detail/detail.component';
import { ShopLayoutComponent } from './shop-layout/shop-layout.component';
import { ShopPagesComponent } from './shop-pages/shop-pages.component';
export const routes: Routes = [
  { path: '', component: ShopLayoutComponent, children: [
    { path: '', component: SmartphoneDashboardComponent, title: 'SmartShop - Accueil', data: { home: true } },
    { path: 'smartphones', component: SmartphoneDashboardComponent, title: 'Smartphones - SmartShop' },
    { path: 'smartphones/:id', component: SmartphoneDetailComponent, title: 'Fiche produit - SmartShop' },
    { path: 'promotions', component: SmartphoneDashboardComponent, title: 'Promotions - SmartShop', data: { promotions: true } },
    { path: 'accessoires', component: ShopPagesComponent, title: 'Accessoires - SmartShop', data: { kind: 'accessories', title: 'Accessoires' } },
    { path: 'contact', component: ShopPagesComponent, title: 'Contact - SmartShop', data: { kind: 'contact', title: 'Contact' } },
    { path: 'panier', component: ShopPagesComponent, title: 'Panier - SmartShop', data: { kind: 'cart', title: 'Mon panier' } },
    { path: 'compte', component: ShopPagesComponent, title: 'Profil - SmartShop', data: { kind: 'profile', title: 'Mon profil de demonstration' } },
    { path: 'faq', component: ShopPagesComponent, title: 'FAQ - SmartShop', data: { kind: 'faq', title: 'Questions frequentes' } },
    { path: 'livraison', component: ShopPagesComponent, title: 'Livraison - SmartShop', data: { kind: 'info', title: 'Livraison', paragraphs: ['SmartShop est un projet de demonstration. Aucun produit physique ne peut etre commande ni expedie depuis ce site.', 'Le stock et les prix servent uniquement a illustrer le catalogue et le panier. Aucun frais de livraison ne sera facture.'] } },
    { path: 'retours', component: ShopPagesComponent, title: 'Retours - SmartShop', data: { kind: 'info', title: 'Retours', paragraphs: ['Aucun achat reel n\'est realise sur ce site ; il n\'existe donc pas de procedure de retour ou de remboursement.', 'Vous pouvez retirer un article ou vider votre panier de demonstration a tout moment. Pour une question sur le projet, utilisez la page Contact.'] } },
    { path: 'mentions-legales', component: ShopPagesComponent, title: 'Mentions - SmartShop', data: { kind: 'info', title: 'Mentions legales', paragraphs: ['Projet d\'apprentissage de Yassine Ben Hawala. Ce site presente une application Angular ; il ne constitue pas une boutique commerciale.', 'Le code source est disponible sur GitHub. Les marques et logos des exemples identifient leurs fabricants respectifs.'] } },
    { path: 'conditions', component: ShopPagesComponent, title: 'Conditions - SmartShop', data: { kind: 'info', title: 'Conditions de demonstration', paragraphs: ['Les donnees du catalogue, les prix, les promotions et le panier sont fictifs. Ils ne constituent pas une offre de vente.', 'Aucun paiement, contrat de vente ou compte authentifie ne peut etre cree. Ne saisissez aucune donnee sensible dans les formulaires.'] } },
    { path: 'confidentialite', component: ShopPagesComponent, title: 'Confidentialite - SmartShop', data: { kind: 'info', title: 'Confidentialite', paragraphs: ['La version de demonstration conserve son catalogue, son panier et son pseudo dans sessionStorage, sur votre navigateur. Elle ne les envoie pas a un backend SmartShop.', 'Les styles et icones sont charges depuis des CDN externes. Les liens GitHub, portfolio et messagerie ouvrent des services externes.', 'Le formulaire Contact prepare un lien mailto ; aucun message n\'est envoye automatiquement. Fermer l\'onglet termine la session de demonstration.'] } },
    { path: '**', component: ShopPagesComponent, title: 'Page introuvable - SmartShop', data: { kind: 'info', title: 'Page introuvable', paragraphs: ['Cette adresse ne correspond a aucune page SmartShop. Retrouvez les produits dans le catalogue.'] } },
  ] },
];
