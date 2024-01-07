
export class PuddleIO {

    static async readFile(file_path: string): Promise<Uint8Array> {
        if (file_path.match(new RegExp(`^https?://`))) {
            const response = await fetch(file_path);
            return new Uint8Array(await response.arrayBuffer());;
        }
        return Deno.readFile(file_path);
    }

    static async readTextFile(file_path:  string): Promise<string> {
        if (file_path.match(new RegExp(`^https?://`))) {
            const response = await fetch(file_path);
            return response.text();
        }
        return Deno.readTextFile(file_path);
    }

}