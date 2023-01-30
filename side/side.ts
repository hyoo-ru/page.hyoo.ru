namespace $.$$ {
	
	export class $hyoo_page_side extends $hyoo_meta_model {
		
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
		details_node() {
			return this.yoke( 'details', $hyoo_crowd_text )
		}
		@ $mol_mem
		details( next?: string ) {
			const land = this.details_node()?.land
			if( land?.allowed_mod() ) {
				this.world()!.Fund( $hyoo_meta_model ).Item( land.id() ).whole( this )
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
			
			const book = this.book()
			if( book && !book.bookmarked( this.id() ) ) return false
			
			return this.release_node() && ( this.release() === this.details() ) || false
			
		}
		@ $mol_action
		publish() {
			this.release( this.details() )
			this.book()?.bookmarked( this.id(), true )
		}
		
		@ $mol_mem
		content() {
			return this.release() || this.details()
		}
		
		@ $mol_mem
		changed_moment( next?: $mol_time_moment ) {
			return new $mol_time_moment( this.details_node()?.land.last_stamp()! )
		}
		
		@ $mol_mem_key
		book( next?: $hyoo_page_side ) {
			const id = $mol_int62_string_ensure( this.sub( 'book', $hyoo_crowd_reg ).str( next?.id() ) )
			return id ? this.world()!.Fund( $hyoo_page_side ).Item( id ) : null
		}
		
		@ $mol_mem
		bookmarks_node( next?: readonly $hyoo_page_side[] ) {
			return this.sub( 'bookmarks', $hyoo_crowd_list )
		}
		
		@ $mol_mem
		bookmarks( next?: readonly $hyoo_page_side[] ) {
			const node = this.bookmarks_node()
			const ids = node.list( next?.map( side => side.id() ) ) as $mol_int62_string[]
			const Fund = this.world()!.Fund( $hyoo_page_side )
			return ids.map( id => Fund.Item( id ) )
		}
		
		@ $mol_mem
		pages_node() {
			const pages = this.sub( 'pages', $hyoo_crowd_list )
			if( this.editable() ) {
				for( const bookmark of this.bookmarks() ) {
					if( bookmark.book() !== this ) continue
					pages.add( bookmark.id() )
				}
			}
			return pages
		}
		
		@ $mol_mem
		pages( next?: readonly $hyoo_page_side[] ) {
			const node = this.pages_node()
			const ids = node.list( next?.map( side => side.id() ) ) as $mol_int62_string[]
			const Fund = this.world()!.Fund( $hyoo_page_side )
			return ids.map( id => Fund.Item( id ) )
		}
		
		@ $mol_mem_key
		bookmarked( id: $mol_int62_string, next?: boolean ) {
			
			const node = this.sub( 'bookmarks', $hyoo_crowd_list )
			if( next === undefined ) return node.list().includes( id )
			
			if( next ) node.add( id )
			else node.drop( id )
			
			return next
		}
		
		@ $mol_mem
		editors() {
			return this.land.peers()
		}
		
		@ $mol_mem
		authors() {
			return [ ... this.details_node()?.land.authors() ?? [] ]
		}
		
	}

}
