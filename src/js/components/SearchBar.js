import React from 'react';



class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleInputTextChange = this.handleInputTextChange.bind(this);
	}

	handleInputTextChange(e) {
		e.preventDefault();
		this.props.OnInputTextChange(e.target.value);
	}

	render() {
		const current_search_text = this.props.current_search_text;
		const isLoading = this.props.isLoading;

		return (
			<div className="ui search searchBar">
				<div className="ui icon input inputBar">
					<input 
						className="prompt" 
						type="text" 
						placeholder="Search by type of the event"
						onChange={this.handleInputTextChange} 
						value={current_search_text}
					/>
    				<i className="search icon" />
				</div>
			</div>
		);
	}
};


export default SearchBar;