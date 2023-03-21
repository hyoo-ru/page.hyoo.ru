namespace $.$$ {
	export class $hyoo_page_side_menu extends $.$hyoo_page_side_menu {
		
		@ $mol_mem_key
		item_expanded( id: $mol_int62_string, next?: boolean ): boolean {
			const cur = this.side_current()
			const path = [ ... cur.books() ]
			if( cur.pages().length ) path.unshift( cur )
			return next ?? ( $mol_mem_cached( ()=> this.item_expanded( id ) ) || path.some( book => book.id() === id ) )
		}
		
		@ $mol_action
		item_moved( what: $mol_int62_string, where: $mol_int62_string | null ) {
			
			const page = this.item( what ).as( $hyoo_page_side )
			const book_next = where ? this.item( where ).as( $hyoo_page_side ) : null
			
			const book_prev = page.book()
			if( book_prev !== book_next ) book_prev?.pages_node().drop( what )
			page.book( book_next )
			
		}
		
	}
}
