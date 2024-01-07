import { Variables } from "../mod.ts";

/**
 * 文字列の解析や変換を行う。
 * Parses and converts strings.
 */
export class PuddleParser {

    static getPath(document_root: string, path: string): string {
        if (path.match(new RegExp(`^https?://`)))  {
            return path;
        }
        const root_path = new URL(`${document_root}/`.replace("//", "/"), Deno.mainModule);
        return (new URL(path, root_path)).pathname;
    }

    /**
     * 変数を含む文字列に値を代入する。
     * Assigns a value to a string containing variables.
     * @param template_text 変数を含んだ文字列。
     * @param variables 変数とその値を格納した連想配列。
     * @returns 変数を代入した文字列。
     */
    static assignToVariables(template_text: string, variables: Variables): string {
        for(let variable in variables) {
            const regExp: RegExp = new RegExp(`\\{\\{\\s*${variable}\\s*\\}\\}`,`g`);
            template_text = template_text.replace(regExp, String(variables[variable]));
        }
        return template_text;
    }

    static execScripts(template_text: string, data: Variables={}, ): string {
        const regExp: RegExp = new RegExp(`(?<!\\()\\(\\(.*?\\)\\)(?!\\))`,`g`);
        const matched_texts = template_text.matchAll(regExp);
        for(const matched_text of matched_texts) {
            const func = new Function('data', `return ${matched_text.toString()}`);
            template_text = template_text.replace(matched_text.toString(), func(data));
        }
        return template_text;
    }
}