import { test, expect } from '@playwright/test'

test.beforeEach( async ({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({page}) => {
    //by Tag Name
    page.locator('input')

    //by ID
    page.locator('#inputEmail1')

    //by Class name
    page.locator('.input-full-width')

    //by Attribute name
    page.locator('[placeholder]')

    //by Attribute name and value
    page.locator('[placeholder="Email"]')

    //by Class value
    page.locator('[class="input-full-width size-medium shape-rectangle"]')

    //combination of selectors
    await page.locator('input[placeholder="Email"]').first().click()
    page.locator('[placeholder="Email"][type="email"]')

    //by XPath (NOT RECOMMENDED!!!!)
    await page.locator('//*[@id="inputEmail1"]').click()

    //by partial text match
    await page.locator(':text("Using")').click()

    //by exact text match
    await page.locator(':text-is("Using the Grid")').click()
})

test('Locatinth with getBy..', async ({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    // await page.getByTestId('SignIn').click()

    await page.getByTitle('IoT Dashboard').click()
})

test('locating child elements', async ({page}) => {

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click() //also demo the last() method

    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('locating parent elements', async ({page}) => {

    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({ hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({ has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
            .getByRole('textbox', {name: "Email"}).click()

    await page.locator(':text-is("Using the Grid")').locator('..').click()
})

test('Reusing locators', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.locator('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

test('extracting values', async ({page}) => {
    //single text value
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    //input value
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    //attribute value
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('assertions', async({page}) => {
    const basicFormButton = page.locator('nb-card').filter({ hasText: "Basic form"}).locator('button')

    //General assertion
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')
    expect(await basicFormButton.textContent()).toEqual('Submit')

    //Locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //Soft assertion
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
})