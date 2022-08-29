namespace $.$$ {
	
	export class $hyoo_page extends $.$hyoo_page {
		
		@ $mol_mem_key
		file( id: $mol_int62_string ) {
			return this.store().land( id )
		}
		
		@ $mol_mem_key
		side( id: $mol_int62_string ) {
			return $hyoo_page_side.make({
				land: ()=> this.file( id )
			})
		}
		
		@ $mol_action
		add() {
			const land = this.store().grab( $hyoo_crowd_peer_level.get, $hyoo_crowd_peer_level.mod )
			this.$.$mol_dom_context.location.href = '#!=' + land.id()
			this.editable( true )
		}
		
		profile_id() {
			return this.store().peer().id
		}
		
		side_id( id: $mol_int62_string ) {
			return id
		}
		
		@ $mol_mem
		editable( next?: boolean ) {
			if( !this.side_current().editable() ) return false
			return this.$.$mol_state_history.value( 'edit', next ) ?? false
		}
		
		edit_close() {
			this.editable( false )
		}
		
		side_current() {
			return this.side( ( this.$.$mol_state_arg.value( '' ) || 'a3p17r_9ds9n6' ) as $mol_int62_string )
		}
		
		side_title( id: $mol_int62_string, next?: string ) {
			return this.side( id ).title( next )
		}
		side_title_selection( id: $mol_int62_string, next?: number[] ) {
			return this.side( id ).title_selection( next )
		}
		
		side_details( id: $mol_int62_string, next?: string ) {
			return this.side( id ).details( next )
		}
		side_details_selection( id: $mol_int62_string, next?: number[] ) {
			return this.side( id ).details_selection( next )
		}
		
		side_changed( id: $mol_int62_string, next?: $mol_time_moment ) {
			return this.side( id ).changed_moment( next ) ?? new $mol_time_moment
		}
		
		@ $mol_mem
		pages() {
			return [
				this.View_page( this.side_current().id() ),
				... this.editable() ? [ this.Edit_page( this.side_current().id() ) ] : [],
			]
		}
		
		Edit_toggle( id: $mol_int62_string ) {
			return this.side( id ).editable()
				? super.Edit_toggle( id )
				: null as any
		}
		
		auto() {
			this.store().sync()
		}
		
	}
	
}
