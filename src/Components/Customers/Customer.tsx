import { ChangeEvent, useEffect, useState } from "react";
import { getCustomer, getCustomers } from "../../API/Customer";
import { ICustomer } from "../../types/Customer";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Pagination, TextField } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";

const Customer = () => {

    const navigate = useNavigate();
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [showCustomersGrid, setShowCustomersGrid] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    // Calculate the indices for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(customers.length / itemsPerPage);

    const [searchState, setSerachState] = useState({
        customerId: '',
        customerName: '',
        customers: [] as ICustomer[]
    });

    const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();

    useEffect(() => {

        getCustomers().then((customers) => {
            if (customers) {
                setCustomers(customers);
            }

        });
    }, []);

    const handleChangeForSearch = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSerachState({
            ...searchState,
            [e.target.name]: e.target.value,
        })
    }

    const searchForCustomer = async () => {
        try {

            const loadingToastId = toast.loading('Searching for customer...', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: false
            });

            const searchCustomer = await getCustomer(searchState.customerId);

            if (searchCustomer) {
                toast.dismiss(loadingToastId);

                setSerachState((prevState) => ({
                    ...prevState,
                    customers: [...prevState.customers, searchCustomer]
                }));
            }
        } catch (error) {
            console.log('Failed to find a custtomer ', error);
        }

        setShowCustomersGrid(true);
    }

    const addCustomer = () => {

        navigate('/editCustomer', { state: {} });
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 100,

        },
        {
            field: 'firstName',
            headerName: 'FirstName',
            width: 100
        }
    ];

    const handleRowClick = (params: any) => {
        const selectedRow = searchState.customers.find((customer) => customer.id === params.row.id);
        setSelectedCustomer(selectedRow);
    };

    const handleEditCustomer = () => {
        navigate('/editCustomer', { state: { customer: selectedCustomer } });
    };

    const handleDialogClose = () => {

    };

    const handlePageChange = (event, page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <h4>Search Customer</h4>
            <div style={{
                border: '1px solid lightblue',
                borderRadius: '20px',
                padding: '10px 20px',
                alignItems: 'center'
            }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center'
                }}>
                    <TextField
                        id="customerId"
                        label="Enter customer Id..."
                        type="text"
                        variant="outlined"
                        name="customerId"
                        value={searchState.customerId}
                        onChange={handleChangeForSearch}
                        style={{
                            marginRight: '10px',
                            flex: 1,
                            minWidth: '500px',
                            maxWidth: '800px',
                            fontSize: '10px',
                            backgroundColor: 'white',
                            borderRadius: '5px'

                        }}
                    />
                    <TextField
                        id="customerName"
                        label="Enter customer Name..."
                        type="text"
                        variant="outlined"
                        name="custtomerName"
                        value={searchState.customerName}
                        onChange={handleChangeForSearch}
                        style={{
                            marginRight: '10px',
                            flex: 1,
                            minWidth: '500px',
                            maxWidth: '800px',
                            fontSize: '10px',
                            backgroundColor: 'white',
                            borderRadius: '5px'

                        }}
                    />
                    <IconButton
                        onClick={searchForCustomer}
                        style={{
                            padding: '8px',
                            borderRadius: '15px',
                            border: '1px solid lightBlue',
                            paddingRight: '15px',
                            fontSize: '15px',
                            background: '#dedeff'
                        }}
                    >
                        <SearchIcon style={{
                            fontSize: 30,
                            color: 'darkBlue',
                            marginRight: '15px'
                        }} />
                        Search Customer
                    </IconButton>
                </div>
                <br /> <br />
                <div>
                    <span
                        style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}
                        onClick={addCustomer}
                    >
                        Add Customer
                    </span>
                </div>
            </div>
            <br />

            <Dialog
                open={showCustomersGrid}
                onClose={() => setShowCustomersGrid(false)}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>Search Results</DialogTitle>
                <div style={{ display: 'flex', marginLeft: '35px' }}>
                    <p style={{ marginRight: '25px' }}>Id: <b>{searchState.customerId}</b></p>
                    <p>Search customer Name: <b>{searchState.customerName}</b></p>
                </div>

                <DialogContent sx={{ paddingBottom: '15px' }}>
                    <div style={{ height: '400px', width: '100%', overflow: 'auto' }}>
                        <DataGrid
                            rows={searchState.customers.filter((customer) => customer !== null)}
                            columns={columns}
                            onRowClick={handleRowClick}
                            hideFooterPagination
                            hideFooter
                        />
                    </div>
                </DialogContent>

                <DialogActions
                >
                    <Button onClick={handleEditCustomer} variant="contained">
                        Edit selected customer
                    </Button>
                    <Button onClick={handleDialogClose} variant="contained">
                        Cancel
                    </Button>
                </DialogActions>

            </Dialog>
            <br />
            <div>
                <ul>
                    {currentCustomers.length > 0 && currentCustomers.map((customer) => {
                        return <li key={customer.id}>
                            <div>Cstomer Id: {customer.id}</div>
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
                <br />
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    style={{ marginTop: '20px', justifyContent: 'center', display: 'flex' }}
                />
            </div>
        </>
    )
};

export default Customer;