namespace $.$$ {
	
	export class $hyoo_page_menu extends $.$hyoo_page_menu {
		
		@ $mol_mem
		bookmarks_filtered() {
			
			if( this.filter() ) {
				const yard = this.yard()
				return yard.land_search( this.filter() ).map( id => {
					const land = yard.land( id )
					id = land.chief.sub( '$hyoo_page_side', $hyoo_crowd_reg ).str() as $mol_int62_string || id
					return id
				} )
			}
			
			return super.bookmarks_filtered()
			
		}
		
		@ $mol_action
		add() {
			const land = this.yard().land_grab()
			this.$.$mol_dom_context.location.href = '#!=' + land.id()
			this.side().bookmarked( land.id(), true )
			this.editing( true )
		}
		
	}
	
}
