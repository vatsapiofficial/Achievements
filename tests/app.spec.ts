import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/AI Assistant/);
});

test('can send a message', async ({ page }) => {
  await page.goto('/');

  const sender = page.getByPlaceholder('Type your message here…');
  await sender.fill('Hello AI');
  await sender.press('Enter');

  await expect(
    page.locator('.ant-bubble-end .ant-bubble-content').filter({ hasText: 'Hello AI' })
  ).toBeVisible();
});
