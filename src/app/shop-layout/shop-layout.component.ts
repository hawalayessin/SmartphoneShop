import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-shop-layout', standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './shop-layout.component.html', styleUrls: ['./shop-layout.component.css'],
})
export class ShopLayoutComponent {
  menuOpen = false;
  search = '';
  year = new Date().getFullYear();
  constructor(public cart: CartService, private router: Router) {}
  closeMenu() { this.menuOpen = false; }
  searchCatalogue() { this.closeMenu(); this.router.navigate(['/smartphones'], { queryParams: { q: this.search.trim() || null } }); }
}
