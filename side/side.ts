namespace $.$$ {
	
	export class $hyoo_page_side extends $hyoo_crowd_struct {
		
		id() {
			return this.land.id()
		}
		
		@ $mol_mem
		editable() {
			return this.land.allowed_mod()
		}
		
		@ $mol_mem
		referrers_node() {
			return this.yoke(
				'referrers',
				$hyoo_crowd_dict,
				[''],
				[],
				['0_0']
			)
		}
		@ $mol_mem
		referrers_list() {
			return this.referrers_node()?.keys() ?? []
		}
		@ $mol_mem_key
		referrers_stat( uri: string ) {
			return this.referrers_node()?.sub( uri, $hyoo_crowd_list ).list().length ?? 0
		}
		@ $mol_action
		referrers_track( uri: string ) {
			return this.referrers_node()?.sub( uri, $hyoo_crowd_list ).add( this.land.peer().id )
		}
		
		@ $mol_mem
		title_node() {
			return this.sub( 'title', $hyoo_crowd_text )
		}
		@ $mol_mem
		title( next?: string ) {
			return this.title_node().str( next )
		}
		@ $mol_mem
		title_selection( next?: number[] ) {
			return this.title_node().selection( this.land.peer().id, next )
		}

		@ $mol_mem
		details_node() {
			return this.yoke( 'details', $hyoo_crowd_text )
		}
		@ $mol_mem
		details( next?: string ) {
			const land = this.details_node()?.land
			if( land?.allowed_mod() ) {
				land?.chief.sub( '$hyoo_page_side', $hyoo_crowd_reg ).str( this.id() )
			}
			return this.details_node()?.text( next ) ?? ''
		}
		@ $mol_mem
		details_selection( next?: number[] ) {
			return this.details_node()?.selection( this.land.peer().id, next ) ?? [ 0, 0 ]
		}

		@ $mol_mem
		release_node() {
			return this.yoke( 'release', $hyoo_crowd_blob )
		}
		@ $mol_mem
		release( next?: string ) {
			return this.release_node()?.str( next ) ?? ''
		}
		
		@ $mol_mem
		released() {
			return this.release_node() && ( this.release() === this.details() ) || false
		}
		@ $mol_action
		publish() {
			this.release( this.details() )
		}
		
		@ $mol_mem
		content() {
			return this.release() || this.details()
		}
		
		@ $mol_mem
		changed_moment( next?: $mol_time_moment ) {
			return new $mol_time_moment( this.details_node()?.land.last_stamp()! )
		}
		
		book( next?: $mol_int62_string ) {
			return $mol_int62_string_ensure( this.sub( 'book', $hyoo_crowd_reg ).str( next ) )
		}
		
		bookmarks( next?: readonly $mol_int62_string[] ) {
			const node = this.sub( 'bookmarks', $hyoo_crowd_list )
			return node.list( next ) as $mol_int62_string[]
		}
		
		@ $mol_mem_key
		bookmarked( id: $mol_int62_string, next?: boolean ) {
			return this.bookmarks(
				next?.valueOf && ( next
					? [ ... this.bookmarks(), id ]
					: this.bookmarks().filter( i => i !== id )
				)
			).includes( id )
		}
		
		@ $mol_mem
		editors() {
			return this.land.peers()
		}
		
		@ $mol_mem
		authors() {
			return [ ... this.details_node()?.land.authors() ?? [] ]
		}
		
		steal_rights( side: $hyoo_page_side ) {
			this.land.steal_rights( side.land )
		}
		
	}

}
