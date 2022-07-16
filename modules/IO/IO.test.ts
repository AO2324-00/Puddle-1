import * as TEST from "https://deno.land/std@0.148.0/testing/asserts.ts";
import * as IO from "./IO.ts";

Deno.test({
    name: "PuddleParser-assignToVariables",
    //only: true,
    fn() {

        const template_text = `ABC{{var}}GHI`;
        const variables = { var: "DEF" };

        const result = IO.PuddleParser.assignToVariables(template_text, variables);
        TEST.assertEquals(result, `ABCDEFGHI`);

    }
});

Deno.test({
    name: "PuddleNoticer-Request-output",
    //only: true,
    fn() {

        const module_name = "IO";
        const notice_name = "Test";
        const variables = { var: "variable" };

        IO.PuddleNoticer.language = "en";
        const result_en = IO.PuddleNoticer.Request(module_name, notice_name, variables);
        TEST.assertStringIncludes(result_en, `[Request] Testing.variable`);

        IO.PuddleNoticer.language = "ja";
        const result_ja = IO.PuddleNoticer.Request(module_name, notice_name, variables);
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

        IO.PuddleNoticer.language = "en";
        const result_en = IO.PuddleNoticer.Info(module_name, notice_name, variables);
        TEST.assertStringIncludes(result_en, `[Info] Testing.variable`);

        IO.PuddleNoticer.language = "ja";
        const result_ja = IO.PuddleNoticer.Info(module_name, notice_name, variables);
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

        IO.PuddleNoticer.language = "en";
        const result_en = IO.PuddleNoticer.Warning(module_name, notice_name, variables);
        TEST.assertStringIncludes(result_en, `[Warning] Testing.variable`);

        IO.PuddleNoticer.language = "ja";
        const result_ja = IO.PuddleNoticer.Warning(module_name, notice_name, variables);
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

        IO.PuddleNoticer.language = "en";
        TEST.assertThrows(()=>{
            const result_en = IO.PuddleNoticer.Error(module_name, notice_name, variables);
            TEST.assertStringIncludes(result_en, `[Error] Testing.variable`);
            TEST.assertMatch(result_en, new RegExp("\([A-z]{3} [A-z]{3} [0-9]{2} [0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2}"));
        })
        TEST.assertThrows(()=>{
            IO.PuddleNoticer.language = "ja";
            const result_ja = IO.PuddleNoticer.Error(module_name, notice_name, variables);
            TEST.assertStringIncludes(result_ja, `[Error] テスト。variable`);
            TEST.assertMatch(result_ja, new RegExp("\([A-z]{3} [A-z]{3} [0-9]{2} [0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2}"));
        })

    }
});