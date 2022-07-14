// Fetches and displays data from backend
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getItems } from '../services/items';
import { Alert, Container, Table, Button } from 'react-bootstrap';
import ProgressIndicator from './common/ProgressIndicator'
import IItem from '../models/IItem';

const ExpenseTracker = () => {
    const [items, setItems] = useState<IItem[]>([] as IItem[]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    let rahulExp = 0;
    let rameshExp = 0;
    let toBePaid = '';
    let amtToPay = 0;

    // fetching data from backed using service method.
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const items = await getItems();
                setItems(items);
            } catch {
                setError(error as Error);
            } finally {
                setLoading(false);
            };
        }
        fetchItems();
    }, [])

    const totalByPayee = (payee: string) => {
        let total = 0;
        items.forEach(
            item => {
                if (item.payeeName === payee) {
                    total += parseFloat(item.price);
                };
            });
        return total;
    };

    const calculateTotal = () => {
        rahulExp = totalByPayee('Rahul');
        rameshExp = totalByPayee('Ramesh');
        rahulExp > rameshExp ? toBePaid = 'Ramesh' : toBePaid = 'Rahul';
        rahulExp > rameshExp ?
            (amtToPay = (rahulExp - rameshExp) / 2) :
            (amtToPay = (rameshExp - rahulExp) / 2);
        return rahulExp + rameshExp;
    };

    const amountFormat = (amount: number) => {
        return amount.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }

    return (
        <Container className='my-4'>
            <h2>Expense Tracker
                <Link to='/add'>
                    <Button variant="primary" className='float-end'>
                        Add Expense
                    </Button>
                </Link>
            </h2>

            <hr />
            {
                loading && (
                    <ProgressIndicator />
                )
            }
            {
                !loading && error && (
                    <Alert variant="danger">
                        {error.message}
                    </Alert>
                )
            }
            {
                !loading && !error && (
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Exp. Id</th>
                                <th>Date</th>
                                <th>Payee Name</th>
                                <th>Description</th>
                                <th className='text-end'>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map(
                                    (item, idx) => (
                                        <tr
                                            key={item.id}
                                        >
                                            <td>{item.id}</td>
                                            <td>{item.setDate}</td>
                                            <td >{item.payeeName}</td>
                                            <td>{item.product}</td>
                                            <td className='font-monospace text-end'>{amountFormat(parseFloat(item.price))}</td>
                                        </tr>
                                    )
                                )
                            }

                            <tr className='summary'>
                                <td className='text-end' colSpan={4}>
                                    Total Expense
                                </td>
                                <td className='font-monospace text-end'>
                                    {amountFormat(calculateTotal())}
                                </td>
                            </tr>
                            <tr className='summary'>
                                <td className='text-end' colSpan={4}>
                                    Total amount spent by Rahul
                                </td>
                                <td className='font-monospace text-end'>
                                    {amountFormat(rahulExp)}
                                </td>
                            </tr>
                            <tr className='summary'>
                                <td className='text-end' colSpan={4}>
                                    Total amount spent by Ramesh
                                </td>
                                <td className='font-monospace text-end'>
                                    {amountFormat(rameshExp)}
                                </td>
                            </tr>
                            <tr className='summary'>
                                <td className='text-end' colSpan={4}>
                                    {toBePaid} has to pay
                                </td>
                                <td className='font-monospace text-end'>
                                    {amountFormat(amtToPay)}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                )
            }
        </Container>
    );
};

export default ExpenseTracker;
