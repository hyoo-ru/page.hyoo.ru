namespace $.$$ {
	export class $hyoo_page_side_menu extends $.$hyoo_page_side_menu {
		
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
