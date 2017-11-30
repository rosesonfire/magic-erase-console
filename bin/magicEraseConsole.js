#!/usr/bin/env node

var { exec } = require('child_process')
var path = require('path')

exec('webpack-dev-server --content-base ' + path.join(__dirname, '..', 'img'),
  {
    cwd: path.join(__dirname, '..')
  },
  function (err, stdout, stderr) {
    if (err) {
      console.log(err)
      return
    }
    if (stderr) {
      console.log('stderr: ' + stderr)
    }
  })
