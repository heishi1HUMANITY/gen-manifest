# gen-manifest

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/gen-manifest.svg)](https://badge.fury.io/js/gen-manifest)

gen-manifest help to make manifest.

## install

`npm i -g gen-manifest`

## Usage

```shell-session
$ gen-manifest
lang:(en)
name: TestManifest
short_name:(TestManifest) Test
start_url:(/)
display:(standalone)
background_color:(#fff) #ddd
description: Test Manifest
icon file: test.svg
{
  lang: 'en',
  name: 'TestManifest',
  short_name: 'Test',
  start_url: '/',
  display: 'standalone',
  background_color: '#ddd',
  description: 'Test Manifest',      
  icon: [
    {
      src: '/icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/icons/icon-256x256.png',
      sizes: '256x256',
      type: 'image/png'
    },
    {
      src: '/icons/icon-384x384.png',
      sizes: '384x384',
      type: 'image/png'
    },
    {
      src: '/icons/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ]
}
```

## Output

* manifest.json
* icons
  * icon-192x192.png
  * icon-256x256.png
  * icon-384x384.png
  * icon-512x512.png
