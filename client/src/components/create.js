import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
	const [form, setForm] = useState({
		name: "",
		position: "",
		level: "",
	});
	const navigate = useNavigate();

	// update the state properties.
	function updateForm(value) {
	return setForm((prev) => {
		return { ...prev, ...value };
	});
	}

  	// form submission.
	async function onSubmit(e) {
	e.preventDefault();
	// When a post request is sent to the create url, we'll add a new customer to the database.
	const newCustomer = { ...form };

	await fetch("http://localhost:5000/customer/add", {
		method: "POST",
		headers: {
		"Content-Type": "application/json",
		},
		body: JSON.stringify(newCustomer),
	})
	.catch(error => {
		window.alert(error);
		return;
	});

	setForm({ name: "", position: ""});
	navigate("/");
	}

  // input form.
  return (
    <div>
      	<h3>Create New Customer</h3>
      	<form onSubmit={onSubmit}>
			<div className="form-group">
				<label htmlFor="name">Full Name</label>
				<input type="text" className="form-control" id="name" value={form.name} onChange={(e) => updateForm({ name: e.target.value })}/>
			</div>
			<div className="form-group">
				<label htmlFor="position">Position</label>
				<input type="text" className="form-control" id="position" value={form.position} onChange={(e) => updateForm({ position: e.target.value })}/>
			</div>
			<div className="form-group">
				<input type="submit" value="Create Customer" className="btn btn-success"/>
			</div>
      	</form>
    </div>
  );
}
