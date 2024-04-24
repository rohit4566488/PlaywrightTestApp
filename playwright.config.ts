import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
  timeout: 20000,
  // globalTimeout: 60000,
  expect: {
    timeout: 5000,
    toHaveScreenshot: {maxDiffPixels: 50}
  },
  fullyParallel: false,
  retries: 0,
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,
      },
    ],
    ['json', {outputFile: 'test-results/jsonReport.json'}],
    ['junit', {outputFile: 'test-results/junitReport.xml'}],
    // ['allure-playwright'],
    ['html']
  ],
  

  use: {
    globalsQaUrl: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4201'
            : process.env.STAGING === '1' ? 'http://localhost:4201'
            : 'http://localhost:4200',

    trace: 'on-first-retry',
    screenshot: "only-on-failure",
    video: {
      mode: 'off', 
      size: {width: 1920, height: 1080}
    }
  },

  projects: [
    {
      name: 'dev',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200',
      }
    },
    {
      name: 'chromium'
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox'
      }
    },
    {
      name: 'pageObjectsFullScreen',
      testMatch: 'usePageObjects.spec.ts',
      use: {
        viewport: {width: 1920, height: 1080}
      }
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPad Mini'],
        // viewport: {width: 414, height: 896}
      }
    }
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200',
    timeout: 120 * 1000,
  }
});
