/* @jsx $mol_jsx */
namespace $.$$ {
	
	export class $hyoo_page_side_menu extends $.$hyoo_page_side_menu {
		
		@ $mol_mem
		content() {
			const bookmarks = this.files()
			return [
				this.Filter(),
				... this.bookmarks_filtered().map( b => this.Bookmark_drop( b.id() ) ),
			]
		}
		
		@ $mol_mem
		bookmarks_filtered() {
			
			if( this.filter() ) {
				const yard = this.yard()
				return yard.land_search( this.filter() ).map( id => {
					const land = yard.land( id )
					id = land.chief.sub( '$hyoo_page_side', $hyoo_crowd_reg ).str() as $mol_int62_string || id
					return yard.world().Fund( $hyoo_page_side ).Item( id )
				} )
			}
			
			return this.bookmarks().filter( $mol_match_text(
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
				... this.bookmarks().includes( this.bookmark( id ) )
					? this.self_editing() ? [ this.Bookmark_remove( id ) ] : []
					: [ this.Bookmark_add( id ) ],
			]
		}
		
		@ $mol_action
		bookmark_remove( id: $mol_int62_string ) {
			this.bookmarks( this.bookmarks().filter( b => b.id() !== id ) )
		}
		
		@ $mol_action
		bookmark_add( id: $mol_int62_string ) {
			const bookmark = this.bookmark( id )
			this.bookmarks([ ... this.bookmarks(), bookmark ])
			bookmark.book( this.side() )
		}
		
		bookmark_uri( id: $mol_int62_string ) {
			return this.$.$mol_state_arg.make_link({ '': id })
		}
		
		bookmark_html( id: $mol_int62_string ) {
			return( <a href={ this.bookmark_uri( id ) }>{ this.bookmark_title( id ) }</a> ).outerHTML
		}
		
		bookmark_text( id: $mol_int62_string ) {
			return `\\\\${ this.bookmark_title( id ) }\\${ this.bookmark_uri( id ) }\\\\`
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
