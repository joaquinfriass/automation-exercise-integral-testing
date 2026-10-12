import { test, expect } from '@playwright/test';

test('la home carga', { tag: '@smoke' }, async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Automation Exercise/);
});
