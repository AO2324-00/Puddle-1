
import * as Notice_DB from "./DB/Notice.ts";
import * as Notice_IO from "./IO/Notice.ts";
export const Notice: { [key: string]: any } = {
    "IO": Notice_IO,
    "DB": Notice_DB,
}

export type Variables = { [key: string]: any; };

export * from "./IO/PuddleNoticer.ts";
export * from "./IO/PuddleParser.ts";