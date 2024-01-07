import * as TEST from "https://deno.land/std@0.210.0/assert/mod.ts";
import { PuddleParser } from "../Utilities/PuddleParser.ts";
import { PuddleComponent } from "./PuddleComponent.ts";

Deno.test({
    name: "PuddleComponent",
    //only: true,
    async fn() {

        const component = new PuddleComponent(`<html>html test</html><style>style test</style><script>script test</script>`);
        TEST.assertEquals(component.html, "html test");
        TEST.assertEquals(component.style, "style test");
        TEST.assertEquals(component.script, "script test");

    }
});