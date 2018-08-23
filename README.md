# ACE - Ad Building Framework - Template - 2018
> SF: 02314284
> JIRA: n/a
> APX {id} - Jira Ticket Title
## Notes:

### Acceptance criteria:
  * Investigate technical feasibility
  * Provide mocks and demos
  * Develop necessary templates for final solution
  * Operationalize

### API Calls
Finance: 
https://iquery.finance.yahoo.com:4080/v1/finance/trending/CA?lang=en-CA&region=CA&count=30&ssl=true

News:
http://tiny.corp.yahoo.com/5NjYzNDc

## Description
This initiative comes from Josh Holman, please see pursued use cases below.

Overview of use cases:

FINANCE:

    Pull trending stock from API
    Headline shows name of company, ticker symbol, price, % drop
    Body shows prior 5-days 'real-time' stock quote graph (up/down)
    CTA leading to the full interactive quote page
    {Nice to have} Pull top related news headline leading to article

    SPORTS:
    - Pull trending game from API (both finished games and live)
    - Headline shows two team names, logos, and result (could limit to football)
    - Body could show any the main actions (goals/etc).
    - CTA leading to the full matchcast
    - {Nice to have}

    Pull top related news headline leading to article

NEWS:

    Pull from a trending API top stories of the day in a carousel
    Body includes headline from article and photo
    CTA leading to the article
    Want to automate from API to avoid manual intervention

BREAKING:

    Short-term ads used to drive further awareness of breaking news events
    Bright/red 'breaking' banner.
    Headline and image can be done manually as this is a 1x/week type of event
    Want it to also work across Gemini ads as well

## Updates:
Update on actions:
Pietro and Adriana provided links to Finance and News APIs.

FINANCE
s a starting point pls find the Finance tranding tickers API below. This is the YQL+ api to get the trending tickers
This would be for canada for example:
http://iquery.finance.yahoo.com:4080/v1/finance/trending/CA?lang=en-CA&region=CA&count=30&ssl=true

Note i ve just realised we return only 1 but we should have up to 30. Else we can use the most active stocks instead. (the stocks with the biggest intraday volumes)
Having said that you can start with APIs above and we will return more tickers shortly.

NEWS
Here is the API for UK News sidekick http://tiny.corp.yahoo.com/5NjYzNDc
Can we test and if content not relevant we can always work with the team on getting a different call?


## Setup
  * ### 1. Requirements
    * nodejs@4.4.3
    * npm@3 (`$ npm i -g npm`)
    * Google Drive File Stream desktop application

  * ### 2. How to / Installation
    * open terminal and navigate to your workspace.
    * Download and install [Drive File Stream](https://support.google.com/drive/answer/7329379)
    * `git clone git@git.ouroath.com:ACT-ACE/ad-building-framework.git` or visit [https://git.ouroath.com/ACT-ACE/ad-building-framework](https://git.ouroath.com/ACT-ACE/ad-building-framework)
    * remove the git origin `git remote rm origin`.
    * In your finder (or explorer) feel free to rename the folder from 'ad-building-framework' to your project name.
    * type in `npm install` to start installing project dependencies.
    * try to run 'grunt' command. 
    * if you don't have grunt-cli installed... `npm install -g grunt-cli`

## Run
  * ### build
    * `grunt`
  * ### compile / bundle (for production only) includes additional reports, file checks, and sharing to google drive.
    * `grunt bundle`
  * ### Visit
    * [URL](http://localhost:3000/) Should auto open the url for you.


## Libraries used
  * #### build tool
    * [grunt@1.0.2](https://gruntjs.com/)

### Learn more
* [Official Grunt NPM website](https://www.npmjs.com/package/grunt)
