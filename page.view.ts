namespace $.$$ {
	
	export class $hyoo_page extends $.$hyoo_page {
		
		@ $mol_mem
		profile() {
			return this.side( this.yard().home().id() )
		}
		
		title() {
			const side = this.side_current()
			const book = this.side_current_book()
			return book === side ? side.title() : `${ side.title() } | ${ book.title() }`
		}

		@ $mol_mem
		aura_showing( next?: boolean ) {
			const key = `aura_showing:${ this.book_id() }`
			return this.$.$mol_state_local.value( key, next?.toString() ) !== 'false'
		}
		
		@ $mol_mem
		aura_image(): string {
			
			return $mol_wire_stale( ()=> {
			
				if( !this.aura_showing() ) return ''
				
				const side = this.side_current()
				const aura = side.aura_effective()
				if( !aura ) return ''
				
				const shade = 'hsla( 0deg, 0%, calc( 50% + var(--mol_theme_luma) * 50% ), .666 )'
				return `linear-gradient( ${shade}, ${shade} ), url("${ aura }")`
				
			} ) ?? ''
			
		}
		
		@ $mol_mem
		editing( next?: boolean ) {
			return this.$.$mol_state_session.value( 'edit', next ) ?? false
		}
		
		@ $mol_mem
		rights( next?: boolean ) {
			return this.$.$mol_state_session.value( 'rights', next ) ?? false
		}
		
		@ $mol_mem
		info( next?: boolean ) {
			return this.$.$mol_state_session.value( 'info', next ) ?? false
		}
		
		edit_close() {
			this.editing( false )
		}
		
		rights_close() {
			this.rights( false )
		}
		
		info_close() {
			this.info( false )
		}
		
		side( id: $mol_int62_string ) {
			return this.yard().world().Fund( $hyoo_page_side ).Item( id )
		}
		
		side_uri( id: $mol_int62_string ) {
			return this.$.$mol_state_arg.make_link({ '': id })
		}
		
		@ $mol_mem
		side_current_id() {
			return ( this.$.$mol_state_arg.value( '' ) || this.side_main_id() ) as $mol_int62_string
		}
		
		side_current() {
			return this.side( this.side_current_id() )
		}
		
		side_current_book() {
			return this.side_current().book() ?? this.side_current()
		}
		
		@ $mol_mem
		book_id() {
			return $mol_wire_stale( ()=> {
				
				if( !this.side_menu_showed() ) return ''
				
				const side = this.side_current()
				const books = side.books().slice().reverse()
				
				if( side.pages().length || this.side_menu_showed() ) books.push( side )
				
				return books[0]?.id() ?? ''
				
			} ) ?? this.side_current_id()
		}
		
		book_side() {
			const id = this.book_id()
			return id ? this.side( id ) : null
		}
		
		book_pages_node() {
			return this.pages_node( this.book_id() )
		}
		
		@ $mol_mem
		side_menu_showed( next?: boolean ) {
			return next ?? Boolean( this.side_current().book() || this.side_current().pages().length > 0 )
		}
		
		@ $mol_mem
		pages() {
			const id = this.side_current_id()
			const book = this.book_id()
			return [
				this.Gap( 'left' ),
				... book ? [ this.Side_menu() ] : [],
				this.View( id ),
				... this.info() ? [ this.Info( id ) ] : [],
				... this.editing() ? [ this.Edit( id ) ] : [],
				... this.rights() ? [ this.Rights( id ) ] : [],
				this.Gap( 'right' ),
			]
		}
		
		@ $mol_action
		page_add() {
			const land = this.yard().land_grab()
			this.$.$mol_dom_context.location.href = this.$.$mol_state_arg.link({ '': land.id() })
			this.bookmarks_node()!.add( land.id() )
			this.editing( true )
		}
		
		@ $mol_action
		side_add( id: $mol_int62_string ) {
			
			const book = this.side( id )
			
			const page = book.world()!.Fund( $hyoo_page_side ).make()
			this.$.$mol_dom_context.location.href = this.$.$mol_state_arg.link({ '': page.id() })
			
			page.steal_rights( book )
			page.book( book )
			
			this.bookmarks_node()!.add( page.id() )
			this.editing( true )
			
		}
		
		@ $mol_mem
		@ $mol_action
		ref_track() {
			
			const ref = this.$.$mol_dom_context.document.referrer
			if( !ref ) return
			
			const key = `${this}.ref_track`
			if( this.$.$mol_state_session.value( key ) ) return
			
			this.side_current().referrers_track( ref )
			this.$.$mol_state_session.value( key, true )
			
		}
		
	}
	
}
