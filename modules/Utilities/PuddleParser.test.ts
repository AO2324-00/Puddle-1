import * as TEST from "https://deno.land/std@0.210.0/assert/mod.ts";
import { PuddleParser } from "./PuddleParser.ts";

Deno.test({
    name: "PuddleParser-assignToVariables",
    //only: true,
    fn() {

        const template_text = `ABC{{var}}GHI`;
        const variables = { var: "DEF" };

        const result = PuddleParser.assignToVariables(template_text, variables);
        TEST.assertEquals(result, `ABCDEFGHI`);

    }
});

Deno.test({
    name: "PuddleParser-execScripts",
    //only: true,
    fn() {

        const template_text = `ABC{{data.var}}{{data.list.join('')}}GHI{{ 5*6+2 }}`;
        const variables = { var: "DEF", list: ["<li>a</li>", "<li>b</li>", "<li>c</li>"] };

        const result = PuddleParser.execScripts(template_text, variables);
        TEST.assertEquals(result, `ABCDEF<li>a</li><li>b</li><li>c</li>GHI32`);

    }
});