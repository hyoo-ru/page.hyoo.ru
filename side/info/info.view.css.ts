namespace $ {
	
	const { rem } = $mol_style_unit
	
	$mol_style_define( $hyoo_page_side_info, {
		
		flex: {
			basis: rem(20),
			grow: 0,
		},
		
		Stat: {
			padding: $mol_gap.block,
			justifyContent: 'space-between',
			flex: {
				wrap: 'wrap',
			},
		},
		
		Ref_list: {
			padding: $mol_gap.block,
		},
		
		Ref_item_link: {
			flex: {
				shrink: 1,
				grow: 1,
			},
		},
		
		Ref_item_stat: {
			padding: $mol_gap.text,
		},
		
		Word_list: {
			padding: $mol_gap.block,
		},
		
		Word_item_text: {
			padding: $mol_gap.text,
			flex: {
				grow: 1,
				shrink: 1,
			},
		},
		
		Word_item_stat: {
			padding: $mol_gap.text,
		},
		
	} )
	
}
