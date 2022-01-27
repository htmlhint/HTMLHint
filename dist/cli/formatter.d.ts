/// <reference types="node" />
import { EventEmitter } from 'events';
import type { HTMLHint as IHTMLHint } from '../core/core';
import type { Hint, Ruleset } from '../core/types';
declare const arrSupportedFormatters: string[];
export interface FormatterFileEvent {
    file: string;
    messages: Hint[];
    time: number;
}
export interface FormatterConfigEvent {
    ruleset: Ruleset;
    configPath?: string;
}
export interface FormatterEndEvent {
    arrAllMessages: {
        file: string;
        messages: Hint[];
        time: number;
    }[];
    allFileCount: number;
    allHintFileCount: number;
    allHintCount: number;
    time: number;
}
export interface Formatter extends EventEmitter {
    getSupported(): typeof arrSupportedFormatters;
    init(tmpHTMLHint: typeof IHTMLHint, tmpOptions: {
        nocolor?: boolean;
    }): void;
    setFormat(format: string): void;
    emit(event: 'start'): boolean;
    emit(event: 'file', arg: FormatterFileEvent): boolean;
    emit(event: 'config', arg: FormatterConfigEvent): boolean;
    emit(event: 'end', arg: FormatterEndEvent): boolean;
    on(event: 'start', listener: () => void): this;
    on(event: 'file', listener: (event: FormatterFileEvent) => void): this;
    on(event: 'config', listener: (event: FormatterConfigEvent) => void): this;
    on(event: 'end', listener: (event: FormatterEndEvent) => void): this;
}
export declare type FormatterCallback = (formatter: Formatter, HTMLHint: typeof IHTMLHint, options: {
    nocolor?: boolean;
}) => void;
export {};
