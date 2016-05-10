var searchContainerTemplate = `
	<div class="search-form">
		<h3>Search Form</h3>
		<small>Note: An empty search will return all results.</small>
		<form>
			<div class="form-group">
				<label for="firstName">First Name</label>
				<input type="text" class="form-control" id="firstName" placeholder="First Name">
			</div>
			<div class="form-group">
				<label for="lastName">Last Name</label>
				<input type="text" class="form-control" id="lastName" placeholder="Last Name">
			</div>
			<button type="submit" class="btn btn-default">Submit</button>
			<button type="reset" class="btn btn-default">Reset</button>
		</form>
	</div>
	<div class="search-results">
		<h3>Search Results</h3>
		<table class="table table-hover">
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>GPA</th>
					<th></th>
				<tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>`;

var studentSearchResultTemplate = `
	<td><%= first %></td>
	<td><%= last %></td>
	<td><%= gpa %></td>
	<td align="right"></td>`;

var studentDetailsTemplate = `
	<h3><%= first %> <%= last %></h3>
	<table class="table">
		<tr>
			<th>Email</th>
			<td><%= email %></td>
		</tr>
		<tr>
			<th>GPA</th>
			<td><%= gpa %></td>
		</tr>
	</table>
	<h4>Grades</h4>
	<table class="table">
		<thead>
			<tr>
				<th>Class</th>
				<th>Grade</th>
			</tr>
		</thead>
		<tbody>
			<% _.each(studentClasses, function(course){ %>
				<tr>
					<td><%= course.courseName %></td>
					<td><%= course.grade %></td>
				</tr>
			<% }); %>
		</tbody>
	</table>	
	`;
