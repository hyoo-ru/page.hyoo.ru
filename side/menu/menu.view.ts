namespace $.$$ {
	
	export class $hyoo_page_side_menu extends $.$hyoo_page_side_menu {
		
		@ $mol_mem
		content() {
			const bookmarks = this.bookmarks()
			return [
				... bookmarks.length > 2 ? [ this.Filter() ] : [],
				... this.bookmarks_filtered().map( b => this.Bookmark_drop( b.id() ) ),
			]
		}
		
		@ $mol_mem
		bookmarks_filtered() {
			
			return this.files().filter( $mol_match_text(
				this.filter(),
				bookmark => [ bookmark.title() ],
			) ).reverse()
			
		}
		
		tools() {
			return this.editable() ? super.tools() : []
		}
		
		@ $mol_action
		add() {
			
			const side = this.side()
			const page = this.side().world()!.Fund( $hyoo_page_side ).make()
			
			side.bookmarked( page.id(), true )
			page.book( this.side() )
			page.steal_rights( side )
			
			this.$.$mol_dom_context.location.href = '#!=' + page.id()
			this.editing( true )
			
		}
		
		@ $mol_mem_key
		bookmark_row( id: $mol_int62_string ) {
			return [
				this.Bookmark_snippet( id ),
				... this.self_editing() ? [ this.Bookmark_remove( id ) ] : [],
			]
		}
		
		@ $mol_action
		bookmark_remove( id: $mol_int62_string ) {
			this.bookmarks( this.bookmarks().filter( b => b.id() !== id ) )
		}
		
		bookmark_uri( id: $mol_int62_string ) {
			return `#!=${id}`
		}
		
		transfer_adopt( transfer : DataTransfer ) {
			
			const uri = transfer.getData( "text/uri-list" )
			if( !uri ) return
			
			const id = $mol_int62_string_ensure( uri.match( /#!=(\w+_\w+)/ )?.[1] ?? '' )
			if( !id ) return null
			
			return this.world()!.Fund( $hyoo_page_side ).Item( id )
			
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
