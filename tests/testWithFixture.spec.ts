import { test } from '../test-options'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'

// test.beforeEach( async ({page}) => {
//     await page.goto('/')
// })

test('parametrized methods', async({pageManager}) => {
    const randomfullName = faker.person.fullName()
    const randomEmail = `${randomfullName.replace(' ', '')}${faker.number.int({max: 1000})}@test.com`

    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomfullName, randomEmail, false)
})
