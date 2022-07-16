import { Notice, Variables, PuddleParser } from "../mod.ts";

const default_language: string = "ja";

/**
 * コンソールに出力する文字に色を付ける。
 * Colors the text output to the console.
 */
export class NotificationLabel {

    #text: string;
    #color: string;
    #color_pallet: { [key: string]: string; } = {
        Black:   "\u001b[30m",
        Red:     "\u001b[31m",
        Green:   "\u001b[32m",
        Yellow:  "\u001b[33m",
        Blue:    "\u001b[34m",
        Magenta: "\u001b[35m",
        Cyan:    "\u001b[36m",
        White:   "\u001b[37m",
        None:    "\u001b[0m"
    }

    /**
     * @param text 文字。
     * @param color 色名。
     */
    constructor(text: string, color: string = "None") {
        this.#color = this.#color_pallet[color] || this.#color_pallet["None"];
        this.#text = text;
    }

    /**
     * 修飾文字付のテキスト。
     * Text with modifier characters.
     */
    get rowText() {
        return `${this.#color}${this.#text}${this.#color_pallet["None"]}`;
    }

    /**
     * 修飾文字を含まないテキスト。
     * Text without modifier characters.
     */
    get text() {
        return this.#text;
    }

}

function GetNoticeText(module_name: string, notice_name: string, variables: Variables): string {
    const notice_modules: { [key: string]: string } = Notice[module_name][PuddleNoticer.language] || Notice[module_name][default_language];
    return PuddleParser.assignToVariables(notice_modules[notice_name], variables);
}

function OutputNotice(label: NotificationLabel, notice_text: string, datetime: string) {
    if(!PuddleNoticer.output) return;
    console.log(`${label.rowText} ${notice_text} (${datetime})`);
}

function SaveNotice(label: NotificationLabel, notice_text: string, datetime: string) {
    if(!PuddleNoticer.save) return;

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
    Deno.writeTextFile(file_path, `${log}${label.text} ${notice_text} (${datetime})\n`);
}

/**
 * メッセージの通知や記録を行う。
 * Notify and record messages.
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
     * 任意のテキストを通知する。
     * Notify any text.
     * @param message メッセージ。
     * @param label ラベル。
     */
    static Notify(message: string, label: NotificationLabel = new NotificationLabel("")) {
        const datetime: string = new Date().toString();
        OutputNotice(label, message, datetime);
        SaveNotice(label, message, datetime);
        return `${label.text} ${message} (${datetime})`;
    }

    /**
     * 任意の情報を通知する。
     * Notify any information.
     * @param message メッセージ。
     */
    static Info(message: string) {
        const label = new NotificationLabel("[Info]", "Green");
        return PuddleNoticer.Notify(message, label);
    }

    /**
     * 任意の警告を通知する。
     * Notify any warnings.
     * @param message メッセージ。
     */
    static Warning(message: string) {
        const label = new NotificationLabel("[Warning]", "Yellow");
        return PuddleNoticer.Notify(message, label);
    }

    /**
     * 任意のエラーを通知して処理を停止する。
     * Notify any errors and stop processing.
     * @param message メッセージ。
     */
    static Error(message: string) {
        const label = new NotificationLabel("[Error]", "Red");
        const result = PuddleNoticer.Notify(message, label);
        Deno.exit();
        return result;
    }

    /**
     * リクエストを通知する。
     * Notify request.
     * @param module_name モジュール名。
     * @param notice_name 通知名称。
     * @param variables 変数。
     */
     static SystemRequest(module_name: string, notice_name: string, variables: Variables = {}) {
        const label = new NotificationLabel("[Request]", "Cyan");
        const notice_text: string = GetNoticeText(module_name, notice_name, variables);
        return PuddleNoticer.Notify(notice_text, label);
    }

    /**
     * 情報を通知する。
     * Notify information.
     * @param module_name モジュール名。
     * @param notice_name 通知名称。
     * @param variables 変数。
     */
    static SystemInfo(module_name: string, notice_name: string, variables: Variables = {}) {
        const notice_text: string = GetNoticeText(module_name, notice_name, variables);
        return PuddleNoticer.Info(notice_text);
    }

    /**
     * 警告を通知する。
     * Notify warnings.
     * @param module_name モジュール名。
     * @param notice_name 通知名称。
     * @param variables 変数。
     */
    static SystemWarning(module_name: string, notice_name: string, variables: Variables = {}) {
        const notice_text: string = GetNoticeText(module_name, notice_name, variables);
        return PuddleNoticer.Warning(notice_text);
    }

    /**
     * エラーを通知して処理を停止する。
     * Notify error and stop processing.
     * @param module_name モジュール名。
     * @param notice_name 通知名称。
     * @param variables 変数。
     */
    static SystemError(module_name: string, notice_name: string, variables: Variables = {}) {
        const notice_text: string = GetNoticeText(module_name, notice_name, variables);
        return PuddleNoticer.Error(notice_text);
    }
}

