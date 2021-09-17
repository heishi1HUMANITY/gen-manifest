#!/usr/bin/env node

import * as readline from 'readline';
import { mkdir, writeFile } from 'fs';
import * as sharp from 'sharp';

type Manifest = {
  lang?: string,
  name?: string,
  short_name?: string,
  start_url?: string,
  display?: string,
  background_color?: string,
  description?: string,
  icons?: string | object[]
};

export const stdIn = (question: string): Promise<string> => {
  const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve): void => {
    r.question(question, (ans: string): void => {
      resolve(ans);
      r.close();
    })
  });
};

export const saveIconFiles = (filepath: string, sizeList: number[]): void => {
  mkdir('icons', (err) => {
    if (err) throw err;
  });
  for (let s of sizeList) {
    sharp.default(filepath).resize({
      width: s,
      height: s,
      fit: 'contain',
      position: 'center',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }).png().toBuffer().then((buf: Buffer): void => {
      writeFile(`./icons/icon-${s}x${s}.png`, buf, (err): void => {
        if (err) throw err;
      });
    });
  }
};

export const makeManifestJson = (manifest: Manifest, sizeList?: number[]): string => {
  if (typeof manifest === 'undefined') {
    throw new Error('no argument')
  }
  if (typeof manifest.icons === 'string' && typeof sizeList !== 'undefined') {
    manifest.icons = [];
    for (let s of sizeList) {
      manifest.icons.push({ src: `/icons/icon-${s}x${s}.png`, sizes: `${s}x${s}`, type: "image/png" });
    }
  }
  return JSON.stringify(manifest);
};

export const main = async () => {
  try {

    const manifest: Manifest = {};
    manifest.lang = await stdIn('lang:(en) ') || 'en';
    manifest.name = await stdIn('name: ');
    manifest.short_name = await stdIn(`short_name:(${manifest.name}) `) || manifest.name;
    manifest.start_url = await stdIn(`start_url:(/) `) || '/';
    manifest.display = await stdIn('display:(standalone) ') || 'standalone';
    manifest.background_color = await stdIn('background_color:(#fff) ') || '#fff';
    manifest.description = await stdIn('description: ');
    manifest.icons = await stdIn('icon file: ');

    if (manifest.icons !== '') {
      const sizeList: number[] = [192, 256, 384, 512];
      saveIconFiles(manifest.icons, sizeList);
      const manifestJson: string = makeManifestJson(manifest, sizeList);
      console.log(manifest);
      writeFile('manifest.json', manifestJson, (err): void => {
        if (err) throw (err);
      })
    } else {
      const manifestJson: string = makeManifestJson(manifest);
      console.log(manifest)
      writeFile('manifest.json', manifestJson, (err): void => {
        if (err) throw (err);
      })
    }

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main();
