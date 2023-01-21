namespace $.$$ {
	
	export class $hyoo_page_menu extends $.$hyoo_page_menu {
		
		@ $mol_action
		add() {
			const land = this.yard().land_grab()
			this.$.$mol_dom_context.location.href = '#!=' + land.id()
			this.side().bookmarked( land.id(), true )
			this.editing( true )
		}
		
		@ $mol_action
		bookmark_add( id: $mol_int62_string ) {
			this.bookmarks([ ... this.bookmarks(), this.bookmark( id ) ])
		}
		
	}
	
}
