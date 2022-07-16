import { Notice } from "../mod.ts";

export type Variables = { [key: string]: any; };

const default_language: string = "ja";

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

class Label {

    #color: string;
    #text: string;

    constructor(color: string, text: string) {
        this.#color = color;
        this.#text = text;
    }

    get rowText() {
        return `${this.#color}${this.#text}\x1b[39m`;
    }

    get text() {
        return this.#text;
    }

}

function OutputNotice(label: Label, module_name: string, notice_name: string, variables: Variables): string {

    const notice_modules: { [key: string]: string } = Notice[module_name][PuddleNoticer.language] || Notice[module_name][default_language];
    const notice_details: string = PuddleParser.assignToVariables(notice_modules[notice_name], variables);
    const datetime: string = new Date().toString();
    
    if(PuddleNoticer.output) {
        console.log(`${label.rowText} ${notice_details} (${datetime})`);
    }

    const notice_text: string = `${label.text} ${notice_details} (${datetime})`;
    if(PuddleNoticer.save) {

        let destination_directory = PuddleNoticer.destination_directory;
        if(destination_directory.match(/^\.\//)) {
            const tmp: string[] = new URL(Deno.mainModule).pathname.slice(1).split('/').slice(0, -1);
            tmp.push(destination_directory.slice(2));
            destination_directory = tmp.join('/');
        }
        
        try {
            Deno.mkdirSync(destination_directory);
        } catch (error) {}

        const file_path: string = `${destination_directory}/log.txt`;
        let log: string = '';
        try {
            log = Deno.readTextFileSync(file_path);
        } catch (error) { }
        Deno.writeTextFile(file_path, `${log}${notice_text}\n`);
    }
    return notice_text;
}

/**
 * フレームワークが発する情報の通知や記録を行う。
 * Notify and record information emitted by the framework.
 */
export class PuddleNoticer {

    /**
     * 通知の言語設定。
     * Language settings for notifications.
     */
    static language: string = "en";

    /**
     * コンソールに通知を出力するかどうか。
     * Whether to output notifications to the console.
     */
    static output: boolean = true;

    /**
     * 通知を記録するかどうか。
     * Whether to record notifications.
     */
    static save: boolean = false;

    /**
     * 通知を記録する際の保存先ディレクトリパス。
     * Destination directory path for recording notifications.
     */
    static destination_directory: string = "./log"

    /**
     * リクエストを通知する。
     * Notify request.
     * @param module_name モジュール名。
     * @param notice_name 通知名称。
     * @param variables 変数。
     */
     static Request(module_name: string, notice_name: string, variables: Variables = {}) {
        const label = new Label("\x1b[36m", "[Request]");
        const notice_text: string = OutputNotice(label, module_name, notice_name, variables);
        return notice_text;
    }

    /**
     * 情報を通知する。
     * Notify information.
     * @param module_name モジュール名。
     * @param notice_name 通知名称。
     * @param variables 変数。
     */
    static Info(module_name: string, notice_name: string, variables: Variables = {}) {
        const label = new Label("\x1b[32m", "[Info]");
        const notice_text: string = OutputNotice(label, module_name, notice_name, variables);
        return notice_text;
    }

    /**
     * 警告を通知する。
     * Notify warnings.
     * @param module_name モジュール名。
     * @param notice_name 通知名称。
     * @param variables 変数。
     */
    static Warning(module_name: string, notice_name: string, variables: Variables = {}) {
        const label = new Label("\x1b[33m", "[Warning]");
        const notice_text: string = OutputNotice(label, module_name, notice_name, variables);
        return notice_text;
    }

    /**
     * エラーを通知して処理を停止する。
     * Notify error and stop processing.
     * @param module_name モジュール名。
     * @param notice_name 通知名称。
     * @param variables 変数。
     */
    static Error(module_name: string, notice_name: string, variables: Variables = {}) {
        const label = new Label("\x1b[31m", "[Error]");
        const notice_text: string = OutputNotice(label, module_name, notice_name, variables);
        Deno.exit();
        return notice_text;
    }
}

