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

		copy_text() {
			
			const view = this.Details_edit().View()
			
			const normalize = ( text: string )=> text
				.replaceAll( /^=+ /gm, ( prefix: string )=> prefix.replaceAll( '=', '#' ) ) // MD heading
				.replaceAll( /^(" )+/gm, ( prefix: string )=> prefix.replaceAll( '" ', '> ' ) ) // MD quotes
				.replaceAll(
					/\\\\(?:([^\\]+?)\\)?([^\\]+?)\\\\/gm,
					( whole: string, title: string, link: string )=> title
						? `\\\\${title}\\${ view.uri_resolve( link ) }\\\\`
						: `\\\\${ view.uri_resolve( link ) }\\\\`
				)
			
			let details = `= ${ this.title() }\n\n${ normalize( this.details() ) }\n`
			
			const visit = ( book: $hyoo_page_side )=> {
				
				details += '--\n\n'
				details += '= ' + book.title() + '\n\n'
				details += normalize( book.details() ).replace( /^(=+) /gm, '=$1 ' ) + '\n'
				
				for( const page of book.pages().slice().reverse() ) visit( page )
				
			}
			
			for( const page of this.side().pages().slice().reverse() ) visit( page )
			
			return `${ details }--\n\n${ this.export_sign() }`
			
		}
		
		download_blob() {
			return new $mol_dom_context.Blob(
				[ this.copy_text() ],
				{ type: 'text/x-marked' },
			)
			
		}
		
		copy_html() {
			return this.$.$hyoo_marked_to_html( this.copy_text() )
		}
		
	}
	
}
