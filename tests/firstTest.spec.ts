import { test } from '@playwright/test'

test('Locator syntax rules', async ({page}) => {
    await page.goto('http://localhost:4200')
    // await page.locator('button')
})