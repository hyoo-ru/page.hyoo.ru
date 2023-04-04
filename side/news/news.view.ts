namespace $.$$ {
	
	export class $hyoo_page_side_news extends $.$hyoo_page_side_news {
		
		@ $mol_mem
		items() {
			return this.news().map( item => this.Item( item ) )
		}
		
		item( side: $hyoo_page_side ) {
			return side
		}
		
	}
	
}
