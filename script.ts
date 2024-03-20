
import bs58 from "https://cdn.skypack.dev/bs58";
const bytes = bs58.decode(Deno.args[0]);
console.log(JSON.stringify(Array.from(bytes)));