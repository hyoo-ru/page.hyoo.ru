namespace $ {
	
	const { rem } = $mol_style_unit
	
	$mol_style_define( $hyoo_page, {
		
		View_page: {
			margin: [ 0, 'auto' ],
			flex: {
				basis: rem(60),
				grow: 0,
			},
			Body: {
				padding: $mol_gap.block,
			},
		},
		
		Logo: {
			margin: $mol_gap.block,
		},
		
		Changed_moment: {
			alignSelf: 'flex-end',
		},
		
		Edit_page: {
			margin: [ 0, 'auto' ],
			flex: {
				basis: rem(60),
				grow: 0,
			},
			Body: {
				padding: $mol_gap.block,
			},
		},
		
	} )
	
}
