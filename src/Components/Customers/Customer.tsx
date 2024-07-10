import { useEffect, useState } from "react";
import { getCustomers } from "../../API/Customer";
import { ICustomer } from "../../types/Customer";

const Customer = () => {

    const [customers, setCustomers] = useState<ICustomer[]>([]);

    useEffect(() => {

        getCustomers().then((customers) => {
            if (customers) {
                setCustomers(customers);
            }

        });
    }, []);

    return (
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
    )
};

export default Customer;