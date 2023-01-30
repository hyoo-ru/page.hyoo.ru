namespace $.$$ {
	
	export class $hyoo_page_side_avatar extends $.$hyoo_page_side_avatar {
		
		title() {
			return this.id() === '0_0' ? this.all_name() : super.title() 
		}
		
	}
	
}
