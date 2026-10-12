import { test, expect } from '@fixtures';

test.describe('[AE-01] Productos: listado, búsqueda, detalle y filtros (UI) @products', () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.open();
  });

  test('PRD-01: Ver el listado de productos', {tag: '@smoke'}, async ({ productsPage }) => {
    await test.step('Verificar titulo "All products"', async () => {
      //Verificar titulo "All products".
      await expect(productsPage.allProductsTitle).toBeVisible();
    });

    await test.step('Verificar que hay al menos un producto', async () => {
      //Hay al menos un producto en el listado.
      await expect(productsPage.firstProductCard).toBeVisible();
    });

    await test.step('Verificar que cada tarjeta muestra nombre y precio', async () => {
      //Cada tarjeta muestra nombre y precio.
      const cardsCount = await productsPage.productCards.count();
      expect(cardsCount).toBeGreaterThan(0);
      for (let i = 0; i < cardsCount; i++) {
        const card = productsPage.productCards.nth(i);
        await expect(productsPage.productName(card)).toBeVisible();
        await expect(productsPage.productPrice(card)).toBeVisible();
      }
    });
  });

  test('PRD-02: Buscar un producto existente', {tag: '@smoke'}, async ({ productsPage }) => {
    await test.step('Buscar un producto existente "dress"', async () => {
      //Buscar un producto existente "dress".
      await productsPage.searchProduct('dress');
    });

    await test.step('Verificar titulo "Searched Products"', async () => {
      //Titulo "Searched Products".
      await expect(productsPage.searchedProductsTitle).toBeVisible();
    });

    await test.step('Verificar que hay al menos un producto', async () => {
      // Al menos un producto en el listado.
      await expect(productsPage.firstProductCard).toBeVisible();
    });
  });
});
