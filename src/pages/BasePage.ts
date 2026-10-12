// pages/BasePage.ts
import { Page, Locator, expect } from '@playwright/test';

// Clase abstracta: no se instancia directamente, solo se extiende (ej. ProductsPage).
export abstract class BasePage {
  // Guarda la página de Playwright para que los métodos de abajo la usen.
  protected readonly page: Page;

  // El constructor recibe la "page" y la guarda; toda subclase debe pasarla.
  constructor(page: Page) {
    this.page = page;
  }

  // Navegación

  // Navega a una ruta (por defecto la raíz "/").
  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  // Devuelve el título de la pestaña actual.
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  // Acciones comunes

  // Espera a que el elemento esté visible y hace click (protected = solo usable por subclases).
  protected async click(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  // Espera a que el elemento esté visible y escribe texto en él.
  protected async fill(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }

  // Devuelve el texto del elemento, sin espacios sobrantes (o '' si es null).
  protected async getText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() ?? '';
  }

  // Validaciones comunes

  // Aserción: la URL actual debe contener el fragmento indicado (vía regex).
  async expectUrlContains(fragment: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(fragment));
  }

  // Aserción: el elemento debe estar visible.
  async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
}
