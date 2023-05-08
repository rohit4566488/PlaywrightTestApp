import { test, expect } from '@playwright/test'

test.beforeEach( async ({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    
})

test('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')

    // await successButton.click()  //click waits for button to be available
    
    // const text = await successButton.textContent() //textContent waits for the button to be available as well to get text
    
    // await successButton.waitFor({state: "attached"})
    // const text = await successButton.allTextContents()  //this method will not wait

    // expect(text).toContain('Data loaded with AJAX get request.') //simple assertion will not wait

    // await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success')
    
    //_____wait for element
    //await page.waitForSelector('.bg-success')

    //_____wait for particular response
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //_____wait for network calls to be completed (NOT RECOMMENDED)
    //await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.') 
})

test('set timeouts', async({page}) => {
    //test.slow()
    //test.setTimeout(20000)
    const successButton = page.locator('.bg-success')
    await successButton.click()
})