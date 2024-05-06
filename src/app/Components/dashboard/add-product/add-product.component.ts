import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { CategoryDashboardService } from '../../../Services/category-dashboard.service';
import { ICategory } from '../../../models/icategory';
import { IType } from '../../../models/itype';
import { TypeDashboardService } from '../../../Services/type-dashboard.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductDashboardService } from '../../../Services/product-dashboard.service';
import { ProductRules } from '../../../Rules/Product.Rules';
import { IProduct } from '../../../models/iproduct';
import { IproductEdit } from '../../../models/iproduct-edit';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  product?: IproductEdit;
  // = {
  //   name: '',
  //   typeId: 0,
  //   categoryId: 0,
  //   description: '',
  //   price: 0,
  //   sale: 0,
  //   stock: 0,
  //   image: '/assets/images/product-default-image.jpg',
  // };
  productId: number = 0;
  categories: ICategory[] = [];
  types: IType[] = [];
  showImageRequiredError: boolean = false;
  constructor(
    private categoryService: CategoryDashboardService,
    private typeService: TypeDashboardService,
    private productService: ProductDashboardService,
    public rules: ProductRules,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => (this.productId = params['id']),
    });
    this.categoryService.getAll().subscribe({
      next: (data) => (this.categories = data),
    });
    this.typeService.getAll().subscribe({
      next: (data) => (this.types = data),
    });
    if (this.productId != 0) {
      this.productService.getById(this.productId).subscribe({
        next: (prod) => {
          this.product = prod;
          this.name.setValue(this.product.name);
          this.description.setValue(this.product.description);
          this.categoryId.setValue(this.product.categoryId);
          this.typeId.setValue(this.product.categoryId);
          this.price.setValue(this.product.price);
          this.sale.setValue(
            this.product.sale == null ? null : this.product.sale
          );
          this.stock.setValue(this.product.stock);
          this.imageSrc = this.product.image;
          console.log(this.imageSrc);
          console.log(this.product.image);
        },
      });
    }
  }

  formGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(this.rules.nameMinLength),
      Validators.maxLength(this.rules.nameMaxLength),
    ]),
    typeId: new FormControl(0, [Validators.required, Validators.min(1)]),
    categoryId: new FormControl(0, [Validators.required, Validators.min(1)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(this.rules.descriptionMinLength),
      Validators.maxLength(this.rules.descriptionMaxLength),
    ]),
    price: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(99999),
    ]),
    sale: new FormControl(0, [Validators.min(1), Validators.max(99999)]),
    stock: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(99999),
    ]),
    image: new FormControl('', [Validators.required]),
  });
  selectedFile: File | null = null;

  get name() {
    return this.formGroup.controls.name;
  }
  get description() {
    return this.formGroup.controls.description;
  }
  get typeId() {
    return this.formGroup.controls.typeId;
  }
  get categoryId() {
    return this.formGroup.controls.categoryId;
  }
  get sale() {
    return this.formGroup.controls.sale;
  }
  get price() {
    return this.formGroup.controls.price;
  }
  get stock() {
    return this.formGroup.controls.stock;
  }
  get image() {
    return this.formGroup.controls.image;
  }
  PostProduct() {
    if (this.formGroup.valid && this.selectedFile) {
      this.showImageRequiredError = false;
      var product = {
        name: this.name.value,
        typeId: this.typeId.value,
        categoryId: this.categoryId.value,
        description: this.description.value,
        price: this.price.value,
        sale: this.sale.value,
        stock: this.stock.value,
      };
      this.productService.add(product, this.selectedFile).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/dashboard/allproducts']);
        },
        error: (error) => {
          console.log('error adding product:', error);
        },
      });
    } else {
      this.formGroup.markAllAsTouched();
      this.showImageRequiredError = true;
      console.log('not valid');
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  clearForm() {
    this.showImageRequiredError = false;

    this.formGroup.reset({
      name: '',
      typeId: null,
      categoryId: null,
      description: '',
      price: null,
      stock: null,
      sale: null,
    });
    this.selectedFile = null;
    // this.productForm.resetForm(); // Reset the form after successful submission
  }

  imageSrc?: string | ArrayBuffer | null;

  onImgSelected(event: Event): void {
    const element = event.target as HTMLInputElement;

    // Check if `files` property exists and has at least one file
    if (element.files && element.files.length > 0) {
      const file = element.files[0];

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        // Safely assert that `e.target` is not null with an if-check
        if (e.target) {
          this.imageSrc = e.target.result; // This is the base64 encoded string
        }
      };

      reader.readAsDataURL(file); // Read the file as a data URL (base64 string)
    }
  }
  deleteSelectedImage() {
    this.showImageRequiredError = false;
    this.selectedFile = null;
    this.imageSrc = null;
    this.image.setValue('');
  }
}
