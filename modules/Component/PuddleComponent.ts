function getRegExForEnclosedInTheTag(tag_name: string): RegExp {
    return new RegExp(`(?<=\\<.*?${tag_name}.*?\\>)[\\s\\S]*(?=\\<.*?/.*?${tag_name}.*?\\>)`, "i");
}

export class PuddleComponent {

    #raw: string = "";

    #style: string = "";

    #script: string = "";

    #html: string = "";


    constructor(component: string) {

        this.#raw =  component;

        const reg_html = getRegExForEnclosedInTheTag("html");
        this.#html = component.match(reg_html)?.toString().replace(new RegExp(`^\\n`), "").replace(new RegExp(`\\n$`), "") ||  "";
        component = component.replace(reg_html, "");

        const reg_style = getRegExForEnclosedInTheTag("style");
        this.#style = component.match(reg_style)?.toString().replace(new RegExp(`^\\n`), "").replace(new RegExp(`\\n$`), "") ||  "";
        component = component.replace(reg_style, "");

        const reg_script = getRegExForEnclosedInTheTag("script");
        this.#script = component.match(reg_script)?.toString().replace(new RegExp(`^\\n`), "").replace(new RegExp(`\\n$`), "") ||  "";
    }

    get raw(): string {
        return this.#raw;
    }

    get style(): string {
        return this.#style;
    }

    get script(): string {
        return this.#script;
    }

    get html(): string {
        return this.#html;
    }

}