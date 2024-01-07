import * as TEST from "https://deno.land/std@0.210.0/assert/mod.ts";
import { PuddleIO } from "./PuddleIO.ts";

Deno.test({
    name: "PuddleIO-read",
    //only: true,
    async fn() {

        console.log(await PuddleIO.readTextFile("./modules/IO/Notice.ts"));

    }
});