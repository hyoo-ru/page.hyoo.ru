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
			const book = this.side_current_book()
			const key = `aura_showing:${ book.id() }`
			return this.$.$mol_state_local.value( key, next?.toString() ) !== 'false'
		}
		
		@ $mol_mem
		aura_image() {
			
			if( !this.aura_showing() ) return ''
			
			const side = this.side_current()
			const aura = side.aura_effective()
			if( !aura ) return ''
			
			const shade = 'hsla( 0deg, 0%, calc( 50% + var(--mol_theme_luma) * 50% ), .666 )'
			return `linear-gradient( ${shade}, ${shade} ), url("${ aura }")`
			
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
		side_books() {
			const books = []
			let cur = this.side_current() as $hyoo_page_side | null
			while( cur ) {
				if( cur.pages().length || this.side_menu_showed() ) books.push( cur )
				cur = cur.book()
			}
			return books.reverse()
		}
		
		@ $mol_mem
		side_menu_showed( next?: boolean ) {
			return next ?? this.side_current().pages().length > 0
		}
		
		@ $mol_mem
		pages() {
			const id = this.side_current_id()
			return [
				this.Gap( 'left' ),
				... this.side_books().slice( 0, 1 ).map( book => this.Side_menu( book.id() ) ),
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
			this.$.$mol_dom_context.location.href = '#!=' + land.id()
			this.bookmarks_node().add( land.id() )
			this.editing( true )
		}
		
		@ $mol_action
		side_add( id: $mol_int62_string ) {
			
			const book = this.side( id )
			
			const page = book.world()!.Fund( $hyoo_page_side ).make()
			this.$.$mol_dom_context.location.href = '#!=' + page.id()
			
			page.steal_rights( book )
			page.book( book )
			
			this.bookmarks_node().add( page.id() )
			this.editing( true )
			
		}
		
	}
	
}
