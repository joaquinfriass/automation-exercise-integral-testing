import { Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  // El constructor recibe la "page" y la guarda; toda subclase debe pasarla.
  constructor(page: Page) {
    this.page = page;
  }

  // Navega a la ruta dada (relativa a la baseUrl).
  protected abstract readonly path: string;

  //Abre la página usando su propia ruta
  async open(): Promise<void> {
    await this.page.goto(this.path);
  }
}
