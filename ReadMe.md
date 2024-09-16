# Welcome to _www-clear_ by CodeDay!

## Introduction
CodeDay’s event management backend for volunteers is located within the [**www-clear**](https://github.com/codeday/www-clear) repository. As indicated by the prefix `www-`, this repo has a frontend facing UI:

[![clear.png](https://i.postimg.cc/B6PNdYxK/clear.png)](https://postimg.cc/njZvm1SF)

At `www-clear`, volunteers are able to mange events, see participant registration, manage ticket pricing, view event status, see a list of sponsors, edit notifications, and view related projects. Engineered with Next.js and React, this repo also incorporates design rules and display requirements defined within `topo` (see below).

The following mind map illustrates how data flows from `www-clear` through `gql-server` to the `clear-gql` server and back to the user:

[![clear-mind-map.png](https://i.postimg.cc/3RYP7Hxv/clear-mind-map.png)](https://postimg.cc/sBHn9qSj)

### Contents
- [Getting Started]()
- [Reporting A Bug]() 
- [Additional Technical Specs]() 
- [Contribution Guidelines]() 
- [Style Guidelines]() 
- [Additional Documentation]() 

### Getting Started
To get started working with `www-clear`, you will first need to clone the repository to your local machine. Then you will want to follow the [Contribution Guidelines](< link to bullet, not Notion >).

1. Run `nvm install` at the commandline
2. Run `npm yarn` at the commandline
3. Run `run yarn` at the commandline
4. Set environmental variables:
- `AUTH0_CLIENT_ID=["something here"]`
- `AUTH0_CLIENT_SECRET=["something here"]`
- `AUTH0_DOMAIN=["something here"]`
- `AUTH0_DOMAIN=["something here"]`
- `AUTH0_EMPLOYEE_ROLE=["something here"]`
- `AUTH0_ADMIN_ROLE=["something here"]`
- `AUTH0_MANAGER_ROLE=["something here"]`
- `AUTH0_VOLUNTEER_ROLE=["something here"]`
- `GQL_SECRET=["something here"]`
- `GQL_ACCOUNT_SECRET=["something here"]`
- `GQL_AUDIENCE=["something here"]`
- `APP_URL=["something here"]`
5. Run `yarn dev` at the commandline

### Reporting A Bug
< something here >

### Additional Technical Specs
The following specifications will need to be followed for this specific repository < what? >.

### Contribution Guidelines
CodeDay has a dedicated Notion page with more information about adding or changing our open source software. Visit our [Contribution Guidelines](https://www.notion.so/codeday/Contribution-Guidelines-draft-04e4cac2f72744b7b84e1e1a68c55f4e) page to learn more.

### Style Guidelines
The way a page is displayed–the color schemes, content layout, and dimensions–are governed by [_topo_](https://topo.codeday.org/). As CodeDay’s primary design software, powered by [Chakra UI](https://chakra-ui.com/), `topo` ensures whatever web browser is used will properly display CodeDay content to user.

#### Standardized Workflow for Contribtions
As we work with so many volunteers and up-and-coming developers, we have a standardized way to submit pushes, pull requests, merges, and file naming to keep work consistent. Visit our [Formatting Submissions](https://www.notion.so/codeday/Formatting-Submissions-draft-04e4cac2f72744b7b84e1e1a68c55f4e) page to learn more about how to submit your work to CodeDay reviewers.

### Additional Documentation
Check our our [Notion **Fungineering**](https://www.notion.so/codeday/Fungineering-dfc6f9bea0fd43849c9a31bd94a64d17) page for more information.
