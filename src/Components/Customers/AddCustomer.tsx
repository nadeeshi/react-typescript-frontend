import { Button, DialogActions, TextField } from "@mui/material";
import { ICustomer } from "../../types/Customer";
import { ChangeEvent, useState } from "react";
import { addCustomer, updateCustomer } from "../../API/Customer";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";

const AddCustomer = () => {

    const location = useLocation();
    const selectedCustomer = location.state?.customer;

    const [state, setState] = useState({
        firstName: selectedCustomer?.firstName,
        lastName: selectedCustomer?.lastName,
        email: selectedCustomer?.email
    });

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const handleAddCustomer = async (e: any) => {

        e.preventDefault();

        const toasterObj = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: true
        };

        console.log('selectedCustomer?.id ', selectedCustomer?.id)
        if (selectedCustomer?.id !== null && selectedCustomer?.id !== '' && selectedCustomer?.id !== undefined) { // Update existing customer
            const updatedCustomer: ICustomer = {
                ...selectedCustomer,
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email
            };

            try {

                await updateCustomer(selectedCustomer?.id, updatedCustomer);

                setState({
                    firstName: '',
                    lastName: '',
                    email: ''
                });

                toast.success('Customer updated!', toasterObj);

            } catch (error) {
                console.error('Failed to update customer ', error);
                toast.error('Failed to update customer', toasterObj);
            }
        } else { // Create new customer

            const newCustomer: ICustomer = {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email
            };

            try {

                const addedCustomer = await addCustomer(newCustomer);

                if (addedCustomer) {
                    console.log('addedCustomer ', addedCustomer)
                    //  setCustomers([...customers, addedCustomer]);
                    setState({
                        firstName: '',
                        lastName: '',
                        email: ''
                    });

                    toast.success('New customer added!', toasterObj);
                }

            } catch (error) {
                console.error('Failed to add customer ', error);
                toast.error('Failed to add customer', toasterObj);
            }
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
            <h4>{selectedCustomer?.id ? 'Edit Customer' : 'Add Customer'}</h4>
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
                        flex: 2
                    }}
                />

                <DialogActions>
                    <Button onClick={handleAddCustomer} variant="contained">
                        {selectedCustomer?.id ? 'Update Customer' : 'Add Customer'}
                    </Button>
                    <Button onClick={handleDialogClose} variant="contained">
                        Cancel
                    </Button>
                </DialogActions>

                <ToastContainer />
            </div>
        </>
    )
}

export default AddCustomer;