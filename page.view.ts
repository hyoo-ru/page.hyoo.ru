namespace $.$$ {
	
	export class $hyoo_page extends $.$hyoo_page {
		
		@ $mol_action
		add() {
			const land = this.store().land_grab( $hyoo_crowd_peer_level.law, $hyoo_crowd_peer_level.get )
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
		rights( next?: boolean ) {
			return this.$.$mol_state_history.value( 'rights', next ) ?? false
		}
		
		@ $mol_mem
		info( next?: boolean ) {
			return this.$.$mol_state_history.value( 'info', next ) ?? false
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
		
		side_current() {
			return this.side( ( this.$.$mol_state_arg.value( '' ) || this.side_main_id() ) as $mol_int62_string )
		}
		
		@ $mol_mem
		pages() {
			const id = this.side_current().id()
			return [
				this.Menu_page(),
				this.View_page( id ),
				... this.editing() ? [ this.Edit_page( id ) ] : [],
				... this.info() ? [ this.Info_page( id ) ] : [],
				... this.rights() ? [ this.Rights_page( id ) ] : [],
			]
		}
		
		@ $mol_mem_key
		view_page_head( side: $mol_int62_string ) {
			return [
				this.View_title( side ),
				this.View_tools( side ),
				... this.search_show( side ) ? [ this.View_search( side ) ] : [],
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
			) ).reverse()
		}
		
		
		@ $mol_mem_key
		search_show( side: $mol_int62_string, next = false ) {
			if( next === true ) this.View_search( side ).bring()
			if( next === false ) this.view_search( side, '' )
			return next
		}
		
		search_start( event?: KeyboardEvent ) {
			this.search_show( this.side_current().id(), true )
			event?.preventDefault()
		}
		
		search_stop( side: $mol_int62_string, event?: KeyboardEvent ) {
			this.search_show( side, false )
			this.Search_toggle( side ).focused( true )
			event?.preventDefault()
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
					? [ ... this.bookmarks(), id ]
					: this.bookmarks().filter( i => i !== id )
				)
			).includes( id )
		}
		
		@ $mol_mem_key
		ref_list( id: $mol_int62_string ) {
			return this.side( id ).referrers_list().map( uri => this.Ref_item([ id, uri ]) )
		}
		
		ref_uri( [ id, uri ]: [ $mol_int62_string, string ] ) {
			return uri
		}
		
		@ $mol_mem_key
		ref_stat( [ id, uri ]: [ $mol_int62_string, string ] ) {
			return this.side( id ).referrers_stat( uri )
		}
		
		@ $mol_mem
		ref_track() {
			const ref = this.$.$mol_dom_context.document.referrer
			const self = this.$.$mol_dom_context.document.location.href.replace( /#.*$/, '' )
			if( ref === self ) return
			if( ref ) $mol_wire_sync( this as $hyoo_page ).side_current().referrers_track( ref )
		}
		
		
		@ $mol_mem_key
		weight( side: $mol_int62_string ) {
			const details = this.side( side ).details_node()
			const units = details?.land.delta()
			const weight = units?.reduce( ( sum, unit )=> {
				return sum + $hyoo_crowd_unit_bin.from_unit( unit ).byteLength
			} , 0 ) ?? 0
			return $mol_si_short( weight, 'B' )
		}
		
		@ $mol_mem_key
		word_stat( id: $mol_int62_string ) {
			
			const stat = new Map< string, number >()
			const words = ( this.side_details( id ).match( /\p{Letter}{2,}/ug ) ?? [] )
			
			for( const word of words ) {
				stat.set( word, ( stat.get( word ) ?? 0 ) + 1 )
			}
			
			return stat
		}
		
		@ $mol_mem_key
		word_list_items( side: $mol_int62_string ) {
			
			const stat = [ ... this.word_stat( side ) ].filter( ([ word, stat ])=> stat > 2 )
			stat.sort( ( left, right )=> right[1] - left[1] )
			
			return stat.map( ([ word ])=> this.Word_item([ side, word ]) )
		}
		
		word_item_text( [ side, word ]: readonly[ $mol_int62_string, string ] ) {
			return word
		}
		
		word_item_stat( [ side, word ]: readonly[ $mol_int62_string, string ] ) {
			return this.word_stat( side ).get( word )!
		}
		
		
		peer_id( [ side, peer ]: [ $mol_int62_string, $mol_int62_string ] ) {
			return peer
		}
		
		peer_name( [ side, peer ]: [ $mol_int62_string, $mol_int62_string ] ) {
			if( peer === '0_0' ) return super.peer_name([ side, peer ])
			return this.side( peer ).title()
		}
		
		
		@ $mol_mem_key
		author_list( side: $mol_int62_string ) {
			return [ ... this.side_authors( side ) ].map( peer => this.Author_link([ side, peer ]) )
		}
		
		
		@ $mol_mem_key
		editor_list( side: $mol_int62_string ) {
			return this.side_editors( side ).map( peer => this.Editor_link([ side, peer ]) )
		}
		
		@ $mol_mem_key
		editor_add_id( id: $mol_int62_string, next = '' ) {
			return ( next.trim().match( /^(?:.*=)?([0-9a-z]+_[0-9a-z]+)/ )?.[1] ?? '' ) as $mol_int62_string
		}
		
		editor_add_filled( id: $mol_int62_string ) {
			return Boolean( this.editor_add_id( id ) )
		}
		
		editor_add_bid( id: $mol_int62_string ) {
			return this.editor_add_filled( id ) ? super.editor_add_bid( id ) : ''
		}
		
		editor_fill_all( id: $mol_int62_string ) {
			this.editor_add_id( id, '0_0' )
		}
		
		editor_add_submit( id: $mol_int62_string ) {
			const side = this.side( id )
			const peer = this.editor_add_id( id )
			side.land().level( peer, $hyoo_crowd_peer_level.mod )
			side.details_node()?.land.level( peer, $hyoo_crowd_peer_level.mod )
			this.editor_add_id( id, '' )
		}
		
	}
	
}
