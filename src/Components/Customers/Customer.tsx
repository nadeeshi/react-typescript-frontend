import { ChangeEvent, useEffect, useState } from "react";
import { addCustomer, getCustomers } from "../../API/Customer";
import { ICustomer } from "../../types/Customer";
import { Button, DialogActions, TextField } from "@mui/material";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Customer = () => {

    const [customers, setCustomers] = useState<ICustomer[]>([]);

    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    useEffect(() => {

        getCustomers().then((customers) => {
            if (customers) {
                setCustomers(customers);
            }

        });
    }, []);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const handleAddCustomer = async (e: any) => {

        e.preventDefault();

        const newCustomer: ICustomer = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email
        };

        try {

            const addedCustomer = await addCustomer(newCustomer);

            if (addedCustomer) {
                console.log('addedCustomer ', addedCustomer)
                setCustomers([...customers, addedCustomer]);
                setState({
                    firstName: '',
                    lastName: '',
                    email: ''
                });

                toast.success('New customer added!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: true
                });
            }

        } catch (error) {
            console.error('Failed to add customer ', error);

            toast.error('Failed to add customer', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: true
            });

        }
    }

    const handleDialogClose = () => {
        setState({
            firstName: '',
            lastName: '',
            email: ''
        });
    }

    return (
        <>
            <div>
                <TextField
                    id="firstName"
                    name="firstName"
                    label="Enter first name"
                    type="text"
                    variant="outlined"
                    value={state.firstName}
                    onChange={handleChange}
                    style={{
                        marginRight: '10px',
                        flex: 1
                    }}
                />
                <TextField
                    id="lastName"
                    name="lastName"
                    label="Enter last name"
                    type="text"
                    variant="outlined"
                    value={state.lastName}
                    onChange={handleChange}
                    style={{
                        marginRight: '10px',
                        flex: 1
                    }}
                />
                <TextField
                    id="email"
                    name="email"
                    label="Enter email"
                    type="text"
                    variant="outlined"
                    value={state.email}
                    onChange={handleChange}
                    style={{
                        marginRight: '10px',
                        flex: 1
                    }}
                />

                <DialogActions>
                    <Button onClick={handleAddCustomer} variant="contained">
                        Add Customer
                    </Button>
                    <Button onClick={handleDialogClose} variant="contained">
                        Cancel
                    </Button>
                </DialogActions>

            </div>

            <ul>
                {customers.length > 0 && customers.map((customer) => {
                    return <li key={customer.id}>
                        <div>
                            Name: {customer.firstName} {customer.lastName}
                        </div>
                        <div>
                            Email: {customer.email}
                        </div>
                        <div>
                            Phone: {customer.phone}
                        </div>
                        <div>
                            Address: {customer.address}
                        </div>
                        <hr />
                    </li>
                })}
            </ul>

            <ToastContainer />
        </>
    )
};

export default Customer;