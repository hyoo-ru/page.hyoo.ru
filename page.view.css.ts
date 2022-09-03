namespace $ {
	
	const { rem } = $mol_style_unit
	
	$mol_style_define( $hyoo_page, {
		
		Menu_page: {
			flex: {
				basis: rem(20),
				grow: 0,
			},
		},
		
		Menu: {
			padding: $mol_gap.block,
		},
		
		Profile: {
			margin: [ rem(-0.5), rem(-0.75) ],
		},
		
		Menu_filter: {
			alignSelf: 'stretch',
		},
		
		Menu_item: {
			gap: $mol_gap.block,
		},
		
		View_page: {
			margin: [ 0, 'auto' ],
			flex: {
				basis: rem(50),
				grow: 0,
			},
			Body: {
				padding: $mol_gap.block,
				justifyContent: 'space-between',
			},
		},
		
		Changed: {
			alignSelf: 'flex-end',
		},
		
		Edit_page: {
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
		},
		
		Rights_page: {
			flex: {
				basis: rem(20),
				grow: 0,
			},
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
		
		Info_page: {
			flex: {
				basis: rem(20),
				grow: 0,
			},
		},
		
		Ref_list: {
			padding: $mol_gap.block,
		},
		
		Ref_item_link: {
			flex: {
				shrink: 1,
			},
		},
		
		Ref_item_stat: {
			padding: $mol_gap.text,
		},
		
	} )
	
}
