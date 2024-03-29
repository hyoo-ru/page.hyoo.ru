namespace $.$$ {
	
	export class $hyoo_page_side_info extends $.$hyoo_page_side_info {
		
		@ $mol_mem
		slides_uri() {
			const source = this.$.$mol_state_arg.href() + '/'
			return super.slides_uri().replace( '{source}', encodeURIComponent( source ) )
		}
		
		
		@ $mol_mem
		section_indexes() {
			return [ ... this.text_tokens().entries() ]
			.filter( ([ index, token ])=> token.name === 'header' )
			.map( ([ index ])=> index )
		}
		
		@ $mol_mem
		section_list() {
			return this.section_indexes().map( index => this.Section_link( index ) )
		}
		
		@ $mol_mem_key
		section_title( index: number ) {
			const prefix = ''.padEnd( 2 * this.section_level( index ), '− ' )
			return prefix + this.text_header_title( index )
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
			const text = this.details().toLowerCase()
				.replace( /\]\(.*?\)/g, '' )
				.replace( /""(?:(.*?)\\)?.*?""/g, '$1' )
				.replace( /\\\\(?:(.*?)\\)?.*?\\\\/g, '$1' )
			
			for( const match of text.matchAll( /\p{Letter}{2,}(?=((?:\P{Letter}\p{Letter}{2,})*))/ug ) ?? [] ) {
				const parts = match.join( '' ).match( /\P{Letter}?\p{Letter}{2,}/gu ) ?? []
				for( let i = 1; i <= parts.length; ++i ) {
					const word = parts.slice( 0, i ).join('')
					if( word.length < 3 ) continue
					stat.set( word, ( stat.get( word ) ?? 0 ) + 1 )
				}
			}
			
			return stat
		}
		
		@ $mol_mem
		word_list_items() {
			
			const raw = [ ... this.word_stat() ]
			const max = raw.reduce( ( max, [ word, stat ] )=> Math.max( max, stat ), 1 )
			const min = Math.max( 3, max ** .5 )
			const filtered = raw.filter( ([ word, stat ])=> stat >= min )
			filtered.sort( ( left, right )=> right[0].length ** 1.6 - left[0].length ** 1.6 + right[1] - left[1] )
			
			return filtered.map( ([ word ])=> this.Word_item( word ) )
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
