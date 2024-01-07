
import * as Notice_DB from "./Json/Notice.ts";
import * as Notice_IO from "./Utilities/Notice.ts";
export const Notice: { [key: string]: any } = {
    "IO": Notice_IO,
    "DB": Notice_DB,
}

export type Variables = { [key: string]: any; };

export * from "./Utilities/PuddleNoticer.ts";
export * from "./Utilities/PuddleParser.ts";