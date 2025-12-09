import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
interface Product {
  name: string;
  category: string;
  price: number;
  status: 'Available' | 'Out of Stock'; // Using a union type for specific statuses
  viewDetails: string;
}
@Component({
  selector: 'app-add-product-page',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product-page.html',
  styleUrl: './add-product-page.css',
})
export class AddProductPage {
 productForm!: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]], // Price greater than 0
      status: ['Available', Validators.required],
      viewDetails: ['']
    });
  }

  // Helper getter for easy access to form controls in the template
  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.productForm.invalid) {
      console.log('Form is invalid. Cannot submit.');
      return;
    }

    const newProduct: Product = this.productForm.value;
    console.log('Product Added:', newProduct);
    // Here you would typically send the data to a backend service
    alert('Product added successfully!');
    this.productForm.reset({ status: 'Available' }); // Reset form, keeping default status
    this.isSubmitted = false;
  }
}
