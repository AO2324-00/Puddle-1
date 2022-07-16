import * as TEST from "https://deno.land/std@0.148.0/testing/asserts.ts";
import { PuddleNoticer } from "./PuddleNoticer.ts";

Deno.test({
    name: "PuddleNoticer-Request-output",
    //only: true,
    fn() {

        const module_name = "IO";
        const notice_name = "Test";
        const variables = { var: "variable" };

        PuddleNoticer.language = "en";
        const result_en = PuddleNoticer.SystemRequest(module_name, notice_name, variables);
        TEST.assertStringIncludes(result_en, `[Request] Testing.variable`);

        PuddleNoticer.language = "ja";
        const result_ja = PuddleNoticer.SystemRequest(module_name, notice_name, variables);
        TEST.assertStringIncludes(result_ja, `[Request] テスト。variable`);
        
    }
});

Deno.test({
    name: "PuddleNoticer-Info-output",
    //only: true,
    fn() {

        const module_name = "IO";
        const notice_name = "Test";
        const variables = { var: "variable" };

        PuddleNoticer.language = "en";
        const result_en = PuddleNoticer.SystemInfo(module_name, notice_name, variables);
        TEST.assertStringIncludes(result_en, `[Info] Testing.variable`);

        PuddleNoticer.language = "ja";
        const result_ja = PuddleNoticer.SystemInfo(module_name, notice_name, variables);
        TEST.assertStringIncludes(result_ja, `[Info] テスト。variable`);
        
    }
});

Deno.test({
    name: "PuddleNoticer-Warning-output",
    //only: true,
    fn() {

        const module_name = "IO";
        const notice_name = "Test";
        const variables = { var: "variable" };

        PuddleNoticer.language = "en";
        const result_en = PuddleNoticer.SystemWarning(module_name, notice_name, variables);
        TEST.assertStringIncludes(result_en, `[Warning] Testing.variable`);

        PuddleNoticer.language = "ja";
        const result_ja = PuddleNoticer.SystemWarning(module_name, notice_name, variables);
        TEST.assertStringIncludes(result_ja, `[Warning] テスト。variable`);

    }
});

Deno.test({
    name: "PuddleNoticer-Error-output",
    //only: true,
    fn() {

        const module_name = "IO";
        const notice_name = "Test";
        const variables = { var: "variable" };

        PuddleNoticer.language = "en";
        TEST.assertThrows(()=>{
            const result_en = PuddleNoticer.SystemError(module_name, notice_name, variables);
            TEST.assertStringIncludes(result_en, `[Error] Testing.variable`);
            TEST.assertMatch(result_en, new RegExp("\([A-z]{3} [A-z]{3} [0-9]{2} [0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2}"));
        })
        TEST.assertThrows(()=>{
            PuddleNoticer.language = "ja";
            const result_ja = PuddleNoticer.SystemError(module_name, notice_name, variables);
            TEST.assertStringIncludes(result_ja, `[Error] テスト。variable`);
            TEST.assertMatch(result_ja, new RegExp("\([A-z]{3} [A-z]{3} [0-9]{2} [0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2}"));
        })

    }
});