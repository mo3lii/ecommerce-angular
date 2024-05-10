import { CommonModule } from '@angular/common';
import { CategoryDashboardService } from './../../../Services/category-dashboard.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CategoryRules } from '../../../Rules/Category.Rules';
import { ICategory } from '../../../models/icategory';
import { TruncatePipe } from '../../../Pipes/truncate.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-table',
  standalone: true,
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    TruncatePipe,
  ],
})
export class CategoryTableComponent implements OnInit {
  categoryList: ICategory[] = [];

  currentCategory?: ICategory;
  constructor(
    private apiService: CategoryDashboardService,
    public rules: CategoryRules
  ) {}
  ngOnInit(): void {
    this.showAll();
  }

  categoryForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });
  get name() {
    return this.categoryForm.controls.name;
  }
  get description() {
    return this.categoryForm.controls.description;
  }
  handleCategory() {
    if (this.currentCategory) {
      console.log('right place :', this.currentCategory);

      this.apiService
        .update(this.currentCategory.id, {
          name: this.name.value,
          description: this.description.value,
        })
        .subscribe({
          next: () => {
            this.showAll();
          },
        });
    } else {
      if (this.categoryForm.valid) {
        var newCategory: any = {
          name: this.name.value,
          description: this.description.value,
        };
        this.apiService.add(newCategory).subscribe({
          next: (data) => {
            console.log(data);
            this.showAll();
            this.clearForm();
          },
        });
      }
    }
  }
  clearForm() {
    this.name.setValue('');
    this.description.setValue('');
  }
  discardChanges() {
    this.currentCategory = undefined;
    this.clearForm();
  }
  onRowSelected(category: ICategory) {
    this.currentCategory = category;
    this.name.setValue(category.name);
    this.description.setValue(category.description);
  }
  showAll() {
    this.apiService.getAll().subscribe({
      next: (data) => (this.categoryList = data),
    });
  }
  onDeleteCategory(category: ICategory) {
    if (category.productsCount > 0) {
      Swal.fire({
        icon: 'error',
        text: `You can't delete category with related products !`,
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.delete(category.id).subscribe({
            next: () => this.showAll(),
          });
        }
      });
    }
  }
}
