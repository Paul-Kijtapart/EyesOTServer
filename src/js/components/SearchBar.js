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
			<div className="searchBar">
				<span> Status: {isLoading} </span>
				<div className="inputBar">
					<input
						onChange={this.handleInputTextChange} 
						value={current_search_text}
						type="text"
					/>
				</div>
			</div>
		);
	}
};


export default SearchBar;