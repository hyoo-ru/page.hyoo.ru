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
		
		receive_after( anchor: $mol_int62_string, bookmark: $hyoo_page_side ) {

			if( anchor === bookmark.id() ) return
			
			const bookmarks = this.bookmarks().filter( b => b !== bookmark )
			
			const index = bookmarks.findIndex( b => b.id() === anchor )
			bookmarks.splice( index + 1 , 0 , bookmark )
			
			this.bookmarks( bookmarks )

		}
		
		receive_end( bookmark: $hyoo_page_side ) {
			const bookmarks = this.bookmarks().filter( b => b !== bookmark )
			bookmarks.unshift( bookmark )
			this.bookmarks( bookmarks )
		}
		
	}
	
}
