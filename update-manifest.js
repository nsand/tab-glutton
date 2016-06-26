const fs = require('fs');
const path = require('path');

const pkg = require('./package.json');
const manifest = require('./manifest.json');

// Match up the versions, and then write it out to disk
manifest.version = pkg.version;

fs.writeFile(path.resolve(__dirname, 'manifest.json'), JSON.stringify(manifest, null, '\t'), function (err) {
  if (err) {
    console.error('Failed to update the manifest version.');
    console.error(err);
    process.exit(1);
  }
});
