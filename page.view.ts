namespace $.$$ {
	
	export class $hyoo_page extends $.$hyoo_page {
		
		@ $mol_action
		add() {
			const land = this.yard().land_grab()
			this.$.$mol_dom_context.location.href = '#!=' + land.id()
			this.profile().bookmarked(  land.id(), true )
			this.editing( true )
		}
		
		@ $mol_mem
		profile() {
			return this.side( this.yard().home().id() )
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
		
		@ $mol_mem
		side_current_id() {
			return ( this.$.$mol_state_arg.value( '' ) || this.side_main_id() ) as $mol_int62_string
		}
		
		side_current() {
			return this.side( this.side_current_id() )
		}
		
		@ $mol_mem
		pages() {
			const id = this.side_current_id()
			return [
				this.Menu(),
				this.View( id ),
				... this.editing() ? [ this.Edit( id ) ] : [],
				... this.rights() ? [ this.Rights( id ) ] : [],
				... this.info() ? [ this.Info( id ) ] : [],
			]
		}
		
	}
	
}
