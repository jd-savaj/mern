import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Customer = (props) => (
	<tr>
		<td>{props.customer.name}</td>
		<td>{props.customer.position}</td>
		<td>
			<Link className="btn btn-primary" to={`/edit/${props.customer._id}`}>Edit</Link>
			<button className="btn btn-danger ml-1" onClick={() => { props.deleteCustomer(props.customer._id); } }> Delete </button>
		</td>
	</tr>
);

export default function CustomerList() {
  	const [customers, setCustomers] = useState([]);
  	// fetch customers from database.
  		useEffect(() => {
    		async function getCustomers() {
      			const response = await fetch(`http://localhost:5000/customer/`);
				if (!response.ok) {
					const message = `An error occurred: ${response.statusText}`;
					window.alert(message);
					return;
				}
				const customers = await response.json();
				setCustomers(customers);
			}
    		getCustomers();
			return; 
		}, [customers.length]);

	// delete a customer in database
	async function deleteCustomer(id) {
		await fetch(`http://localhost:5000/${id}`, {
			method: "DELETE"
		});
		const newCustomers = customers.filter((el) => el._id !== id);
		setCustomers(newCustomers);
	}

  	// remove customers on the table
	function customerList() {
		return customers.map((customer) => {
			return (
				<Customer customer={customer} deleteCustomer={() => deleteCustomer(customer._id)} key={customer._id} />
			);
		});
	}

  	// table with the customers
	return (
		<div>
		<h3>Customer List</h3>
		<table className="table table-striped" style={{ marginTop: 20 }}>
			<thead>
			<tr>
				<th>Name</th>
				<th>Position</th>
				<th>Action</th>
			</tr>
			</thead>
			<tbody>{customerList()}</tbody>
		</table>
		</div>
	);
}
