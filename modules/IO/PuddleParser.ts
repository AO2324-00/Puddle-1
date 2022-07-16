import { Variables } from "../mod.ts";

/**
 * 文字列の解析や変換を行う。
 * Parses and converts strings.
 */
 export class PuddleParser {

    /**
     * 変数を含む文字列に値を代入する。
     * Assigns a value to a string containing variables.
     * @param template_text 変数を含んだ文字列。
     * @param variables 変数とその値を格納した連想配列。
     * @returns 変数を代入した文字列。
     */
    static assignToVariables(template_text: string, variables: Variables): string {
        for(let variable in variables) {
            const regExp: RegExp = new RegExp(`{{\\s*${variable}\\s*}}`,`g`);
            template_text = template_text.replace(regExp, String(variables[variable]));
        }
        return template_text;
    }
}