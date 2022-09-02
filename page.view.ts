namespace $.$$ {
	
	export class $hyoo_page extends $.$hyoo_page {
		
		@ $mol_action
		add() {
			const land = this.store().land_grab( $hyoo_crowd_peer_level.get, $hyoo_crowd_peer_level.mod )
			this.$.$mol_dom_context.location.href = '#!=' + land.id()
			this.editing( true )
		}
		
		profile_id() {
			return this.store().peer().id
		}
		
		@ $mol_mem
		editing( next?: boolean ) {
			return this.$.$mol_state_history.value( 'edit', next ) ?? false
		}
		
		edit_close() {
			this.editing( false )
		}
		
		side_current() {
			return this.side( ( this.$.$mol_state_arg.value( '' ) || 'bt5te_na0xac' ) as $mol_int62_string )
		}
		
		@ $mol_mem
		pages() {
			return [
				this.View_page( this.side_current().id() ),
				... this.editing() ? [ this.Edit_page( this.side_current().id() ) ] : [],
			]
		}
		
		Edit_toggle( id: $mol_int62_string ) {
			return this.side_editable( id )
				? super.Edit_toggle( id )
				: null as any
		}
		
	}
	
}
