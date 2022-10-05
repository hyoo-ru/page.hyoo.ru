namespace $ {
	
	const { rem, per } = $mol_style_unit
	
	$mol_style_define( $hyoo_page_menu, {
		
		flex: {
			basis: rem(20),
			grow: 0,
		},
		
		Logo: {
			margin: [ rem(-0.5), rem(-0.75) ],
		},
		
		Foot: {
			padding: $mol_gap.block,
		},
		
		Content: {
			padding: $mol_gap.block,
		},
		
		Filter: {
			alignSelf: 'stretch',
		},
		
		Bookmark: {
			gap: $mol_gap.block,
		},
		
	} )
	
}
