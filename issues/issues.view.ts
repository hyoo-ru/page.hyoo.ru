namespace $.$$ {

	export class $hyoo_page_issues extends $.$hyoo_page_issues {

		talks() {
			return this.$.$hyoo_talks_domain
		}

		issues_close() {
			this.issues_toogle(false)
		}

		issue_new() {
			const chat = this.talks().chat_new()
			this.side().issues( [...this.side().issues(), chat] )
			this.$.$mol_state_arg.value('issue', chat.id)
		}

		issue_arg( id: string ) {
			return { issue: id } as any
		}

		@ $mol_mem
		links() {
			return this.side().issues()
				.filter( $mol_match_text( this.Talks().links_query(), chat => [ chat.title() ] ) )
				.map( chat => this.Talks().Chat_link( chat.id ) )
				.reverse()
		}

		@ $mol_mem
		pages() {
			const chat = this.$.$mol_state_arg.value('issue')
			
			return [
				this.Issues(),
				... chat ? [ this.Talks().Chat_page( chat ) ] : [],
			]
		}

	}

}
