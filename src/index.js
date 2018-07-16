import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//class for the individual rows
class Row extends React.Component {
	render() {
		const date = this.props.date;
		const task = this.props.task;
		const frequency = this.props.frequency;

		return (
			<tr>
				<td>{date}</td>
				<td>{task}</td>
				<td>{frequency} days</td>
			</tr>
		);
	}
}

//class SearchBar -- allows filtering of table
class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
	}

	handleFilterTextChange(e) {
		this.props.onFilterTextChange(e.target.value);
	}

	render() {
		return (
			<form>
				<span>Search:  </span>
				<input
				  type="text"
				  placeholder="Date (MM/DD/YYYY)"
				  value={this.props.filterText}
				  onChange={this.handleFilterTextChange}
				/>
			</form>
		);
	}
}

//class ShowTable -- shows the table
class ShowTable extends React.Component {
	render() {
		const filterText = this.props.filterText;
		const rows = [];

		this.props.tasks.forEach((task) => {
			if (task.date.indexOf(filterText) === -1) {
				return;
			}
			rows.push(
				<Row
					date={task.date}
					task={task.task}
					frequency={task.frequency}
				/>
			);
		});

		return(
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Task</th>
							<th>Frequency</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</table>
		);
	}
}

class ShowAll extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterText: '',
		};

		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
	}

	handleFilterTextChange(filterText) {
		this.setState({
			filterText: filterText
		});
	}

	render() {
		return (
			<div>
				<p>
					<SearchBar
					  filterText={this.state.filterText}
					  onFilterTextChange={this.handleFilterTextChange}
					/>
				</p>
				<ShowTable
				  tasks={this.props.tasks}
				  filterText={this.state.filterText}
				/>
			</div>
		);
	}	
}

const TASKS = [
	{date: '07/12/2018', task: 'Laundry', frequency: '7'},
	{date: '06/22/2018', task: 'Change sheets', frequency: '14'},
	{date: '07/16/2018', task: 'Dishes', frequency: '1'},
	{date: '07/16/2018', task: 'Clean closet', frequency: '60'},
	{date: '05/23/2018', task: 'Clean desk', frequency: '60'},
]

ReactDOM.render(
	<ShowAll tasks={TASKS} />,
	document.getElementById('root')
);