# Why

Tired of writing so much boilerplate code when you go to create a new React component?

Use `react-component-scaffold` to speed up your development time!

# Usage

react-component-scaffold is a simple command line tool which can be added to your npm scripts.

Inside your `package.json` under scripts, add the following:

`"generate": "node ./node_modules/react-component-scaffold/index.js"`

Now, you can use the following command: `npm run generate componentName /path/to/subfolder no-state`

The command takes 1 required arg and 2 optional args.

Where
* componentName is required
* path/to/subfolder is optional nested component within your /src dir
* no-state is a flag as to whether you want a stateful or stateless component, it defaults to stateful

# Examples

`npm run generate FooBar` 

Create a class component FooBar inside of /src folder

`npm run generate FooBar /Components`

Creates a class component FooBar inside of /src/Components

`npm run generate FooBar no-state`

Create a stateless component FooBar inside of /src

`npm run generate FooBar /Components/Sidebar no-state`

Create a stateless component FooBar inside of /src/Components/SideBar
