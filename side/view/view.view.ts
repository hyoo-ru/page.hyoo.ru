namespace $.$$ {
	
	export class $hyoo_page_side_view extends $.$hyoo_page_side_view {
		
		@ $mol_mem
		head() {
			return [
				this.Title(),
				this.Tools(),
				... this.search_show() ? [ this.Search() ] : [],
			]
		}
		
		bookmark( next?: boolean ) {
			return this.profile().bookmarked( this.side().id(), next )
		}
		
		Edit_toggle() {
			return this.editable() ? super.Edit_toggle() : null as any
		}
		
		@ $mol_mem
		search_show( next = false ) {
			if( next === true ) this.Search().bring()
			if( next === false ) this.search_query( '' )
			return next
		}
		
		search_start( event?: KeyboardEvent ) {
			this.search_show( true )
			event?.preventDefault()
		}
		
		search_stop( event?: KeyboardEvent ) {
			this.search_show( false )
			this.Search_toggle().focused( true )
			event?.preventDefault()
		}
		
		@ $mol_mem
		author_list() {
			return [ ... this.authors() ].map( peer => this.Author_link( peer ) )
		}
		
	}
	
}
