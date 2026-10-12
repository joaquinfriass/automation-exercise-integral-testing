import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  protected readonly path: string = '/products';

  constructor(page: Page) {
    super(page);
  }

  readonly allProductsTitle: Locator = this.page.getByRole('heading', { name: 'All Products' });
  readonly searchedProductsTitle: Locator = this.page.getByRole('heading', {
    name: 'Searched Products',
  });
  readonly searchInput: Locator = this.page.getByRole('textbox', { name: 'Search Product' });
  readonly searchButton: Locator = this.page
    .getByRole('button')
    .and(this.page.locator('#submit_search'));

  // Todas las tarjetas de producto del listado.
  readonly productCards: Locator = this.page.locator('.product-image-wrapper');
  // Solo la primera (para chequeos puntuales, ej. "hay al menos un producto").
  readonly firstProductCard: Locator = this.productCards.first();

  // Nombre y precio del producto dentro de una tarjeta dada (ej. firstProductCard, o productCards.nth(i)).
  productName(card: Locator): Locator {
    return card.locator('.productinfo p');
  }

  productPrice(card: Locator): Locator {
    return card.locator('.productinfo h2');
  }

  // ProductsPage.ts
  async searchProduct(text: string): Promise<void> {
    await this.fill(this.searchInput, text);
    await this.click(this.searchButton);
  }
}
