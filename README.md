<div align="center">
  <br>
	<a href="https://backd.fund/"><img src="https://backd.fund/bkd-full-dark.png" width="200"></a>
  <br>
  <br>
  <p>
    <a href="https://github.com/backdfund/webapp/graphs/contributors">
        <img src="https://img.shields.io/github/contributors/backdfund/webapp?style=flat-square" alt="GitHub contributors" />
    </a>
    <a href="https://github.com/backdfund/webapp/commits/">
    	<img src="https://img.shields.io/github/commit-activity/m/backdfund/webapp?style=flat-square" alt="GitHub commit-activity" />
    </a>
    <a href="https://gitmoji.dev">
        <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji" >
    </a>
    <a href="https://discord.gg/jpGvaFV3Rv">
        <img src="https://discordapp.com/api/guilds/869304943373348915/embed.png" alt="Discord server" >
    </a>
    <a href="https://percy.io/3b0d1c60/backd">
        <img src="https://percy.io/static/images/percy-badge.svg" alt="Percy Visual Testing" >
    </a>
  </p>
</div>

# Backd Website

Welcome to the repository for the Backd Website - a React project implementing Web3 which allows users to interract with the Backd Protocol.  
If you are interested in contributing, please check out our [Contribution Guide](https://github.com/backdfund/webapp/blob/master/.github/CONTRIBUTING.md)

## Development

Dependencies:

- [Install Node.js](https://nodejs.org/en/download/)
- [Install Yarn](https://classic.yarnpkg.com/en/docs/install/)

To run the app locally:

- [Clone the Repository](https://www.google.com/search?q=how+to+clone+a+repository+from+github) to your local machine
- [Open a Terminal](https://www.google.com/search?q=how+to+open+a+terminal+in+a+directory&oq=how+to+open+a+terminal+in+a+directory) at the app directory
- [Change directory](https://www.google.com/search?q=how+to+cd+to+a+directory&oq=how+to+cd+to+a+directory) to the `webapp` directory
- Run `yarn`
- Run `yarn start`
- Navigate to `http://localhost:3000/`

To launch the application using mock data, use the following command:  
`env REACT_APP_USE_MOCK=1 yarn start`

## Testing

There are two types of tests supported, Unit Tests and Automation Tests.  
Both need to be passing for any PR to be merged.

### Unit Tests

The following command can be used to run the unit tests:  
`yarn test`  
This launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Automation Tests

The following command can be used to run the automation tests:  
`yarn run cy:open`  
This runs Cypress in open mode so you can view the tests suites and see them run.  
See the [Cypress docs](https://docs.cypress.io/guides/overview/why-cypress) for more information.
