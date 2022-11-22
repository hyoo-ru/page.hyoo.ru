namespace $.$$ {
	
	export class $hyoo_page_side_info extends $.$hyoo_page_side_info {
		
		@ $mol_mem
		slides_uri() {
			const source = this.$.$mol_state_arg.href() + '/'
			return super.slides_uri().replace( '{source}', encodeURIComponent( source ) )
		}
		
		
		@ $mol_mem
		ref_list() {
			return this.referrers_list().map( uri => this.Ref_item( uri ) )
		}
		
		ref_uri( uri: string ) {
			return uri
		}
		
		@ $mol_mem_key
		ref_stat( uri: string ) {
			return this.referrers_stat( uri )
		}
		
		
		@ $mol_mem
		weight() {
			
			const units = this.details_node()?.land.delta()
			
			const weight = units?.reduce( ( sum, unit )=> {
				return sum + $hyoo_crowd_unit_bin.from_unit( unit ).byteLength
			} , 0 ) ?? 0
			
			return $mol_si_short( weight, 'B' )
		}
		
		
		@ $mol_mem
		word_stat() {
			
			const stat = new Map< string, number >()
			const text = this.details().toLowerCase().replace( /\]\(.*?\)/g, '' )
			
			for( const match of text.matchAll( /\p{Letter}{2,}(?=((?:\P{Letter}\p{Letter}{2,})*))/ug ) ?? [] ) {
				const parts = match.join( '' ).match( /\P{Letter}?\p{Letter}{2,}/gu ) ?? []
				for( let i = 1; i <= parts.length; ++i ) {
					const word = parts.slice( 0, i ).join('')
					stat.set( word, ( stat.get( word ) ?? 0 ) + 1 )
				}
			}
			
			return stat
		}
		
		@ $mol_mem
		word_list_items() {
			
			const stat = [ ... this.word_stat() ].filter( ([ word, stat ])=> stat > 2 )
			stat.sort( ( left, right )=> right[1] - left[1] || right[0].length - left[0].length )
			
			return stat.map( ([ word ])=> this.Word_item( word ) )
		}
		
		word_item_text( word: string ) {
			return word
		}
		
		word_item_stat( word: string ) {
			return this.word_stat().get( word )!
		}
		
		
		@ $mol_mem
		size() {
			return $mol_si_short( $mol_text_profile( this.details() ).size, '' )
		}
		
		
		@ $mol_mem
		chars() {
			return $mol_si_short( this.details().length, '' )
		}
		
		
		@ $mol_mem
		words() {
			return $mol_si_short( this.details().match( /\p{Letter}+/ug )?.length ?? 0, '' )
		}
		
		
	}
	
}
