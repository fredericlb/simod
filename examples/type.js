import Model from "../src/model.js";

class Point extends Model {

    constructor(x, y) {
        super({
            x: Model.default(0),
            y: Model.default(0)
        }, {x, y});
    }

    get x() { return this.attrs.get("x"); }

    get y() { return this.attrs.get("y"); }

    // For (un)serialization
    static reify(attrs) {
        return new Point(attrs.x, attrs.y, attrs.space);
    }
}

export default Point;
