namespace $.$$ {
	
	export class $hyoo_page extends $.$hyoo_page {
		
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
		
		side( id: $mol_int62_string ) {
			return this.yard().world().Fund( $hyoo_page_side ).Item( id )
		}
		
		@ $mol_mem
		side_current_id() {
			return ( this.$.$mol_state_arg.value( '' ) || this.side_main_id() ) as $mol_int62_string
		}
		
		side_current() {
			return this.side( this.side_current_id() )
		}
		
		@ $mol_mem_key
		side_menu_showed( id: $mol_int62_string, next?: boolean ) {
			return next ?? ( ( this.side( id ).book() ?? this.side_current() ).files().length ) > 0
		}
		
		@ $mol_mem
		pages() {
			const id = this.side_current_id()
			return [
				this.Gap( 'left'),
				... this.side_menu_showed( id ) ? [ this.Side_menu( this.side_current().book()?.id() ?? id ) ] : [],
				this.View( id ),
				... this.info() ? [ this.Info( id ) ] : [],
				... this.editing() ? [ this.Edit( id ) ] : [],
				... this.rights() ? [ this.Rights( id ) ] : [],
				this.Gap( 'right' ),
			]
		}
		
	}
	
}
