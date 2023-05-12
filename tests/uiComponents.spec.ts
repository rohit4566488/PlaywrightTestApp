import { test, expect } from '@playwright/test'


test.describe('Form Layouts page', () => {
    test.beforeEach( async ({page}) => {
        await page.goto('http://localhost:4200')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input field', async({page}) => {
        const usingGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

        await usingGridEmailInput.fill('test@test.com') //fill out the value
        await usingGridEmailInput.clear()
        await usingGridEmailInput.type('test2@test.com', {delay: 500}) //simulate the key strokes

        // assertions of the values
        //general assertion
        const inputValue = await usingGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        //Locator assertion
        await expect(usingGridEmailInput).toHaveValue('test2@test.com')
    })

    test('radio buttons', async({page}) => {
        const usingTheGridCard = page.locator('nb-card', {hasText: "Using the Grid"})

        await usingTheGridCard.getByLabel('Option 1').check({force: true})
        await usingTheGridCard.getByRole('radio', {name: "Option 1"}).check({force: true})
        expect(await usingTheGridCard.getByLabel('Option 1').isChecked()).toBeTruthy()
        
        await usingTheGridCard.getByLabel('Option 2').check({force: true})
        expect(await usingTheGridCard.getByLabel('Option 1').isChecked()).toBeFalsy()
        expect(await usingTheGridCard.getByLabel('Option 2').isChecked()).toBeTruthy()
    })
})

test.describe('Toaster page', () => {
    test.beforeEach( async ({page}) => {
        await page.goto('http://localhost:4200')
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()
    })

    test('checkboxes', async({page}) => {
        // check vs uncheck vs click
        await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true})
        await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true})

        //check all buttons
        const allBoxes = page.getByRole('checkbox')
        for (const box of await allBoxes.all()){
            await box.uncheck({force: true})
            expect(await box.isChecked()).toBeFalsy()
        }

    })
})