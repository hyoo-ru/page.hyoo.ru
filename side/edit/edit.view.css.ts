namespace $ {
	
	const { rem } = $mol_style_unit
	
	$mol_style_define( $hyoo_page_side_edit, {
		
		margin: [ 0, 'auto' ],
		flex: {
			basis: rem(50),
			grow: 0,
		},
		
		Tools: {
			flex: {
				grow: 0,
			},
		},
		
		Body: {
			padding: $mol_gap.block,
		},
		
	} )
	
}
