namespace $.$$ {
	
	export class $hyoo_page extends $.$hyoo_page {
		
		@ $mol_mem_key
		file( id: string ) {
			return this.store().land( $mol_int62_from_string( id ) )
		}
		
		@ $mol_mem_key
		note( id: string ) {
			return $hyoo_page_note.make({
				land: ()=> this.file( id )
			})
		}
		
		@ $mol_action
		add() {
			
			const land = this.store().grab( $hyoo_crowd_peer_level.get, $hyoo_crowd_peer_level.mod )
			const id = $mol_int62_to_string( land.id() )
			
			this.$.$mol_dom_context.location.href = '#!=' + id
			this.editable( true )
			
		}
		
		@ $mol_mem
		profile_arg() {
			return {
				'': $mol_int62_to_string( this.store().peer().id )
			}
		}
		
		@ $mol_mem
		note_id() {
			return this.$.$mol_state_arg.value( '' ) || 'f4avo9_nr8ub1'
		}
		
		@ $mol_mem
		editable( next?: boolean ) {
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
				this.View_page(),
				... this.editable() ? [ this.Edit_page() ] : [],
			]
		}
		
		auto() {
			this.store().sync()
		}
		
	}
	
}
