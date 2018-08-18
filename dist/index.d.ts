import { IFormatrOptions } from './interfaces';
declare const instance: {
    setOption: {
        (options: IFormatrOptions): IFormatrOptions;
        (key: string, val: any): IFormatrOptions;
    };
    format: (message: any, ...args: any[]) => string;
    formatWith: (options: IFormatrOptions) => (message: any, ...args: any[]) => string;
};
export = instance;
