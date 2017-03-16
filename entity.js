
const Immutable = require('immutable');
const {Map, List} = Immutable;

const uuid = ((() => {
    let _id = 0;
    return function _uuid () {
        const res = _id;
        _id = _id + 1;
        return res;
    };
})());

function idcontentsmap (contents) {
    return Map({
        'id': uuid(),
        'office: contents': List([].concat(contents || [])),
    });
}

function emptymap () {
    return Map({});
}

module.exports.doc = function doc (contents) {
    return Map({
        'office:document': Map({
            'id': uuid(),
            'office:body': idcontentsmap(contents),
            'office:meta': emptymap(),
        }),
    });
};
module.exports.table = function table (headcontents, bodycontents) {
    return Map({
        'office:table': Map({
            'id': uuid(),
            'office:table-head': idcontentsmap(headcontents),
            'office:table-body': idcontentsmap(bodycontents),
        }),
    });
};

module.exports.tablerow = function tablerow (contents) {
    return Map({
        'office:table-row': idcontentsmap(contents),
    });
};

module.exports.tablecell = function tablecell (contents) {
    return Map({
        'office:table-cell': idcontentsmap(contents),
    });
};

module.exports.text = function text (contents) {
    return Map({
        'office:text': idcontentsmap(contents),
    });
};
