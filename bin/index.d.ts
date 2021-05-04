#!/usr/bin/env node
declare type Manifest = {
    lang?: string;
    name?: string;
    short_name?: string;
    start_url?: string;
    display?: string;
    background_color?: string;
    description?: string;
    icon?: string | object[];
};
export declare const stdIn: (question: string) => Promise<string>;
export declare const saveIconFiles: (filepath: string, sizeList: number[]) => void;
export declare const makeManifestJson: (manifest: Manifest, sizeList?: number[] | undefined) => string;
export {};
