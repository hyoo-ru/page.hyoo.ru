namespace $.$$ {
	
	export class $hyoo_page_side_edit extends $.$hyoo_page_side_edit {
		
		publish() {
			this.side().publish()
		}
		
		download_md_name() {
			return super.download_md_name().replace( '{filename}', this.title() )
		}

		download_md_blob() {
			return new $mol_dom_context.Blob(
				[ this.details() ],
				{ type: 'text/markdown' },
			)
		}
		
	}
	
}
