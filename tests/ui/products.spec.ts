import { test, expect } from '@fixtures';

test.describe('[AE-01] Productos: listado, búsqueda, detalle y filtros (UI) @products', () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto('/products');
  });

  test('PRD-01: Ver el listado de productos', async ({ productsPage }) => {
    await test.step('Verificar titulo "All products"', async () => {
      //Verificar titulo "All products".
      await productsPage.expectVisible(productsPage.allProductsTitle);
    });

    await test.step('Verificar que hay al menos un producto', async () => {
      //Hay al menos un producto en el listado.
      await productsPage.expectVisible(productsPage.firstProductCard);
    });

    await test.step('Verificar que cada tarjeta muestra nombre y precio', async () => {
      //Cada tarjeta muestra nombre y precio.
      const cardsCount = await productsPage.productCards.count();
      expect(cardsCount).toBeGreaterThan(0);
      for (let i = 0; i < cardsCount; i++) {
        const card = productsPage.productCards.nth(i);
        await productsPage.expectVisible(productsPage.productName(card));
        await productsPage.expectVisible(productsPage.productPrice(card));
      }
    });
  });

  test('PRD-02: Buscar un producto existente', async ({ productsPage }) => {
    await test.step('Buscar un producto existente "dress"', async () => {
      //Buscar un producto existente "dress".
      await productsPage.searchProduct('dress');
    });

    await test.step('Verificar titulo "Searched Products"', async () => {
      //Titulo "Searched Products".
      await productsPage.expectVisible(productsPage.searchedProductsTitle);
    });

    await test.step('Verificar que hay al menos un producto', async () => {
      // Al menos un producto en el listado.
      await productsPage.expectVisible(productsPage.firstProductCard);
    });
  });

  test.skip('PRD-03: cambio de prueba, para verificar Jira y GitHub', async ({}) => {});
  test.skip('PRD-04:', async ({}) => {});
  test.skip('PRD-05:', async ({}) => {});
  test.skip('PRD-06:', async ({}) => {});
  test.skip('PRD-07:', async ({}) => {});
});

