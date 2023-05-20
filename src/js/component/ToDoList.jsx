import React from "react";
import { useState, useEffect } from "react";

import fondo from "../../img/Fondo.jpg";

const Home = () => {
	const [task,setTask] = useState('')
	const [tasks,setTasks] = useState([])

	// Add into an array => concat
	// Delete from array => filter
	// Update => map
	//style={{backgroundImage: `url(${fondo})`,
	//backgroundRepeat: "no-repeat"}}

	function getTasks (){ //Trae tareas del API
		fetch('https://assets.breatheco.de/apis/fake/todos/user/germanebarbosa', {
			method: "GET"})
		.then((response) => response.json())
		.then((data) => setTasks(data))
	}

	function updateTasks(){

		const newTasks = {label: task, done: false};
			fetch('https://assets.breatheco.de/apis/fake/todos/user/germanebarbosa', {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newTasks)
   		})
		// console.log(newTasks)
		.then(response => {
			// console.log(resp.ok); // will be true if the response is successfull
			// console.log(resp.status); // the status code = 200 or code = 400 etc.
			// console.log(resp.text()); // will try return the exact result as string
			return response.json();
		})
		.then(data => 
			setTasks([...tasks,data]) //this will print on the console the exact object received from the server
		)
		.catch(error => {
			console.log(error);
		});
	}

	useEffect(() => {
		getTasks()
	},[])

	// useEffect(() => {
	// 	updateTasks()
	// },[tasks])

	return (
		<>
			<div>
				<div className="container">
					<h1 className="display-2 text-center"><strong>Todo's</strong></h1>
					<div>
						<ul>
							<li>
								<input 
									type="text" 
									value={task} 
									onChange={(e)=>setTask(e.target.value)}
									onKeyDown={(e)=> {
										if (e.key === "Enter" && !task == ''){
											setTasks(tasks.concat(task));
											setTask("")
										}
									}}
									placeholder="What do you need to do?"/>
							</li>
							{tasks.map((item,index) => 
								<li key={index} className="element">
									{item.label} <i className="icon fas fa-trash float-end" 
										onClick={() => 
											setTasks(
												tasks.filter(
													(t,currentIndex) => 
														index != currentIndex
														)
													)
												}
											></i>
								</li>
							)}
							<li className="footer">{tasks.length} Tasks</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
