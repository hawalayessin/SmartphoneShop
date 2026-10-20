import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartService } from '../shared/cart.service';
import accessories from '../../assets/data/accessoires.json';

@Component({
  selector: 'app-shop-page', standalone: true, imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './shop-pages.component.html', styleUrls: ['./shop-pages.component.css'],
})
export class ShopPagesComponent {
  kind = ''; title = ''; paragraphs: string[] = [];
  accessories = accessories;
  nickname = ''; profileStatus = ''; subject = ''; message = '';
  constructor(route: ActivatedRoute, public cart: CartService) {
    route.data.pipe(takeUntilDestroyed()).subscribe(data => { this.kind = data['kind']; this.title = data['title']; this.paragraphs = data['paragraphs'] || []; });
    try { this.nickname = sessionStorage.getItem('smartshop:profile') || ''; } catch { /* Local profile is optional. */ }
  }
  saveProfile() {
    const nickname = this.nickname.trim().slice(0, 60);
    if (!nickname) { this.profileStatus = 'Indiquez un pseudo.'; return; }
    try { sessionStorage.setItem('smartshop:profile', nickname); this.profileStatus = 'Profil enregistre dans cet onglet.'; }
    catch { this.profileStatus = 'Stockage navigateur indisponible.'; }
  }
  get contactHref() { return `mailto:hawalayessin@gmail.com?subject=${encodeURIComponent('SmartShop - ' + this.subject)}&body=${encodeURIComponent(this.message)}`; }
}
