import Model from "../src/model.js";
import Point from "./point.js";

class Person extends Model {

    constructor(attrs) {
        super({
            id: Model.required(),
            location: Model.required(Model.cast(Point)),
            name: Model.required(),
            status: Model.default("alive"),
            friends: Model.relations()
        }, attrs);
    }

    get id() { return this.attrs.get("id"); }

    get location() { return this.attrs.get("location"); }

    get name() { return this.attrs.get("name"); }

    get status() { return this.attrs.get("status"); }

    get friends() { return this.attrs.get("friends"); }

}

export default Person;
