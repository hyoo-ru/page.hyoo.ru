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
			
			let details = this.content_full()
				// .replaceAll( /^=+ /gm, ( prefix: string )=> prefix.replaceAll( '=', '#' ) ) // MD heading
				// .replaceAll( /^(" )+/gm, ( prefix: string )=> prefix.replaceAll( '" ', '> ' ) ) // MD quotes
				.replaceAll(
					/\\\\(?:([^\\]+?)\\)?([^\\]+?)\\\\/gm,
					( whole: string, title: string, link: string )=> title
						? `\\\\${title}\\${ view.uri_resolve( link ) }\\\\`
						: `\\\\${ view.uri_resolve( link ) }\\\\`
				)
			
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
