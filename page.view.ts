namespace $.$$ {
	
	export class $hyoo_page extends $.$hyoo_page {
		
		@ $mol_mem
		profile() {
			return this.side( this.yard().home().id() )
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
			const book = this.side_current_book()
			const aura = side.aura() || book.aura()
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
		side_menu_showed( next?: boolean ) {
			return next ?? ( this.side_current_book().pages().length ) > 0
		}
		
		@ $mol_mem
		pages() {
			const id = this.side_current_id()
			return [
				this.Gap( 'left'),
				... this.side_menu_showed() ? [ this.Side_menu( this.side_current_book().id() ) ] : [],
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
		side_add() {
			
			const side = this.side_current()
			const book = side.book() ?? side
			const page = side.world()!.Fund( $hyoo_page_side ).make()
			
			page.steal_rights( book )
			book.pages_node().add( page.id() )
			page.book( book )
			
			this.$.$mol_dom_context.location.href = '#!=' + page.id()
			this.editing( true )
			
		}
		
		@ $mol_action
		side_menu_item_moved( id: $mol_int62_string ) {
			this.side( id ).book( this.side_current_book() )
		}
		
	}
	
}
