import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  // El constructor recibe la "page" y la guarda; toda subclase debe pasarla.
  constructor(page: Page) {
    this.page = page;
  }

  // Navegación

  //Ruta de la página (subclases deben definirla).
  protected abstract readonly path: string;

  //Abre la página usando su propia ruta
  async open(): Promise<void> {
    await this.goto(this.path);
  }

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
}
