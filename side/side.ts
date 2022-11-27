namespace $.$$ {
	
	export class $hyoo_page_side extends $mol_object {
		
		land() {
			return null as any as $hyoo_crowd_land
		}
		
		id() {
			return this.land().id()
		}
		
		toJSON() {
			return this.id()
		}
		
		@ $mol_mem
		editable() {
			return this.land().level( this.land().peer().id ) >= $hyoo_crowd_peer_level.add
		}
		
		@ $mol_mem
		referrers_node() {
			return this.land().chief.yoke(
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
			return this.referrers_node()?.sub( uri, $hyoo_crowd_list ).add( this.land().peer().id )
		}
		
		@ $mol_mem
		title_node() {
			return this.land().chief.sub( 'title', $hyoo_crowd_text )
		}
		@ $mol_mem
		title( next?: string ) {
			return this.title_node().str( next )
		}
		@ $mol_mem
		title_selection( next?: number[] ) {
			return this.title_node().selection( this.land().peer().id, next )
		}

		@ $mol_mem
		details_node() {
			return this.land().chief.yoke(
				'details',
				$hyoo_crowd_text,
			)
		}
		@ $mol_mem
		details( next?: string ) {
			if( this.details_node()?.land.level( '' ) ?? 0 >= $hyoo_crowd_peer_level.mod ) {
				this.details_node()?.land.chief.sub( '$hyoo_page_side', $hyoo_crowd_reg ).str( this.id() )
			}
			return this.details_node()?.text( next ) ?? ''
		}
		@ $mol_mem
		details_selection( next?: number[] ) {
			return this.details_node()?.selection( this.land().peer().id, next ) ?? [ 0, 0 ]
		}

		@ $mol_mem
		changed_moment( next?: $mol_time_moment ) {
			return new $mol_time_moment( this.details_node()?.land.last_stamp()! )
		}
		
		bookmarks( next?: readonly $mol_int62_string[] ) {
			const node = this.land().chief.sub( 'bookmarks', $hyoo_crowd_list )
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
			return this.land().peers()
		}
		
		@ $mol_mem
		authors() {
			return [ ... this.details_node()?.land.authors() ?? [] ]
		}
		
	}

}
