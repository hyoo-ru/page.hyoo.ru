namespace $.$$ {
	export class $hyoo_page_side_menu extends $.$hyoo_page_side_menu {
		
		@ $mol_action
		item_moved( id: $mol_int62_string ) {
			
			const page = this.item( id ).as( $hyoo_page_side )
			
			const book_prev = page.book()
			const book_next = this.side()
			if( book_prev === book_next ) return
			
			book_prev?.pages_node().drop( id )
			page.book( book_next )
			
		}
		
	}
}
