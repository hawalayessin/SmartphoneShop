import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../shared/api.service';
import { SmartphoneModel } from './smartphone.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-smartphone-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink, FormsModule],
  templateUrl: './smartphone-dashboard.component.html',
  styleUrls: ['./smartphone-dashboard.component.css'],
  providers: [ApiService],
})
export class SmartphoneDashboardComponent implements OnInit {
  formValue!: FormGroup;
  smartphoneModelObj: SmartphoneModel = new SmartphoneModel();
  smartphoneData: any[] = [];
  filteredSmartphones: any[] = [];
  showAdd: boolean = false;
  showUpdate: boolean = false;

  // Filtres
  searchTerm: string = '';
  selectedBrand: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  availableOnly: boolean = false;
  readonly isDemo = this.api.isDemo;
  get brands() { return [...new Set(this.smartphoneData.map(row => row.marque))].sort(); }
  resetDemo() { this.api.resetDemo(); this.resetFilters(); this.getAllSmartphones(); }

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nomTel: ['', [Validators.required, Validators.maxLength(100)]],
      marque: ['', [Validators.required, Validators.maxLength(100)]],
      caracteristiques: [''],
      prix: ['', [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
      imageUrl: [''],
    });
    this.getAllSmartphones();
  }

  clickAddSmartphone() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  // Get all smartphones
  getAllSmartphones() {
    this.api.getAllSmartphones().subscribe((res) => {
      this.smartphoneData = res;
      this.applyFilters();
    });
  }

  // Add a new smartphone
  addSmartphone() {
    if (this.formValue.invalid) return;
    const newSmartphone = {
      nomTel: this.formValue.value.nomTel || '',
      marque: this.formValue.value.marque || '',
      caracteristiques: this.formValue.value.caracteristiques || '',
      prix: Number(this.formValue.value.prix) || 0,
      stock: Number(this.formValue.value.stock) || 0,
      imageUrl: this.formValue.value.imageUrl || '',
    };

    this.api.addSmartphone(newSmartphone).subscribe(
      (res) => {
        alert('Smartphone ajouté avec succès');
        this.formValue.reset();
        this.getAllSmartphones();
        document.getElementById('closeModal')?.click();
      },
      (error) => alert(error.message || "Une erreur s'est produite")
    );
  }

  // Delete a smartphone
  deleteSmartphone(id: string) {
    this.api.deleteSmartphone(id).subscribe(() => {
      alert('Smartphone supprimé avec succès');
      document.getElementById('closeModal')?.click();
      this.getAllSmartphones();
    });
  }

  // Open edit form
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.smartphoneModelObj.id = row._id;
    this.formValue.patchValue(row);
  }

  // Update smartphone
  updateSmartphone() {
    if (this.formValue.invalid) return;
    const updatedSmartphone = {
      nomTel: this.formValue.value.nomTel || '',
      marque: this.formValue.value.marque || '',
      caracteristiques: this.formValue.value.caracteristiques || '',
      prix: Number(this.formValue.value.prix) || 0,
      stock: Number(this.formValue.value.stock) || 0,
      imageUrl: this.formValue.value.imageUrl || '',
    };

    this.api
      .updateSmartphone(updatedSmartphone, this.smartphoneModelObj.id)
      .subscribe({ next: () => {
        alert('Smartphone mis à jour avec succès');
        this.formValue.reset();
        this.getAllSmartphones();
        document.getElementById('closeModal')?.click();
      }, error: error => alert(error.message || 'Modification impossible.') });
  }

  // Définir la plage de prix à partir du sélecteur
  setPriceRange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    if (value === '') {
      this.minPrice = null;
      this.maxPrice = null;
    } else if (value === '0-300') {
      this.minPrice = 0;
      this.maxPrice = 300;
    } else if (value === '300-600') {
      this.minPrice = 300;
      this.maxPrice = 600;
    } else if (value === '600-900') {
      this.minPrice = 600;
      this.maxPrice = 900;
    } else if (value === '900+') {
      this.minPrice = 900;
      this.maxPrice = null; // Pas de maximum
    }
  }

  // Rechercher ou filtrer les smartphones
  applyFilters() {
    this.filteredSmartphones = this.smartphoneData.filter((smartphone) => {
      // Filtre par nom (recherche)
      const matchesSearch = this.searchTerm ?
        smartphone.nomTel.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;

      // Filtre par marque
      const matchesBrand = this.selectedBrand ?
        smartphone.marque === this.selectedBrand : true;

      // Filtre par prix
      let matchesPrice = true;
      if (this.minPrice !== null) {
        matchesPrice = smartphone.prix >= this.minPrice;
      }
      if (this.maxPrice !== null) {
        matchesPrice = matchesPrice && smartphone.prix <= this.maxPrice;
      }

      // Filtre par disponibilité (stock > 0)
      const matchesStock = this.availableOnly ?
        smartphone.stock > 0 : true;

      return matchesSearch && matchesBrand && matchesPrice && matchesStock;
    });
  }

  // Réinitialiser les filtres
  resetFilters() {
    this.searchTerm = '';
    this.selectedBrand = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.availableOnly = false;
    this.filteredSmartphones = [...this.smartphoneData];
  }
}
