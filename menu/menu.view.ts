namespace $.$$ {
	
	export class $hyoo_page_menu extends $.$hyoo_page_menu {
		
		@ $mol_mem
		content() {
			const bookmarks = this.bookmarks()
			return [
				... bookmarks.length > 2 ? [ this.Filter() ] : [],
				... this.bookmarks_filtered().map( id => this.Bookmark( id ) )
			]
		}
		
		@ $mol_mem
		bookmarks_filtered() {
			
			if( this.filter() ) {
				const yard = this.yard()
				return yard.land_search( this.filter() ).map( id => {
					const land = yard.land( id )
					id = land.chief.sub( '$hyoo_page_side', $hyoo_crowd_reg ).str() as $mol_int62_string || id
					return id
				} )
			}
			
			return this.bookmarks().filter( $mol_match_text(
				this.filter(),
				id => [ this.bookmark_title( id ) ],
			) ).reverse()
			
		}
		
	}
	
}
