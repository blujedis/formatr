export declare type FormatrTransformHandler = (val?: any, key?: string, obj?: object) => any;
export interface IFormatrOptions {
    default: any;
    colorize?: boolean;
    hidden?: boolean;
    depth?: number;
    exp?: RegExp;
    strip?: RegExp;
    split?: string;
    transform?: FormatrTransformHandler;
    transforms?: {
        [key: string]: FormatrTransformHandler;
    };
}
