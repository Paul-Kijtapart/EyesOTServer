import React from 'react';

import {
	Icon
} from 'semantic-ui-react';


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
						placeholder="Common passwords..."
						onChange={this.handleInputTextChange} 
						value={current_search_text}
					/>
    				<Icon 
    					className="search"
    					loading={current_search_text.length != 0}
    				/>
				</div>
			</div>
		);
	}
};


export default SearchBar;