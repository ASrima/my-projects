$(document).ready(function(){
	$('#searchUser').on('keyup', function(e){
		let username = e.target.value;

		//Make request to Github
		$.ajax({
			url:'https://api.github.com/users/'+username,
			data:{
				client_id:'4356510bf2d13da438a6',
				client_secret:'280be0346c3aa21d8ce7b270271572d8fa490ebb'
			}
		}).done(function(user){

			$.ajax({
				url:'https://api.github.com/users/'+username+'/repos',
				data:{
				client_id:'4356510bf2d13da438a6',
				client_secret:'280be0346c3aa21d8ce7b270271572d8fa490ebb',
				sort: 'created:asc',
				per_page:10
			}


			}).done(function(repos){
				$.each(repos, function(index, repo){
					$('#repos').append(` 

						<div class="well">
						 <div class="row">
						  <div class="col-md-7">
						   <strong>${repo.name}</strong>: ${repo.description}
						   </div>
						   <div class="col-md-3">
							   <span class="label label-default">Forks: ${repo.forks_count}</span>
								<span class="label label-primary">Watchers: ${repo.watchers_count}</span>
								<span class="label label-success">Stars: ${repo.stargazers_count}</span>

						   </div>
						   <div class="col-md-2">
						     <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
						   </div>
						`);
				});

			});

			$('#profile').html(`
				<div class="panel panel-default">
				    <h3 style="color:red" class="panel-title"> ${user.name}</h3>
					  <div class="panel-body">
					   <div class="row">
					    <div class="col-md-3">
					      <img  class="thumbnail avatar" src="${user.avatar_url}">
					      <a  target="_blank" class="btn btn-primary btn btn-block" href="${user.html_url}">View Profile</a>
					      </div>
					      <div class="col-md-9">
					      <span class="label label-default">Public Repos: ${user.public_repos}</span>
							<span class="label label-primary">Public Gists: ${user.public_gists}</span>
							<span class="label label-success">Followers: ${user.followers}</span>
							<span class="label label-info">Following: ${user.following}</span>
							<br> <br>

							<ul class="list-group">
								<li class="list-group-item">Company: ${user.company}</li>
								<li class="list-group-item">Website/blog: ${user.blog}</li>
								<li class="list-group-item">Email Address: ${user.email}</li>
								<li class="list-group-item">Location: ${user.location}</li>
								<li class="list-group-item">Member Since: ${user.created_at}</li>

							</ul>



							 </div>
							  <div class="panel-footer"></div>
							</div>
					      </div>
					      


					      </div>
					  
					  </div>
					 
					</div>
					<h3 class="page-header">Latest Repos</h3>
					<div id="repos"></div>
					<nav aria-label="label-default">
							  <ul class="pager">
							    <li><a href="Application.html">Previous</a></li>

							    <li><a href="Home.html">Next</a></li>
							  </ul>
							</nav>
				`);
		});
	});

});