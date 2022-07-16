import * as TEST from "https://deno.land/std@0.148.0/testing/asserts.ts";
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