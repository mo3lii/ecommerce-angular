import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from '../../logo/logo.component';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LogoComponent],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css',
})
export class AdminSidebarComponent {}
