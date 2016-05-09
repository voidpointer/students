var searchContainerTemplate = `
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
	<div class='search-results'>
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
	<td><%= gpa.toPrecision(2) %></td>
	<td align='right'></td>`;

var studentDetailsTemplate = `
	<%= first %> <%= last %> <%= gpa.toPrecision(2) %>
	`;
