import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-smartphone-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class SmartphoneDetailComponent implements OnInit {
  smartphone: any;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private ApiService: ApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID depuis l'URL
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadSmartphoneDetails(id);
      } else {
        this.error = 'ID de smartphone non trouvé';
        this.loading = false;
      }
    });
  }

  loadSmartphoneDetails(id: string): void {
    this.ApiService.getSmartphoneById(id).subscribe({
      next: (data) => {
        this.smartphone = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des détails', err);
        this.error = 'Impossible de charger les détails du smartphone';
        this.loading = false;
      },
    });
  }
  goBack(): void {
    this.location.back();
  }
}
