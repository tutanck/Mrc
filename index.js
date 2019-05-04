(function(){
  'use strict';

  const fs = require("fs");
  const nodeFS = require("node-fs");
  const argv = require('yargs').argv;
  
  // folderName = FooBar      -- required
  // path = /Some/Sub/Folder  -- optional
  // noState = 'no-state'     -- optional
  
  const folderName = argv._[0];
  let path;
  let noState;

  // Within create-react-apps yargs doesn't pick up on flags or options
  // so doing this hackery to make it work

  path = argv._.find(val => /[\/]/.test(val))
  noState = argv._.find(val => val === 'no-state')
  
  if (!folderName) {
    console.log('[ERROR]: Must supply a component name')
    return;
  }
  
  let relativePath = './src';
  if (path) {
    relativePath += path
  }
  relativePath += `/${folderName}`;
  
  fs.stat(relativePath, (err) => {
    if (!err) {
      console.log(`[ERROR]: ${folderName} already exists at ${relativePath}`);
    }
    else if (err.code === 'ENOENT') {
      try {
        nodeFS.mkdirSync(relativePath, 0o777, true);
        fs.writeFileSync(`${relativePath}/${folderName}.js`, setupJsFile(folderName));
        fs.writeFileSync(`${relativePath}/${folderName}.css`, setupCSSFile(folderName));
        fs.writeFileSync(`${relativePath}/${folderName}.test.js`, setupJsTestFile(folderName));
      } catch (err) {
        console.error(err.message)
      }
    }
  });
  
  function setupJsFile(folderName) {
    if (noState) {
      return `import React from 'react';
import './${folderName}.css';
  
export default function ${folderName}(props) {
  return (
    <div></div>
  )
}
`;
    }
    return `import React, {Component} from 'react';
import './${folderName}.css';
  
export default class ${folderName} extends Component {
  render() {
    return (
      <div></div>
    )
  }
}
  `;
  };
  
  function setupCSSFile(folderName) {
    return `/* styling for ${folderName} Component */`;
  }
  
  function setupJsTestFile(folderName) {
    return `import React from 'react';
import ReactDOM from 'react-dom';
import ${folderName} from './${folderName}';

describe('${folderName} Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(< ${folderName} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
`;
  }
}())
