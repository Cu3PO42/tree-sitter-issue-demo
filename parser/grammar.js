// @ts-check
/// <reference path="node_modules/tree-sitter-cli/dsl.d.ts" />

module.exports = grammar({
    name: 'expressions',
    rules: {
        source_file: $ => $._expr,
        _whitespace: $ => /\s+/,

        _expr: $ => choice(
            $.and,
            $.identifier,
            $._brackets,
        ),

        and: $ => prec.left(seq(field("left", $._expr), "AND", field("right", $._expr))),
        identifier: $ => /[_\w][\w_\d]*/,

        _brackets: $ => seq("(", $._expr, ")"),
    },

    extras: $ => [$._whitespace],
})