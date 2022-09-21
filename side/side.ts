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
				$hyoo_crowd_peer_level.law,
				$hyoo_crowd_peer_level.add,
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
				$hyoo_crowd_peer_level.law,
				$hyoo_crowd_peer_level.get,
			)
		}
		@ $mol_mem
		details( next?: string ) {
			return this.details_node()?.text( next ) ?? ''
		}
		@ $mol_mem
		details_selection( next?: number[] ) {
			return this.details_node()?.selection( this.land().peer().id, next ) ?? [ 0, 0 ]
		}

		@ $mol_mem
		changed_moment( next?: $mol_time_moment ) {
			return new $mol_time_moment( this.details_node()?.land.clock_data.last_stamp() )
		}
		
		@ $mol_mem
		editors() {
			return this.land().lords()
		}
		
		@ $mol_mem
		authors() {
			return this.details_node()?.land.authors() ?? []
		}

		@ $mol_mem
		issues( next?: $hyoo_talks_chat[] ): readonly $hyoo_talks_chat[] {
			const ids = this.land().chief.sub( 'issues', $hyoo_crowd_list )
				.list( next && next.map( m => m.id ) ) as readonly $mol_int62_string[]
			
			const domain = this.$.$hyoo_talks_domain
			return ids.map( id => domain.Chat( id ) )
		}

	}

}
