import {List} from "immutable";

class Collection {

    constructor(elements){
        this._elements = elements instanceof List ? elements : new List(elements);
    }

    get _() {
        return this._elements;
    }

    get elements() {
        return this._elements;
    }

    native(fct) {
        return new Collection(fct(this.elements));
    }

    // @Override
    toSendable() {
        return this.elements.map(e => e.toSendable());
    }

    contains(id) {
        return this.elements.filter(obj => obj.id === id).count() > 0;
    }

    update(id, newObj) {
        return new Collection(this.elements.map(obj => obj.id === id ? newObj : obj));
    }

    upsert(id, newObj) {
        return this.contains(id) ? this.update(id, newObj)
            : new Collection(this.elements.push(newObj));
    }

    delete(objToDelete) {
        return new Collection(this.elements.filter(obj => obj.id !== objToDelete.id));
    }

    idx(id) {
        return this.elements.filter(obj => obj.id === id).first();
    }

    toJSON() {
        return this.elements.map(e => e.toJSON ? e.toJSON() : e).toJS();
    }
}

export default Collection;
