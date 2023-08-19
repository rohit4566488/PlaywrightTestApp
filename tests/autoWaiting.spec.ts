import { test, expect } from '@playwright/test'

test.beforeEach( async ({page}, testInfo) => {
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()

    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')

    //1 await successButton.click()  //click waits for button to be available
    
    //2 const text = await successButton.textContent() //textContent waits for the button to be available as well to get text
    
    //3 await successButton.waitFor({state: "attached"})
    //3 const text = await successButton.allTextContents()  //this method will not wait

    //2 expect(text).toContain('Data loaded with AJAX get request.') //simple assertion will not wait

    //4 await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success')
    
    //_____wait for element
    //await page.waitForSelector('.bg-success')

    //_____wait for particular response
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //_____wait for network calls to be completed (NOT RECOMMENDED)
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.') 
})

test('set timeouts', async({page}) => {
    test.setTimeout(20000)
    //test.slow()
    const successButton = page.locator('.bg-success')
    await successButton.click()
    // await successButton.click({timeout: 16000})
})