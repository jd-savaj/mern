import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
	const [form, setForm] = useState({
		name: "",
		position: "",
		customers: [],
	});
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			const id = params.id.toString();
			const response = await fetch(`http://localhost:5000/customer/${params.id.toString()}`);
			if (!response.ok) {
				const message = `An error has occurred: ${response.statusText}`;
				window.alert(message);
				return;
			}
			const customer = await response.json();
			if (!customer) {
				window.alert(`Customer with id ${id} not found`);
				navigate("/");
				return;
			}
			setForm(customer);
		}
		fetchData();
		return;
	}, [params.id, navigate]);

	// update the state properties.
	function updateForm(value) {
		return setForm((prev) => {
			return { ...prev, ...value };
		});
	}

	async function onSubmit(e) {
		e.preventDefault();
		const editedPerson = {
			name: form.name,
			position: form.position,
		};
		// update the data in the database.
		await fetch(`http://localhost:5000/update/${params.id}`, {
			method: "POST",
			body: JSON.stringify(editedPerson),
			headers: {
				'Content-Type': 'application/json'
			},
		});
		navigate("/");
	}

  // user to update the data.
	return (
		<div>
			<h3>Update Customer</h3>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="name">Full Name: </label>
					<input type="text" className="form-control" id="name" value={form.name} onChange={(e) => updateForm({ name: e.target.value })}/>
				</div>
				<div className="form-group">
					<label htmlFor="position">Position: </label>
					<input type="text" className="form-control" id="position" value={form.position} onChange={(e) => updateForm({ position: e.target.value })}/>
				</div>
				<br />
				<div className="form-group">
					<input type="submit" value="Update Customer" className="btn btn-success"/>
				</div>
			</form>
		</div>
	);
}
