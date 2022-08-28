namespace $.$$ {
	
	export class $hyoo_page extends $.$hyoo_page {
		
		@ $mol_mem_key
		file( id: $mol_int62_string ) {
			return this.store().land( id )
		}
		
		@ $mol_mem_key
		note( id: $mol_int62_string ) {
			return $hyoo_page_note.make({
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
		
		@ $mol_mem
		note_id() {
			return ( this.$.$mol_state_arg.value( '' ) || 'a3p17r_9ds9n6' ) as $mol_int62_string
		}
		
		@ $mol_mem
		editable( next?: boolean ) {
			if( !this.note_current().editable() ) return false
			return this.$.$mol_state_history.value( 'edit', next ) ?? false
		}
		
		edit_close() {
			this.editable( false )
		}
		
		note_current() {
			return this.note( this.note_id() )
		}
		
		title() {
			return this.note_title() || this.note_id()
		}
		
		note_title( next?: string ) {
			return this.note_current().title( next )
		}
		note_title_selection( next?: number[] ) {
			return this.note_current().title_selection( next )
		}
		
		
		note_details( next?: string ) {
			return this.note_current().details( next )
		}
		note_details_selection( next?: number[] ) {
			return this.note_current().details_selection( next )
		}
		
		note_changed_moment( next?: $mol_time_moment ) {
			return this.note_current().changed_moment( next ) ?? new $mol_time_moment
		}
		
		@ $mol_mem
		pages() {
			return [
				this.View_page( this.note_id() ),
				... this.editable() ? [ this.Edit_page() ] : [],
			]
		}
		
		Edit_toggle() {
			return this.note_current().editable()
				? super.Edit_toggle()
				: null as any
		}
		
		auto() {
			this.store().sync()
		}
		
	}
	
}
