namespace $.$$ {
	
	export class $hyoo_page_side_edit extends $.$hyoo_page_side_edit {
		
		publish() {
			this.side().publish()
		}
		
		@ $mol_mem
		permalink() {
			return this.$.$mol_state_arg.make_link({ '': this.side().id() })
		}
		
		export_sign() {
			return super.export_sign().replace( '{link}', this.permalink() )
		}

		download_name() {
			return super.download_name().replace( '{filename}', this.title() )
		}

		download_blob() {
			return new $mol_dom_context.Blob(
				[ `${ this.permalink() }\n\n${ this.details() }` ],
				{ type: 'text/markdown' },
			)
		}
		
		copy_html() {
			return this.$.$hyoo_marked_to_html( `= ${ this.title() }\n\n${ this.details() }\n\n${ this.export_sign() }` )
		}
		
		copy_md() {
			return this.details()
				.replaceAll( /^=+ /gm, ( prefix: string )=> prefix.replaceAll( '=', '#' ) ) // heading
				.replaceAll( /^(" )+/gm, ( prefix: string )=> prefix.replaceAll( '" ', '> ' ) ) // quotes
		}
		
	}
	
}
