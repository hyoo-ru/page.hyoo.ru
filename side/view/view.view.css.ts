namespace $ {
	
	const { rem, per } = $mol_style_unit
	
	$mol_style_define( $hyoo_page_side_view, {
		
		flex: {
			basis: rem(50),
			grow: 0,
		},
		
		Menu_toggle: {
			margin: [ rem(-.5), rem(-.75) ],
		},
		
		Body_content: {
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

		Following: {
			flex: {
				grow: 1,
				shrink: 1,
			},
			color: $mol_theme.special,
		},
		
		// Author_list: {
		// 	flex: {
		// 		wrap: 'wrap',
		// 		shrink: 1,
		// 	},
		// 	justifyContent: 'flex-end',
		// },
		
	} )
	
}
