import json from "./foo.json" with { type: "json" };
import "./foo.json" with { type: "json" };
export {v} from "./foo.json" with { type: "json" };
export * as json from "./foo.json" with { type: "json" };
const a = import("foo.json", { with: { type: "json" } });
const b = import("foo.json", ); // Allow trailing comma
const c = import("foo.json", { with: { type: "json" } }, );
const d = import("foo.json", foo );
import "./foo.json" with { foo: "bar" }; // Allow unknown attributes
import "./foo.json" with { "type": "json" }; // Allow string key
import "./foo.json" with { a: "a", b: "b" }; // Allow multiple attributes
import "./foo.json" with { "type": "json",  }; // Allow trailing comma
