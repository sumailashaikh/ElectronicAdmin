// product.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';

interface Item {
    id: number;
    name: string;
    category: 'Mobile' | 'Laptop' | 'Accessory' | string; // Added string for flexibility
    price: number;
    inStock: boolean;
    description: string;
}

@Injectable({
    providedIn: 'root'
})
export class product {
    // 1. Central Signal to hold ALL products
    private products: WritableSignal<Item[]> = signal([
        { id: 1, name: 'Smartphone X', category: 'Mobile', price: 45000, inStock: true, description: 'A high-end smartphone with advanced features.' },
        { id: 2, name: 'Gaming Laptop', category: 'Laptop', price: 120000, inStock: false, description: 'Powerful laptop for serious gamers.' },
        { id: 3, name: 'Wireless Earbuds', category: 'Accessory', price: 8999, inStock: true, description: 'Noise-cancelling earbuds with great battery life.' },
        { id: 4, name: 'Smartwatch', category: 'Accessory', price: 15000, inStock: true, description: 'Fitness tracker and notification hub.' },
        { id: 5, name: 'Ultrabook Z', category: 'Laptop', price: 85000, inStock: true, description: 'Thin and light laptop for professionals.' },
        { id: 6, name: 'Budget Phone', category: 'Mobile', price: 12000, inStock: true, description: 'An affordable smartphone with essential features.' },
        { id: 7, name: 'Portable Charger', category: 'Accessory', price: 2500, inStock: false, description: '10000mAh power bank.' },
    ]);

    // Expose the signal as read-only for components to subscribe to
    public readonly products$ = this.products.asReadonly();
    
    // Internal counter for generating unique IDs
    private nextId = this.products().length + 1;

    /**
     * Adds a new product to the list. Called by AddProductPage.
     * @param newProduct The product data to add.
     */
    addProduct(newProduct: any): void {
        const productToAdd: Item = {
            ...newProduct,
            id: this.nextId++,
            // Map the form status text to the boolean 'inStock' field
            inStock: newProduct.status === 'Available',
            description: newProduct.viewDetails || ''
        };
        
        // Use the signal update method to trigger reactivity
        this.products.update(currentProducts => [...currentProducts, productToAdd]);
    }

    /**
     * Toggles the inStock status. Called by Productlist.
     * @param id The ID of the item to toggle.
     */
    toggleStock(id: number): void {
        this.products.update(currentProducts => 
            currentProducts.map(item =>
                item.id === id ? { ...item, inStock: !item.inStock } : item
            )
        );
    }
}