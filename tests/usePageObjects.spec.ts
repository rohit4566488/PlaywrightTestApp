import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'

test.beforeEach( async ({page}) => {
    await page.goto('http://localhost:4200')
})


test('navigation test', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage() 
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage() 
})

test('parametrized methods', async({page}) => {
    const pm = new PageManager(page)
    const randomfullName = faker.person.fullName()
    const randomEmail = `${randomfullName.replace(' ', '')}${faker.number.int({max: 1000})}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'password', 'Option 1')
    // await page.screenshot({path: 'screenshots/FormLayoutsPage.png'})
    // const buffer = await page.screenshot();
    // console.log(buffer.toString('base64'));
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomfullName, randomEmail, false)
    // await page.locator('nb-card').filter({ hasText: "Inline form"}).screenshot({path: 'screenshots/inlineform.png'})
    await pm.navigateTo().datePickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(5)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 10)
})
