# Middle Messenger

[![Netlify Status](https://api.netlify.com/api/v1/badges/14597e20-a13a-4e12-9baa-9de5a05bd954/deploy-status)](https://app.netlify.com/sites/middle-messenger-chausme/deploys)

[Messenger app](https://middle-messenger-chausme.netlify.app) built on top of [existing API](https://ya-praktikum.tech/api/v2/swagger) as per [Figma mockups](https://www.figma.com/file/sBhmIq6yUZIqBLoANYJkTh/Middle-Front-end-Chat-App)

## Usage

-   `npm run dev` - start Parcel dev server at `http://localhost:1234`
-   `npm build` - create Parcel build at `./dist`
-   `npm run start` - create Parcel build and start Express server at `http://localhost:3000`
-   `npm run tswatch` - start TypeScript compiler with `--watch` parameter
-   `npm run eslint` - run ESLint with `--quite` parameter
-   `npm run stylelint` - run Stylelint

## Sprint 3

### Pull request - TBC

#### Updates

-   Refactored form validation to be input based
-   Added Block general CSS classes support to avoid optional properties on some components
-   Refactored components to support required routes e.g. `/messenger`
-   Updated previously implemented router with browser history support
-   Implemented Sign In functionality
-   Updated router with auth check
-   Added store for state manipulation
-   Implemented HTTP APIs for Settings, Chats and Auth
-   Refactored components to support API data
-   Added WebSocket support with a singleton class for chat real-time messages
-   Implemented custom pop-up components following original mockups

## Sprint 2

### Pull request - https://github.com/chau5/middle.messenger.praktikum.yandex/pull/9

#### Updates

-   Refactored to TypeScript with basic types
-   Implemented Event Bus class and basic Block component
-   Rebuilt existing simple components as classes based on Block component
-   Refactored some components and modules, added a few new ones
-   Updated ESLInt setup to make it work with TypeScript and fixed JS code
-   Added Stylelint and fixed CSS rules
-   Implemented submit events for 3 x forms
-   Added validation for 3 x forms and different field types
-   Implemented HTTPTransport as a simple Fetch API alternative

## Sprint 1

### Pull request - https://github.com/chau5/middle.messenger.praktikum.yandex/pull/6

-   There is no own messages sent/read output
-   There are no pop-ups implemented including Account password update functionality
-   There is no edit state for Account fields including avatar i.e. there is no `name="avatar"` input

## Credits

-   Icons by [Gene](https://cogentgene1.gumroad.com/) from [256 Brutalist Element Mega Pack](https://cogentgene1.gumroad.com/l/brutalist)
-   Pineapple image by [Fernando Andrade](https://unsplash.com/@thisisnando)
-   Lemonade image by [Pixzolo Photography](https://unsplash.com/@pixzolo)
