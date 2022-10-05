namespace $.$$ {
	
	export class $hyoo_page_side_info extends $.$hyoo_page_side_info {
		
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
			const words = ( this.details().toLowerCase().match( /\p{Letter}{2,}/ug ) ?? [] )
			
			for( const word of words ) {
				stat.set( word, ( stat.get( word ) ?? 0 ) + 1 )
			}
			
			return stat
		}
		
		@ $mol_mem
		word_list_items() {
			
			const stat = [ ... this.word_stat() ].filter( ([ word, stat ])=> stat > 2 )
			stat.sort( ( left, right )=> right[1] - left[1] )
			
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
