namespace $.$$ {
	
	export class $hyoo_page_side_rights extends $.$hyoo_page_side_rights {
		
		@ $mol_mem
		editor_list() {
			const side = this.side().id()
			return this.editors()
				.filter( peer => peer !== side )
				.map( peer => this.Editor_link( peer ) )
		}
		
		@ $mol_mem
		editor_add_rows() {
			return [
				this.Editor_add_bar(),
				this.editor_add_id() ? this.Editor_add_preview() : this.Editor_fill_all(),
			]
		}
		
		@ $mol_mem
		editor_add_id( next = '' ) {
			return ( next.trim().match( /^(?:.*=)?([0-9a-z]+_[0-9a-z]+)/ )?.[1] ?? '' ) as $mol_int62_string
		}
		
		editor_add_filled() {
			return Boolean( this.editor_add_id() )
		}
		
		editor_add_bid() {
			return this.editor_add_filled() ? super.editor_add_bid() : ''
		}
		
		editor_fill_all() {
			this.editor_add_id( '0_0' )
		}
		
		editor_add_submit() {
			
			const peer = this.editor_add_id()
			
			this.side().land.level( peer, $hyoo_crowd_peer_level.mod )
			this.details_node()?.land.level( peer, $hyoo_crowd_peer_level.mod )
			
			this.editor_add_id( '' )
			
		}
		
		editor_add_preview() {
			return this.peer( this.editor_add_id() )
		}

	}
	
}
