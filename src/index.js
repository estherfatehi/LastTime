import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//class for the individual rows
class Row extends React.Component {
	render() {
		const date = String(this.props.date).split('-');
		var third_date = date[2].split('T');
		var formatted_date = date[1] + '-' + third_date[0] + '-' + date[0];
		const task = this.props.task;
		const frequency = this.props.frequency;

		return (
			<tr>
				<td>{formatted_date}</td>
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
				  placeholder="Date (MM-DD-YYYY)"
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
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			rows: []
		};
	}
	//is it possible to put in tasks as a prop and get rid of rows completely?
	//pass in ShowTable to AddRow and update it as a state?

  componentDidMount() {
  	var request = new XMLHttpRequest();

  	request.open('GET', "/alltasks", true);
    request.onload = function(e){
      if (request.readyState === 4){
        if (request.status === 200){
          this.setState({
            data: JSON.parse(request.responseText)
          })
        } else {
          console.error(request.statusText)
        }
      }
    }.bind(this)

  	request.send(null);

  }

	render() {
		const filterDateText = this.props.filterDateText;
		const filterTaskText = this.props.filterTaskText;
		const rows = [];

		this.state.data.map((task) => {
			console.log(task);
			if (task.LastDate.indexOf(filterDateText) === -1) {
				return;
			}
			if (task.TaskName.indexOf(filterTaskText) === -1) {
				return;
			}
			rows.push(
				<Row
					date={task.LastDate}
					task={task.TaskName}
					frequency={task.Frequency}
				/>
			);
		});

		return(
			<div>
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
			</div>
		);
	}
}

//class to add a new task
class AddNewTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {dateValue: '', taskValue: ''};
		this.addRow = this.addRow.bind(this);
	}

	handleChange(e) {
		let change = {}
    	change[e.target.name] = e.target.value
		this.setState(change)
	}

	render() {
		return (
			<div>
			<input
				  type="text"
				  placeholder="Date (YYYY-MM-DD)"
				  name="date"
				  onChange={this.handleChange.bind(this)}
				/>
			<input
				  type="text"
				  placeholder="Task Name"
				  name="taskname"
				  onChange={this.handleChange.bind(this)}
				/>
			<input
				  type="number"
				  placeholder="Frequency (days)"
				  name="frequency"
				  onChange={this.handleChange.bind(this)}
				/>
			<button type="button" onClick={this.addRow}>{this.props.name}</button>

			</div>
		);
	}

	addRow() {
		var req = new XMLHttpRequest();

		req.open('GET', "/insert?date=" + this.state.date + "&taskname=" + this.state.taskname + "&frequency=" + this.state.frequency, true);
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
				console.log("Success!");
			}
			else {
				console.log("Error in network request: " + req.status);
			}
		});
		req.send(null);

	}
}

//parent class to show all components together
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
				<p align="center">
					<SearchBar
					  filterDateText={this.state.filterDateText}
					  filterTaskText={this.state.filterTaskText}
					  onFilterTaskChange={this.handleFilterTaskChange}
					  onFilterDateChange={this.handleFilterDateChange}
					/>
				</p>
				<span>
				<p align="center">
					<AddNewTask name="ADD NEW TASK"
					/>
				</p>
				</span>
				<span>
				<ShowTable
				  filterDateText={this.state.filterDateText}
				  filterTaskText={this.state.filterTaskText}
				/>
				</span>
			</div>
		);
	}	
}

ReactDOM.render(
	<ShowAll />,
	document.getElementById('root')
);