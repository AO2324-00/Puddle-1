import * from "../../Puddle.ts";

export interface Schema {
    [key: string]: ("UNIQUE"|"AUTO INCREMENT"|"NOT NULL")[] | Schema;
}

function checkSchema(data: any, schema: Schema) {
    for(let key in schema) {
        const isUnique = schema[key].includes("UNIQUE");
        const isNotNull = schema[key].includes("NOT NULL");
        if(!isUnique && !isNotNull) continue;
        const rows = data.map(column=>column[key]);
        if(isUnique && new Set(rows).size != rows.length) throw Error(`\n[PuddleJson]\nSchema error. There is a duplicate element in the "${key}" field.\nスキーマエラーです。"${key}"に重複があります。`);
        if(isNotNull && rows.filter(v=>v).length != rows.length) throw Error(`\n[PuddleJson]\nSchema error. "${key}" has null object.\nスキーマエラーです。"${key}"はNULLオブジェクトを持っています。`);
    }
    data = data.map(row=>{
        for(let key in schema) if(!row[key]) row[key] = null;
        return row;
    })
    return data;
}

export class PuddleJson {

    static TABLE: { [key: string]: PuddleJson; } = {};

    static USE(file_path: string, schema: Schema): PuddleJson {
        if(Object.keys(PuddleJson.TABLE).includes(file_path)) return PuddleJson.TABLE[file_path];
        return new PuddleJson(file_path, schema);
    }

    #file_path: string;
    #schema: Schema;

    constructor(file_path: string, schema: Schema) {
        this.#file_path = file_path;
        this.#schema = schema;
        PuddleJson.TABLE[file_path] = this;
    }

    get file_path(): string {
        return this.#file_path
    }

    get schema(): Schema {
        return this.#schema
    }

}