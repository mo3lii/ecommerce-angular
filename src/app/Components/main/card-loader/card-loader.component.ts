import { Component, Input, OnInit } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-card-loader',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './card-loader.component.html',
  styleUrl: './card-loader.component.css',
})
export class CardLoaderComponent {}
