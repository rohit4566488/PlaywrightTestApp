import { Page } from "@playwright/test";

export class NavigationPage {

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async formLayoutsPage(){
        this.selectGroupMenuItem('Forms')
        // await this.page.getByText('Forms').click()
        await this.page.getByText('Form Layouts').click()
    }

    async datePickerPage(){
        this.selectGroupMenuItem('Forms')
        // await this.page.getByText('Forms').click()
        await this.page.waitForTimeout(1000)
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage(){
        this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage(){
        this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage(){
        this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == "false")
            await groupMenuItem.click()
    }


}