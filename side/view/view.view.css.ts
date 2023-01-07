namespace $ {
	
	const { rem, per } = $mol_style_unit
	
	$mol_style_define( $hyoo_page_side_view, {
		
		margin: {
			right: 'auto',
		},
		flex: {
			basis: rem(50),
			grow: 0,
		},
		
		Body: {
			padding: $mol_gap.block,
			justifyContent: 'space-between',
		},
		
		Search: {
			flex: {
				basis: per(100),
			},
		},
		
		Signature: {
			justifyContent: 'flex-start',
			alignItems: 'flex-end',
			flex: {
				direction: 'row-reverse',
				wrap: 'wrap',
			},
		},
		
		Author_list: {
			flex: {
				wrap: 'wrap',
				shrink: 1,
			},
			justifyContent: 'flex-end',
		},
		
	} )
	
}
