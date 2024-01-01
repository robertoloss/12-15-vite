



export default function Contact() {
	function submitHandler(e: React.SyntheticEvent) {
		e.preventDefault()
	}

	return(
		<div className="flex flex-col w-full items-center ">
			<div className="flex flex-col w-full max-w-[800px] items-center ">
				<form onSubmit={submitHandler} className="flex flex-col">
					<input type="text" placeholder="Name"/>
					<input type="email" placeholder="Email"/>
					<textarea placeholder="Message"/>
					<button>Send</button>
					<input type="submit" value="Send" />
				</form>
			</div>
		</div>
	) 
}
