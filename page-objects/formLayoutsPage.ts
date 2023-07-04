import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";


export class FormLayoutsPage extends HelperBase{

    constructor(page: Page){
        super(page)
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
        const usingTheGrid = this.page.locator('nb-card').filter({ hasText: "Using the Grid"})
        await usingTheGrid.getByRole('textbox', {name: "Email"}).fill(email)
        await usingTheGrid.getByRole('textbox', {name: "Password"}).fill(password)
        await usingTheGrid.getByLabel(optionText).check({force: true})
        await usingTheGrid.getByRole('button').click()
    }

    /**
     * This method sumbits Inline Form
     * @param name - provide a valid user first and last name
     * @param email - provide a valid email that belongs this this user
     * @param rememberMe - set it to true is select checkbox and to false if not select is
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean){
        const inlineForm = this.page.locator('nb-card').filter({ hasText: "Inline form"})
        await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await inlineForm.getByRole('textbox', {name: "Email"}).fill(email)
        if(rememberMe)
            await inlineForm.getByRole('checkbox').check({force: true})
        await inlineForm.getByRole('button').click()
    }
}