import {Map, List} from "immutable";
import Collection from "../base/collection.js";

class Model {

    constructor(props, attrs = null) {
        var _attrs = attrs ? new Map(attrs) : new Map(props);
        var _props = attrs ? new Map(props) : null;
        this.attrs = this.checkAttrs(_attrs, _props);
        this.props = _props;
    }

    checkAttrs(attrs, props) {
        if (props === null) {
            return attrs;
        }

        var castIfNeeded = (klass, value) => {
            if (klass === undefined || value instanceof klass) {
                return value;
            } else {
                return klass.reify(value);
            }
        };

        var _attrs = props.reduce( (data, prop, key) => {
            if (prop[0] === Symbol.for("required")) {
                if (!attrs.has(key)) {
                    console.error(`Required attribute ${key} is not set`);
                }
                return data.set(key, castIfNeeded(prop[1], attrs.get(key)));
            } else if (prop[0] === Symbol.for("default")) {
                if (!attrs.has(key)) {
                    return data.set(key, prop[1]);
                } else {
                    return data.set(key, attrs.get(key));
                }
            } else if (prop[0] === Symbol.for("relations")) {
                if (!attrs.has(key)) {
                    return data.set(key, prop[1]);
                } else {
                    var val = attrs.get(key);
                    if (val instanceof Collection) {
                        return data.set(key, attrs.get(key));
                    } else {
                        return data.set(key, new Collection(val));
                    }
                }
            } else if (prop[0] === Symbol.for("optional")) {
                if (attrs.has(key)) {
                    return data.set(key, castIfNeeded(prop[1], attrs.get(key)));
                } else {
                    return data;
                }
            } else {
                console.log(prop);
                console.error("Unknown symbol in attrs : " + prop[0]);
            }
        }, new Map());

        return _attrs;

    }

    native(fct) {
        return this.cloneWith(fct(this.attrs));
    }

    toJSON() {
        var attrsToCopy = this.props === null ? this.attrs.keys() : this.props.keys();

        return this.attrs.map((v, k) => {
            return v.toJSON ? v.toJSON() : v;
        }).toJS();
    }

    cloneWith(attrs) {
        var klass = this.__proto__.constructor;
        return new klass(this.attrs.merge(attrs));
    }

    static reify(attrs) {
        var klass = this.__proto__.constructor;
        return new klass(attrs);
    }
}

Model.required = (option) => [Symbol.for("required"), option];
Model.optional = (option) => [Symbol.for("optional"), option];
Model.default = (def) => [Symbol.for("default"), def];
Model.relations = () => [Symbol.for("relations")];
Model.cast = (klass) => klass;

export default Model;
