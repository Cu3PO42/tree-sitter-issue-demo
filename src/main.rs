const FOO: &str = include_str!("../parser/examples/foo");

fn main() {
    let mut parser = tree_sitter::Parser::new();
    parser.set_language(tree_sitter_expressions::language()).unwrap();
    let tree = parser.parse(FOO, None).unwrap();
    let root = tree.root_node();
    assert!(root.kind() == "source_file");
    let first_expr = root.named_child(0).unwrap();
    assert!(first_expr.kind() == "and");
    let left = first_expr.child_by_field_name("left").unwrap();
    dbg!(left.start_position(), left.end_position());
}
