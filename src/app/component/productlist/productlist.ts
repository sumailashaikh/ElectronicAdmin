import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Removed: import { Signal } from '@angular/core';

interface Item {
  id: number;
  name: string;
  category: 'Mobile' | 'Laptop' | 'Accessory';
  price: number;
  inStock: boolean;
  description: string;
}
@Component({
  selector: 'app-productlist',
  standalone: true, // Added for modern Angular setup
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './productlist.html',
  styleUrl: './productlist.css',
})
export class Productlist {
 // Sample Data
  private items = signal<Item[]>([
    { id: 1, name: 'Smartphone X', category: 'Mobile', price: 45000, inStock: true, description: 'A high-end smartphone with advanced features.' },
    { id: 2, name: 'Gaming Laptop', category: 'Laptop', price: 120000, inStock: false, description: 'Powerful laptop for serious gamers.' },
    { id: 3, name: 'Wireless Earbuds', category: 'Accessory', price: 8999, inStock: true, description: 'Noise-cancelling earbuds with great battery life.' },
    { id: 4, name: 'Smartwatch', category: 'Accessory', price: 15000, inStock: true, description: 'Fitness tracker and notification hub.' },
    { id: 5, name: 'Ultrabook Z', category: 'Laptop', price: 85000, inStock: true, description: 'Thin and light laptop for professionals.' },
    { id: 6, name: 'Budget Phone', category: 'Mobile', price: 12000, inStock: true, description: 'An affordable smartphone with essential features.' },
    { id: 7, name: 'Portable Charger', category: 'Accessory', price: 2500, inStock: false, description: '10000mAh power bank.' },
  ]);

  // Filters state
  filterCategory = signal<string>('All');
  filterInStock = signal<boolean|null>(null);

  // Computed signal for filtered items (reactive filtering)
  filteredItems = computed(() => {
    // This is the core logic: if filterCategory is 'All', it's always true.
    // Otherwise, it checks for an exact match.
    return this.items().filter(item => {
      const categoryMatch = this.filterCategory() === 'All' || item.category === this.filterCategory();
      const stockMatch = this.filterInStock() === null || item.inStock === this.filterInStock();
      return categoryMatch && stockMatch;
    });
  });

  // Categories list for the dropdown
  categories = ['All', 'Mobile', 'Laptop', 'Accessory'];

  // Detail view state
  selectedItem: WritableSignal<Item | null> = signal(null);
  showDetailsPopup = signal(false);

  // Filter handlers
  /**
    * CORRECTED: ngModelChange passes the new value directly, not an event object.
    */
  onCategoryChange(value: string): void {
    this.filterCategory.set(value);
    this.selectedItem.set(null); // Clear details when filtering
  }

  onStockChange(status: boolean | null): void {
    this.filterInStock.set(status);
  }

  // New toggleStock method required for the table toggle buttons (from previous answer)
  toggleStock(itemToToggle: Item): void {
    this.items.update(currentItems =>
      currentItems.map(item =>
        item.id === itemToToggle.id ? { ...item, inStock: !item.inStock } : item
      )
    );

    // If the currently selected item is the one being updated,
    // explicitly update the selectedItem signal to trigger a re-render of the modal.
    if (this.selectedItem()?.id === itemToToggle.id) {
      // Find the updated item in the main list
      const updatedItem = this.items().find(i => i.id === itemToToggle.id) || null;
      this.selectedItem.set(updatedItem);
    }
  }

  // Function to show details popup
  viewDetails(item: Item): void {
    this.selectedItem.set(item);
    this.showDetailsPopup.set(true);
  }

  // Function to close details popup
  closeDetails(): void {
    this.showDetailsPopup.set(false);
    // Optional: clear selected item when closed
    // this.selectedItem.set(null);
  }

  // Your filter logic (assuming you have this)
  thisfilteredItems = this.items; // Placeholder for your actual filtering logic
}