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
			
			let details = this.details() + '\n'
			
			const visit = ( book: $hyoo_page_side )=> {
				
				details += '--\n\n'
				details += '= ' + book.title() + '\n\n'
				details += book.details().replace( /^(=+) /gm, '=$1 ' ) + '\n'
				
				for( const page of book.pages() ) visit( page )
				
			}
			
			for( const page of this.side().pages() ) visit( page )
			
			return new $mol_dom_context.Blob(
				[ `${ this.permalink() }\n\n${ details }` ],
				{ type: 'text/x-marked' },
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
