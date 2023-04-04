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
			
			const details = this.yoke( 'details', $hyoo_crowd_text )
			if( !details ) return details
			
			const land = details.land
			const meta = this.world()!.Fund( $hyoo_meta_model ).Item( land.id() )
			
			if( land.allowed_mod() ) meta.whole( this )
			meta.steal_rights( this )
			
			return details
		}
		@ $mol_mem
		details( next?: string ) {
			return this.details_node()?.text( next ) ?? ''
		}
		@ $mol_mem
		details_selection( next?: number[] ) {
			return this.details_node()?.selection( this.land.peer().id, next ) ?? [ 0, 0 ]
		}

		@ $mol_mem
		release_node() {
			
			const release = this.yoke( 'release', $hyoo_crowd_blob )
			release?.land.steal_rights( this.land )
			
			return release
		}
		@ $mol_mem
		release( next?: string ) {
			return this.release_node()?.str( next ) ?? ''
		}
		
		@ $mol_mem
		released() {
			
			const book = this.book()
			if( book && !book.pages_node().has( this.id() ) ) return false
			
			return this.release_node() && ( this.release() === this.details() ) || false
			
		}
		@ $mol_action
		publish() {
			this.release( this.details() )
			this.book()?.pages_node().add( this.id() )
		}
		
		@ $mol_mem
		content() {
			return this.release() || this.details()
		}
		
		@ $mol_mem
		changed_moment() {
			return new $mol_time_moment(
				( this.release_node() ?? this.details_node() )?.land.last_stamp()
			)
		}
		
		@ $mol_mem_key
		book( next?: $hyoo_page_side | null ) {
			const book_node = this.sub( 'book', $hyoo_crowd_reg )
			const id = $mol_int62_string_ensure( book_node.str( next?.id() ?? ( next === null ? '' : undefined ) ) )
			if( id === this.id() ) return null
			return id ? this.world()!.Fund( $hyoo_page_side ).Item( id ) : null
		}
		
		@ $mol_mem
		books() {
			const books = []
			let book = this.book()
			while( book ) {
				books.push( book )
				book = book.book()
			}
			return books as readonly $hyoo_page_side[]
		}
		
		@ $mol_mem
		bookmarks_node( next?: readonly $hyoo_page_side[] ) {
			
			const fresh =  this.yoke( '$hyoo_page_side:bookmarks', $hyoo_crowd_list )
			if( !fresh ) return fresh!
			
			const old = this.sub( 'bookmarks', $hyoo_crowd_list )
			for( const mark of old.list() ) {
				const id = $mol_int62_string_ensure( mark )
				if( id ) fresh.add( id )
				old.drop( id )
			}
			
			if( fresh.virgin() ) fresh.add( 'iy8wtn_tky6pc' )
			
			return fresh
		}
		
		@ $mol_mem
		bookmarks( next?: readonly $hyoo_page_side[] ) {
			
			const node = this.bookmarks_node()
			if( !node ) return []
			
			const ids = node.list( next?.map( side => side.id() ) ) as $mol_int62_string[]
			const Fund = this.world()!.Fund( $hyoo_page_side )
			return ids.map( id => Fund.Item( id ) )
			
		}
		
		@ $mol_mem
		pages_node() {
			const pages = this.sub( 'pages', $hyoo_crowd_list )
			// if( this.editable() ) {
			// 	for( const bookmark of this.bookmarks() ) {
			// 		if( bookmark.book() !== this ) continue
			// 		pages.add( bookmark.id() )
			// 	}
			// }
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
			
			const node = this.bookmarks_node()
			if( !node ) return false
			
			if( next === undefined ) return node.list().includes( id )
			
			if( next ) node.add( id )
			else node.drop( id )
			
			return next
		}
		
		@ $mol_mem
		authors() {
			return [ ... ( this.release_node() ?? this.details_node() )?.land.authors() ?? [] ]
		}
		
		@ $mol_mem
		aura( next?: string ): string {
			return this.sub( 'aura', $hyoo_crowd_reg ).str( next )
		}
		
		@ $mol_mem
		aura_effective(): string {
			return this.aura() || ( this.book()?.aura_effective() ?? '' )
		}
		
		
		@ $mol_mem
		history_node() {
			return this.yoke( '$mol_book_side:history', $hyoo_crowd_list )
		}
		
		history() {
			return this.history_node()!.set() as Set< $mol_int62_string >
		}
		
		history_add( id: $mol_int62_string ) {
			this.history_node()!.add( id )
		}
		
		@ $mol_mem
		news() {
			
			const history = this.history()
			const visited = new Set< $hyoo_page_side >()
			
			const found = [] as $hyoo_page_side[]
			const pages = [] as $hyoo_page_side[]
			const users = [ this ] as $hyoo_page_side[]
			
			while( found.length < 16 && ( pages.length || users.length ) ) {
				
				while( users.length ) {
					
					const user = users.shift()!
					
					if( visited.has( user ) ) continue
					visited.add( user )
					
					for( const page of user.pages().slice().reverse() ) {
						if( visited.has( page ) ) continue
						pages.push( page )
					}
				
					for( const mark of user.bookmarks().slice().reverse() ) {
						if( visited.has( mark ) ) continue
						pages.push( mark )
					}
					
					break
				}
				
				while( pages.length ) {
					
					const side = pages.shift()!
					if( visited.has( side ) ) continue
					
					if( history.has( side.id() ) ) {
						
						for( const page of side.pages().slice().reverse() ) {
							if( visited.has( page ) ) continue
							pages.push( page )
						}
						
					} else {
						
						visited.add( side )
						found.push( side )
						
						break
					}
					
				}
				
			}
			
			return found
		}
		
	}

}
