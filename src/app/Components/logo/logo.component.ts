import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
})
export class LogoComponent {}
