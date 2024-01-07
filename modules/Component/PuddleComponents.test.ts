import * as TEST from "https://deno.land/std@0.210.0/assert/mod.ts";
import { PuddleParser } from "../Utilities/PuddleParser.ts";
import { PuddleComponents } from "./PuddleComponents.ts";



Deno.test({
    name: "PuddleComponents-parseHTML",
    //only: true,
    async fn() {

        const html = await PuddleComponents.get("./test.html", {test: "TEST1!"}, {test: "TEST2!"});

        console.log(html);

    }
});

Deno.test({
    name: "PuddleComponents-documentRoot",
    //only: true,
    async fn() {

        const root_path = new URL("./", Deno.mainModule).pathname;
        TEST.assertEquals(PuddleComponents.getDocumentRoot(), root_path);

        const tmp_path = "DocumentRoot/";
        PuddleComponents.setDocumentRoot(`./${tmp_path}`);
        TEST.assertEquals(PuddleComponents.getDocumentRoot(), `${root_path}${tmp_path}`);


    }
});