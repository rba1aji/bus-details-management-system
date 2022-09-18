import React, { useCallback } from "react";
import Voting from './Voting';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Card, Table } from "react-bootstrap";
import axios from "axios";
import { AppState } from "../reducers/AppContext";

export default function DetailedCard(props) {
    const { getRefresh, setGetRefresh } = AppState();
    const handleDelete = useCallback(() => {
        axios({
            method: "delete",
            url: `https://localhost:7252/api/BusDetails/${props.item.id}`
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.message);
            });
        setGetRefresh(getRefresh + 1);
    }, []);

    return (
        <Card
            key={props.item.id}
            className=" card"
            // className='card'
            style={{ width: "80%", backgroundColor: 'whitesmoke' }}
        >
            <Card.Body >
                <Table bordered className='border border-light bg-white'
                >
                    <tbody className="p-5">
                        <tr>
                            <td>

                                <Voting item={props.item} />

                            </td>
                            <td>

                                <Card.Text>
                                    <h5 className="text-center" style={{ color: 'black' }}>{props.item.busName}</h5>
                                    {props.item.busOwner} bus
                                </Card.Text>
                                <Card.Text>
                                    {`Bus time at ${props.from}: ${props.item.originTime}`}
                                </Card.Text>
                                <Card.Text>
                                    {`Bus time at ${props.to}: ${props.item.destinationTime}`}
                                </Card.Text>

                            </td>
                        </tr>
                    </tbody>
                </Table>

                <Card.Subtitle>
                    <table style={{ width: '100%' }}>
                        <td onClick={handleDelete}>
                            {/* <FaRegEdit />{" "} */}
                            <RiDeleteBinLine /></td>
                        <td style={{ textAlign: 'right' }}>{`- ${props.item.authorName} on ${props.item.postDate}`}</td>
                    </table>
                </Card.Subtitle>

            </Card.Body>
        </Card>
    );
}