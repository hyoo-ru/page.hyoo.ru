namespace $.$$ {
	
	export class $hyoo_page_side_edit extends $.$hyoo_page_side_edit {
		
		publish() {
			this.side().publish()
		}
		
		download_name() {
			return super.download_name().replace( '{filename}', this.title() )
		}

		download_blob() {
			return new $mol_dom_context.Blob(
				[ this.details() ],
				{ type: 'text/markdown' },
			)
		}
		
		copy_html() {
			return this.$.$hyoo_marked_to_html( `= ${ this.title() }\n${ this.details() }` )
		}
		
		copy_md() {
			return this.details()
				.replaceAll( /^=+ /gm, ( prefix: string )=> prefix.replaceAll( '=', '#' ) ) // heading
				.replaceAll( /^(" )+/gm, ( prefix: string )=> prefix.replaceAll( '" ', '> ' ) ) // quotes
		}
		
	}
	
}
