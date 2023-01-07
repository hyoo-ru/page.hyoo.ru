namespace $.$$ {
	
	export class $hyoo_page_side_menu extends $.$hyoo_page_side_menu {
		
		@ $mol_mem
		content() {
			const bookmarks = this.bookmarks()
			return [
				... bookmarks.length > 2 ? [ this.Filter() ] : [],
				... this.bookmarks_filtered().map( id => this.Bookmark_drop( id ) ),
			]
		}
		
		@ $mol_mem
		bookmarks_filtered() {
			
			return this.bookmarks().filter( $mol_match_text(
				this.filter(),
				id => [ this.bookmark_title( id ) ],
			) ).reverse()
			
		}
		
		Add() {
			return this.editable() ? super.Add() : null as any
		}
		
		@ $mol_action
		add() {
			
			const side = this.side()
			const page = this.side().world()!.Fund( $hyoo_page_side ).make()
			
			side.bookmarked( page.id(), true )
			page.book( this.side().id() )
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
			this.bookmarks( this.bookmarks().filter( b => b !== id ) )
		}
		
		bookmark_uri( id: $mol_int62_string ) {
			return `#!=${id}`
		}
		
		transfer_adopt( transfer : DataTransfer ) {
			
			const uri = transfer.getData( "text/uri-list" )
			if( !uri ) return
			
			const id = $mol_int62_string_ensure( uri.match( /#!=(\w+_\w+)/ )?.[1] ?? '' )
			return id
			
		}

		receive_after( anchor: $mol_int62_string, bookmark: $mol_int62_string ) {

			if( anchor === bookmark ) return
			
			const bookmarks = this.bookmarks().filter( b => b !== bookmark )
			
			const index = bookmarks.indexOf( anchor )
			bookmarks.splice( index + 1 , 0 , bookmark )
			
			this.bookmarks( bookmarks )

		}
		
		receive_end( bookmark: $mol_int62_string ) {
			const bookmarks = this.bookmarks().filter( b => b !== bookmark )
			bookmarks.unshift( bookmark )
			this.bookmarks( bookmarks )
		}
		
	}
	
}
