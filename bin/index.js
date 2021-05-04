#!/usr/bin/env node
import * as readline from 'readline';
import { mkdir, writeFile } from 'fs';
import * as sharp from 'sharp';
export const stdIn = (question) => {
    const r = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        r.question(question, (ans) => {
            resolve(ans);
            r.close();
        });
    });
};
export const saveIconFiles = (filepath, sizeList) => {
    mkdir('icons', (err) => {
        if (err)
            throw err;
    });
    for (let s of sizeList) {
        sharp.default(filepath).resize({
            width: s,
            height: s,
            fit: 'contain',
            position: 'center',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }).png().toBuffer().then((buf) => {
            writeFile(`./icons/icon-${s}x${s}.png`, buf, (err) => {
                if (err)
                    throw err;
            });
        });
    }
};
export const makeManifestJson = (manifest, sizeList) => {
    if (typeof manifest === 'undefined') {
        throw new Error('no argument');
    }
    if (typeof manifest.icon === 'string' && typeof sizeList !== 'undefined') {
        manifest.icon = [];
        for (let s of sizeList) {
            manifest.icon.push({ src: `/icons/icon-${s}x${s}.png`, sizes: `${s}x${s}`, type: "image/png" });
        }
    }
    return JSON.stringify(manifest);
};
try {
    const manifest = {};
    manifest.lang = await stdIn('lang:(en) ') || 'en';
    manifest.name = await stdIn('name: ');
    manifest.short_name = await stdIn(`short_name:(${manifest.name}) `) || manifest.name;
    manifest.start_url = await stdIn(`start_url:(/) `) || '/';
    manifest.display = await stdIn('display:(standalone) ') || 'standalone';
    manifest.background_color = await stdIn('background_color:(#fff) ') || '#fff';
    manifest.description = await stdIn('description: ');
    manifest.icon = await stdIn('icon file: ');
    if (manifest.icon !== '') {
        const sizeList = [192, 256, 384, 512];
        saveIconFiles(manifest.icon, sizeList);
        const manifestJson = makeManifestJson(manifest, sizeList);
        console.log(manifest);
        writeFile('manifest.json', manifestJson, (err) => {
            if (err)
                throw (err);
        });
    }
    else {
        const manifestJson = makeManifestJson(manifest);
        console.log(manifest);
        writeFile('manifest.json', manifestJson, (err) => {
            if (err)
                throw (err);
        });
    }
}
catch (err) {
    console.error(err);
    process.exit(1);
}
//# sourceMappingURL=index.js.map