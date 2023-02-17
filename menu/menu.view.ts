namespace $.$$ {
	export class $hyoo_page_menu extends $.$hyoo_page_menu {
		
		title() {
			return super.title() || this.title_default()
		}
		
		
		@ $mol_action
		item_moved( id: $mol_int62_string ) {
			
			const page = this.item( id ).as( $hyoo_page_side )
			
			page.book()?.pages_node().drop( id )
			page.book( null )
			
		}
		
	}
}

