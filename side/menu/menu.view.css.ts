namespace $ {
	
	const { rem, px } = $mol_style_unit
	
	$mol_style_define( $hyoo_page_side_menu, {
		
		flex: {
			basis: rem(20),
			grow: 0,
		},
		
		Logo: {
			margin: [ rem(-0.5), rem(-0.75) ],
		},
		
		Filter: {
			alignSelf: 'stretch',
		},
		
		Body: {
			padding: $mol_gap.block,
		},
		
		Bookmark_drop: {
			'@': {
				'mol_drop_status': {
					'drag': {
						box: {
							shadow: [{
								inset: false,
								x: 0,
								y: px(-1),
								blur: 0,
								spread: 0,
								color: $mol_theme.focus,
							}]
						},
					},
				},
			},
		},
		
		Bookmark_snippet: {
			flex: {
				grow: 1,
				shrink: 1,
			},
		},
		
		Drop_end: {
			'@': {
				'mol_drop_status': {
					'drag': {
						box: {
							shadow: [{
								inset: false,
								x: 0,
								y: px(-1),
								blur: 0,
								spread: 0,
								color: $mol_theme.focus,
							}]
						},
					},
				},
			},
		},
		
		Content_drop_zone: {
			flex: {
				grow: 1,
				basis: rem(1.5),
			},
		},
	
	} )
	
}
