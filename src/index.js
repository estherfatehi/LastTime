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
		this.handleFilterDateChange = this.handleFilterDateChange.bind(this);
		this.handleFilterTaskChange = this.handleFilterTaskChange.bind(this);
	}

	handleFilterDateChange(e) {
		this.props.onFilterDateChange(e.target.value);
	}

	handleFilterTaskChange(e) {
		this.props.onFilterTaskChange(e.target.value);
	}

	render() {
		return (
			<form>
				<span>Search:  </span>
				<span>
				<input
				  type="text"
				  placeholder="Date (MM/DD/YYYY)"
				  value={this.props.filterDateText}
				  onChange={this.handleFilterDateChange}
				/>
				</span>
				<span>
				<input
				  type="text"
				  placeholder="Task Name"
				  value={this.props.filterTaskText}
				  onChange={this.handleFilterTaskChange}
				/>
				</span>
			</form>
		);
	}
}

//class ShowTable -- shows the table
class ShowTable extends React.Component {
	render() {
		const filterDateText = this.props.filterDateText;
		const filterTaskText = this.props.filterTaskText;
		const rows = [];

		this.props.tasks.forEach((task) => {
			if (task.date.indexOf(filterDateText) === -1) {
				return;
			}
			if (task.task.indexOf(filterTaskText) === -1) {
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
			filterDateText: '',
			filterTaskText: '',
		};

		this.handleFilterDateChange = this.handleFilterDateChange.bind(this);
		this.handleFilterTaskChange = this.handleFilterTaskChange.bind(this);
	}

	handleFilterDateChange(filterDateText) {
		this.setState({
			filterDateText: filterDateText
		});
	}

	handleFilterTaskChange(filterTaskText) {
		this.setState({
			filterTaskText: filterTaskText
		});
	}

	render() {
		return (
			<div>
				<p>
					<SearchBar
					  filterDateText={this.state.filterDateText}
					  filterTaskText={this.state.filterTaskText}
					  onFilterTaskChange={this.handleFilterTaskChange}
					  onFilterDateChange={this.handleFilterDateChange}
					/>
				</p>
				<ShowTable
				  tasks={this.props.tasks}
				  filterDateText={this.state.filterDateText}
				  filterTaskText={this.state.filterTaskText}
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
	{date: '12/22/2016', task: 'Test React app', frequency: '20'},
]

ReactDOM.render(
	<ShowAll tasks={TASKS} />,
	document.getElementById('root')
);