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
			return this.bookmarks().filter( $mol_match_text(
				this.filter(),
				id => [ this.bookmark_title( id ) ],
			) ).reverse()
		}
		
	}
	
}
