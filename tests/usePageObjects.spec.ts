import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

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
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'password', 'Option 1')
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox('John Smith', 'JohnSmith@test.com', false)
    await pm.navigateTo().datePickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(5)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 10)
})
