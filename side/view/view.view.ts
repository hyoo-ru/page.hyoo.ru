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
		
		public( next?: boolean ) {
			return this.side().book()?.bookmarked( this.side().id(), next )
		}
		
		Edit_toggle() {
			return this.editable() ? super.Edit_toggle() : null as any
		}
		
		@ $mol_mem
		edit_toggle_label() {
			return this.released() ? [] : [ this.Unreleased() ]
		}
		
		@ $mol_mem
		search_show( next = false ) {
			if( next === true ) {
				this.search_query( this.highlight() )
				this.Search().bring()
			}
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
		
		details() {
			return this.editing() ? this.side_details() : this.side_release()
		}
		
		@ $mol_mem
		author_list() {
			return [ ... this.authors() ].map( peer => this.Author_link( peer ) )
		}
		
		@ $mol_mem
		slides_content() {
			return super.slides_content()
				.replace( '{title}', this.title() || '{title}' )
				.replace( '{details}', this.details() || '{description}' )
		}

		@ $mol_mem
		slides_send() {
			
			const parent = this.$.$mol_dom_context.parent
			if( parent === this.$.$mol_dom_context.self ) return
			
			parent.postMessage(
				[ 'done', this.slides_content() ],
				{ targetOrigin: 'https://slides.hyoo.ru' }
			)
					
		}
		
	}
	
}
