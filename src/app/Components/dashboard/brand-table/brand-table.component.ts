import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TruncatePipe } from '../../../Pipes/truncate.pipe';
import { IType } from '../../../models/itype';
import { TypeDashboardService } from '../../../Services/type-dashboard.service';
import { CategoryRules } from '../../../Rules/Category.Rules';
import { BrandsDashboardService } from '../../../Services/brands-dashboard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    TruncatePipe,
  ],
  templateUrl: './brand-table.component.html',
  styleUrl: './brand-table.component.css',
})
export class BrandTableComponent {
  typeList: IType[] = [];

  currentType?: IType;
  constructor(
    private apiService: BrandsDashboardService,
    public rules: CategoryRules
  ) {}
  ngOnInit(): void {
    this.showAll();
  }

  typeForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(this.rules.nameMinLength),
      Validators.maxLength(this.rules.nameMaxLength),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(this.rules.descriptionMinLength),
      Validators.maxLength(this.rules.descriptionMaxLength),
    ]),
  });

  get name() {
    return this.typeForm.controls.name;
  }
  get description() {
    return this.typeForm.controls.description;
  }

  handleType() {
    if (this.currentType) {
      console.log('right place :', this.currentType);

      this.apiService
        .update(this.currentType.id, {
          name: this.name.value,
          description: this.description.value,
        })
        .subscribe({
          next: () => {
            this.showAll();
            this.currentType = undefined;
            this.clearForm();
          },
        });
    } else {
      if (this.typeForm.valid) {
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
    this.typeForm.reset();
  }
  discardChanges() {
    this.currentType = undefined;
    this.clearForm();
  }
  onRowSelected(category: IType) {
    this.currentType = category;
    this.name.setValue(category.name);
    this.description.setValue(category.description);
  }
  showAll() {
    this.apiService.getAll().subscribe({
      next: (data) => (this.typeList = data),
    });
  }

  onDeleteCategory(type: IType) {
    if (type.productsCount > 0) {
      Swal.fire({
        icon: 'error',
        text: `You can't delete Brand with related products !`,
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
          this.apiService.delete(type.id).subscribe({
            next: () => this.showAll(),
          });
        }
      });
    }
  }
}
