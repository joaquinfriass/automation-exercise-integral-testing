import { test, expect } from '@fixtures';

test.describe('[AE-01] Productos: listado, búsqueda, detalle y filtros (UI) @products', () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.open();
  });

  test('PRD-01: Ver el listado de productos', { tag: '@smoke' }, async ({ productsPage }) => {
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

  test('PRD-02: Buscar un producto existente', { tag: '@smoke' }, async ({ productsPage }) => {
    await test.step('Buscar un producto existente "dress"', async () => {
      //Buscar un producto existente "dress".
      await productsPage.searchProduct('dress');
    });

    await test.step('Verificar titulo "Searched Products"', async () => {
      //Titulo "Searched Products".
      await expect(productsPage.searchedProductsTitle).toBeVisible();
    });

    await test.step('Verificar que el primer resultado contenga la palabra "dress"', async () => {
      // Al menos un producto en el listado.
      await expect(productsPage.firstProductCard).toBeVisible();
      //Verificar que el primer resultado contenga la palabra "dress".
      await expect(productsPage.productName(productsPage.firstProductCard)).toContainText(/dress/i);
    });
  });

  test(
    'PRD-02b: Todos los resultados contienen el término buscado',
    { tag: '@regression', annotation: { type: 'issue', description: 'QE-58' } },
    async ({ productsPage }, testInfo) => {
      test.fail(
        true,
        'Falla porque el listado de productos no contiene todos los resultados con el término buscado',
      );
      await test.step('Buscar un producto existente "dress"', async () => {
        //Buscar un producto existente "dress".
        await productsPage.searchProduct('dress');
      });

      await test.step('Verificar titulo "Searched Products"', async () => {
        //Titulo "Searched Products".
        await expect(productsPage.searchedProductsTitle).toBeVisible();
      });

      await test.step('Verificar que los resultados contienen la palabra "dress"', async () => {
        // Al menos un producto en el listado.
        await expect(productsPage.firstProductCard).toBeVisible();
        //Verificar que los nombres de los productos contienen la palabra "dress".
        const productNames = await productsPage.getAllProductNames();
        const mismatches = productNames.filter((name) => !/dress/i.test(name));

        if (mismatches.length > 0) {
          // Adjuntar al reporte la lista de productos que no coinciden con la búsqueda.
          await testInfo.attach('productos-no-coincidentes.txt', {
            body: mismatches.map((name) => `- ${name}`).join('\n'),
            contentType: 'text/plain',
          });
          // Adjuntar una captura de pantalla de la página en el momento del error.
          await testInfo.attach('captura-error.png', {
            body: await productsPage.screenshot(),
            contentType: 'image/png',
          });
        }

        expect(
          mismatches,
          `Productos que no contienen "dress" (${mismatches.length}): ${mismatches.join(', ')}`,
        ).toEqual([]);
      });
    },
  );
});
