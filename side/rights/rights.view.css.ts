namespace $ {
	
	const { rem, per } = $mol_style_unit
	
	$mol_style_define( $hyoo_page_side_rights, {
		
		flex: {
			basis: rem(20),
			grow: 0,
		},
		
		Editor_list: {
			padding: $mol_gap.block,
		},
		
		Editor_add: {
			Content: {
				flex: {
					wrap: 'wrap',
				},
			},
		},
		
	} )
	
}
