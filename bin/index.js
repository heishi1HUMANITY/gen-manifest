#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.makeManifestJson = exports.saveIconFiles = exports.stdIn = void 0;
const readline = __importStar(require("readline"));
const fs_1 = require("fs");
const sharp = __importStar(require("sharp"));
const stdIn = (question) => {
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
exports.stdIn = stdIn;
const saveIconFiles = (filepath, sizeList) => {
    fs_1.mkdir('icons', (err) => {
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
            fs_1.writeFile(`./icons/icon-${s}x${s}.png`, buf, (err) => {
                if (err)
                    throw err;
            });
        });
    }
};
exports.saveIconFiles = saveIconFiles;
const makeManifestJson = (manifest, sizeList) => {
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
exports.makeManifestJson = makeManifestJson;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const manifest = {};
        manifest.lang = (yield exports.stdIn('lang:(en) ')) || 'en';
        manifest.name = yield exports.stdIn('name: ');
        manifest.short_name = (yield exports.stdIn(`short_name:(${manifest.name}) `)) || manifest.name;
        manifest.start_url = (yield exports.stdIn(`start_url:(/) `)) || '/';
        manifest.display = (yield exports.stdIn('display:(standalone) ')) || 'standalone';
        manifest.background_color = (yield exports.stdIn('background_color:(#fff) ')) || '#fff';
        manifest.description = yield exports.stdIn('description: ');
        manifest.icon = yield exports.stdIn('icon file: ');
        if (manifest.icon !== '') {
            const sizeList = [192, 256, 384, 512];
            exports.saveIconFiles(manifest.icon, sizeList);
            const manifestJson = exports.makeManifestJson(manifest, sizeList);
            console.log(manifest);
            fs_1.writeFile('manifest.json', manifestJson, (err) => {
                if (err)
                    throw (err);
            });
        }
        else {
            const manifestJson = exports.makeManifestJson(manifest);
            console.log(manifest);
            fs_1.writeFile('manifest.json', manifestJson, (err) => {
                if (err)
                    throw (err);
            });
        }
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});
exports.main = main;
exports.main();
//# sourceMappingURL=index.js.map