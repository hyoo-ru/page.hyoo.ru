namespace $.$$ {
	
	export class $hyoo_page extends $.$hyoo_page {
		
		@ $mol_action
		add() {
			const land = this.store().land_grab( $hyoo_crowd_peer_level.get, $hyoo_crowd_peer_level.mod )
			this.$.$mol_dom_context.location.href = '#!=' + land.id()
			this.side_bookmark( land.id(), true )
			this.editing( true )
		}
		
		@ $mol_mem
		profile() {
			return this.store().home()
		}
		
		profile_id() {
			return this.store().peer().id
		}
		
		@ $mol_mem
		editing( next?: boolean ) {
			return this.$.$mol_state_history.value( 'edit', next ) ?? false
		}
		
		@ $mol_mem
		info( next?: boolean ) {
			return this.$.$mol_state_history.value( 'info', next ) ?? false
		}
		
		edit_close() {
			this.editing( false )
		}
		
		info_close() {
			this.info( false )
		}
		
		side_current() {
			return this.side( ( this.$.$mol_state_arg.value( '' ) || 'bt5te_na0xac' ) as $mol_int62_string )
		}
		
		@ $mol_mem
		pages() {
			const id = this.side_current().id()
			return [
				this.Menu_page(),
				this.View_page( id ),
				... this.editing() ? [ this.Edit_page( id ) ] : [],
				... this.info() ? [ this.Info_page( id ) ] : [],
			]
		}
		
		Edit_toggle( id: $mol_int62_string ) {
			return this.side_editable( id )
				? super.Edit_toggle( id )
				: null as any
		}
		
		@ $mol_mem
		bookmarks_filtered() {
			return this.bookmarks().filter( $mol_match_text(
				this.menu_filter(),
				id => [ this.side_title( id ) ],
			) )
		}
		
		
		@ $mol_mem
		menu() {
			const bookmarks = this.bookmarks()
			return [
				... bookmarks.length > 2 ? [ this.Menu_filter() ] : [],
				... this.bookmarks_filtered().map( id => this.Menu_item( id ) )
			]
		}
		
		menu_item_id( id: $mol_int62_string ) {
			return id
		}
		
		menu_item_arg( id: $mol_int62_string ) {
			return { '': id }
		}
		
		menu_item_title( id: $mol_int62_string ) {
			return this.side( id ).title()
		}
		
		@ $mol_mem
		bookmarks( next?: $mol_int62_string[] ) {
			const node = this.profile().chief.sub( 'bookmarks', $hyoo_crowd_list )
			return node.list( next ) as $mol_int62_string[]
		}
		
		@ $mol_mem_key
		side_bookmark( id: $mol_int62_string, next?: boolean ) {
			return this.bookmarks(
				next?.valueOf && ( next
					? [ id, ... this.bookmarks() ]
					: this.bookmarks().filter( i => i !== id )
				)
			).includes( id )
		}
		
		@ $mol_mem_key
		ref_list( id: $mol_int62_string ) {
			return this.side( id ).referrers().keys().map( uri => this.Ref_item([ id, uri ]) )
		}
		
		ref_uri( [ id, uri ]: [ $mol_int62_string, string ] ) {
			return uri
		}
		
		@ $mol_mem_key
		ref_stat( [ id, uri ]: [ $mol_int62_string, string ] ) {
			return this.side( id ).referrers().sub( uri, $hyoo_crowd_list ).list().length
		}
		
		@ $mol_mem
		ref_track() {
			const ref = this.$.$mol_dom_context.document.referrer
			const self = this.$.$mol_dom_context.document.location.href.replace( /#.*$/, '' )
			if( ref === self ) return
			if( ref ) this.side_current().referrers().sub( ref, $hyoo_crowd_list ).add( this.profile_id() )
		}
		
	}
	
}
