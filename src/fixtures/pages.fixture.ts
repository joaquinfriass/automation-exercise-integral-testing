// "test" base de Playwright, renombrado a "base" para extenderlo.
import { test as base } from '@playwright/test';

// Page Object a inyectar como fixture.
import { ProductsPage } from '@pages/ProductsPage';

// Tipo que declara las fixtures nuevas y sus tipos.
type Pages = {
  productsPage: ProductsPage;
};

// Crea un "test" nuevo = el de Playwright + nuestras fixtures.
export const test = base.extend<Pages>({
  // Fixture "productsPage": recibe "page" y entrega "use".
  productsPage: async ({ page }, use) => {
    // Setup: instancia la Page Object con la página actual.
    const productsPage = new ProductsPage(page);

    // Entrega el valor al test (lo de después sería teardown).
    await use(productsPage);
  },
});

// Reexporta "expect" para importar todo desde un solo lugar.
export { expect } from '@playwright/test';
