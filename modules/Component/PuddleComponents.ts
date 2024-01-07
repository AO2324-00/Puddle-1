import { Variables } from "../mod.ts";
import { PuddleIO } from "../Utilities/PuddleIO.ts";
import { PuddleParser } from "../Utilities/PuddleParser.ts";
import { PuddleComponent } from "./PuddleComponent.ts";

export class PuddleComponents {

    static #document_root: string = "./";

    #raw_components: { [key: string]: string} = {};

    #components: PuddleComponent[] = [];

    #base_html: string = "";

    async init(path: string, ...data: Variables[]) {
        const component = await this.getComponent(path, ...data);
        this.#base_html = component.html;
    }

    async getComponent(path: string, ...data: Variables[]): Promise<PuddleComponent> {
        path = PuddleParser.getPath(PuddleComponents.#document_root, path);

        const template_text: string = path in this.#raw_components ? this.#raw_components[path] : await PuddleIO.readTextFile(path);
        this.#raw_components[path] = template_text;
        
        const parsed_text = await this.execScripts(template_text, ...data);
        const component: PuddleComponent = new PuddleComponent(parsed_text);
        this.#components.push(component);
        return component;
    }

    /**
     * Functionコンストラクタを用いてテキストファイル内のスクリプトを実行する
     * @param script_text Javascriptテキスト
     * @param data 埋め込む変数
     * @returns スクリプトの実行結果
     */
    async execInlineScripts(script_text: string, data: Variables={}): Promise<string> {
        script_text = script_text.replace(new RegExp(`^{{`), "").replace(new RegExp(`}}$`), "");

        // Functionコンストラクタを用いてテキストファイル内のスクリプトを実行
        const func = async function () {}.constructor('component', 'data', `return ${script_text}`);
        const func_component = async (path: string, ...data: Variables[])=>{
            const component = await this.getComponent(path, ...data);
            return component.html;
        };
        try {
            return func(func_component.bind(this), data);
        } catch (error) {
            return `{{ ${error} }}`;
        }
    }

    /**
     * スクリプトのリストを取得する
     * @param template_text スクリプトが埋め込まれたテキスト
     * @returns スクリプトのリスト
     */
    #getScripts(template_text: string): IterableIterator<RegExpMatchArray> {
        const reg_exp: RegExp = new RegExp(`(?<!\\{)\\{\\{[\\s\\S]*?\\}\\}(?!\\})`,`g`);
        const matched_texts = template_text.matchAll(reg_exp);
        return matched_texts;
    }

    async execScripts(template_text: string, ...data: Variables[]): Promise<string> {
        const script_texts = this.#getScripts(template_text);
        for(const script_text of script_texts) {
            let replacement_text = "";
            if (data.length == 0) {
                replacement_text = await this.execInlineScripts(script_text.toString());
            }
            for (const _data of data) {
                replacement_text += await this.execInlineScripts(script_text.toString(), _data);
            }
            template_text = template_text.replace(script_text.toString(), replacement_text);
        }
        return template_text;
    }

    /**
     * コンポーネントのベースとなるHTMLを取得する
     * @readonly
     * @type {string}
     * @memberof PuddleComponents
     */
    get html(): string {
        return this.#base_html;
    }

    /**
     * コンポーネント内のcssを抜き出してスタイルタグ内にまとめる
     * @readonly
     * @type {string}
     * @memberof PuddleComponents
     */
    get style(): string {
        const styles = this.#components
            .map(component=>component.style) // style抽出
            .filter((val, i, self)=>i === self.indexOf(val)) // 重複削除
            .join(""); // 結合
        return styles.length == 0 ?  "" : `<style>\n${styles}\n</style>\n`;
    }

    /**
     * コンポーネント内のscriptを抜き出してスクリプトタグ内にまとめる
     * @readonly
     * @type {string}
     * @memberof PuddleComponents
     */
    get script(): string {
        const scripts = this.#components
            .map(component=>component.script) // script抽出
            .filter((val, i, self)=>i === self.indexOf(val)) // 重複削除
            .join(""); // 結合
        return scripts.length == 0 ?  "" : `<script>\n${scripts}\n</script>\n`;
    }

    /**
     * ドキュメントルートを取得する
     * @returns ドキュメントルート(デフォルトは 「./」)
     */
    static getDocumentRoot(): string {
        return PuddleParser.getPath(PuddleComponents.#document_root, "./");
    }

    /**
     * ドキュメントルートを設定する
     * @param root_path ドキュメントルートのパス
     */
    static setDocumentRoot(root_path: string): void {
        PuddleComponents.#document_root = root_path;
    }

    /**
     * テキストに変換したコンポーネントを取得する
     * @param path ファイルパス
     * @param data 変数
     * @returns コンポーネントテキスト
     */
    static async get(path: string, ...data: Variables[]): Promise<string> {

        const  puddleComponents = new PuddleComponents();
        await puddleComponents.init(path, ...data);
        const html: string = puddleComponents.html;
        const style: string = puddleComponents.style;
        const script: string = puddleComponents.script;

        const reg_html = new RegExp(`(?=\\<[^<]*html[^>]*\\>)`, "i");
        const reg_style = new RegExp(`(?=\\<[^<]*\\/[^<]*head[^>]*\\>)`, "i");
        const reg_script = new RegExp(`(?=\\<[^<]*\\/[^<]*body[^>]*\\>)`, "i");

        let parsedHTML = html;
        if (!html.match(reg_html)) {
            parsedHTML = `<html>\n${parsedHTML}\n</html>\n`;
        }
        if (html.match(reg_style)) {
            parsedHTML = html.replace(reg_style, style);
        } else {
            parsedHTML = style + parsedHTML;
        }
        if (html.match(reg_script)) {
            parsedHTML = parsedHTML.replace(reg_script, script);
        } else {
            parsedHTML = parsedHTML + script;
        }
        return parsedHTML;
    }

}