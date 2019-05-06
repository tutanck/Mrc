#!/usr/bin/env node

(function() {
  'use strict';

  const fs = require('fs');
  const nodeFS = require('node-fs');
  const argv = require('yargs').argv;

  // compName = FooBar      -- required
  const compName = argv._[0];

  // path = /Some/Sub/Folder  -- optional
  const path = argv._[1];

  if (!/(^[A-Z])([A-Za-z0-9]*$)/.test(compName)) {
    console.log('[ERROR]: Must supply a valid component name (ex: FooBar).');
    return;
  }

  if (path && !/^[\/]/.test(path)) {
    console.log(
      `[ERROR]: Must supply a valid path starting with '/' (ex: /some/sub/Folder).`
    );
    return;
  }

  let relativePath = './src';

  if (path) {
    relativePath += path;
  }

  const filePath = `${relativePath}/${compName}.js`;

  fs.stat(filePath, err => {
    if (!err) {
      console.log(`[ERROR]: ${compName} already exists at ${relativePath}`);
    } else if (err.code === 'ENOENT') {
      try {
        nodeFS.mkdirSync(relativePath, 0o777, true);
        fs.writeFileSync(filePath, setupJsFile(compName));
        console.log(`[SUCCESS]: ${filePath} was created.`);
      } catch (err) {
        console.error(err.message);
      }
    }
  });

  function setupJsFile(compName) {
    return `import React from 'react';
  
function ${compName}(props) {
  return (
    <></>
  )
}

export default ${compName};
`;
  }
})();
