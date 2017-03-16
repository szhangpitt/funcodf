const R = require('ramda');
const {doc, table, tablerow, tablecell, text} = require('./entity');

((() => {

    function setIn (path, value, map) {
        return map.setIn(path, value);
    }

    const currySetIn = R.curry(setIn);
    const _ = R.__;

    const docMetaSetIn = currySetIn(
        ['office:document', 'office:meta'], _, _);

    const d = doc(
        table(
            tablerow(
                tablecell(text('abc'))
            ),
            tablerow(
                tablecell([
                    text('456'),
                    text('789'),
                    table(
                        tablerow([tablecell('pqr')]),
                        tablerow([tablecell('xyz')])
                    ),
                ])
            )
        )
    );

    const rdMetaUpdated = docMetaSetIn({'some-meta': 'foobar'})(d);

    console.log(JSON.stringify(rdMetaUpdated, null, 2));
})());

