import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import TimePicker from 'react-time-picker';
import { AppState } from '../reducers/AppContext'

function PostDetailModal(props) {
    const [show, setShow] = useState(false);
    const [bus, setBus] = useState({
        "origin": props.from,
        "destination": props.to,
        "busOwner": null,
        "busName": null,
        "originTime": null,
        "destinationTime": null,
        "authorName": null
    });
    const [destinationTime, setDestTime] = useState({
        a: '',
        b: "AM"
    });
    const [originTime, setOriginTime] = useState({
        a: '',
        b: "AM"
    });
    const { getRefresh, setGetRefresh } = AppState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function to12hr(time) {
        let hr = parseInt(time[0] + time[1]);
        // console.log(hr);
        if (hr > 12) {
            hr = "" + (hr - 12);

            if (hr.length === 1) {
                time = "0" + hr + time.substring(2);
            }
            else {
                time = hr + time.substring(2);
            }
            time += " PM";
        }
        else if (hr === 0) {
            time = "12" + time.substring(2) + " AM";
        }
        else {
            time += ' AM';
        }
        return time;
    }

    function handleSubmit(e) {
        e.preventDefault();

        bus.origin = props.from;
        bus.destination = props.to;
        // bus.originTime = originTime.a + " " + originTime.b;
        // bus.destinationTime = destinationTime.a + " " + destinationTime.b;
        bus.originTime = to12hr(originTime.a);
        bus.destinationTime = to12hr(destinationTime.a);

        // console.log(bus);

        axios({
            method: 'post',
            url: 'https://localhost:7252/api/busDetails',
            data: bus
        })
            .then((res) => {
                console.log(res);
                setBus({
                    "origin": props.from,
                    "destination": props.to,
                    "busOwner": null,
                    "busNo": null,
                    "busName": null,
                    "originTime": null,
                    "destinationTime": null,
                    "authorName": null
                });
            })
            .catch((err) => {
                console.log(err.message);
            })
        setGetRefresh(getRefresh + 1);
        handleClose();
    }

    return (
        <>
            {props.to ?
                <Button variant="warning" onClick={handleShow}>
                    <h4 className='mb-0 px-4 py-1' style={{ color: 'black' }}>
                        Post a Bus Detail
                    </h4>
                </Button>
                : <></>}
            {props.details.length == 0 ? <>
                <br />
                <h1 style={{ fontSize: '200px' }} className="bus-emoji">
                    {/* &#128653; */}
                    &#128652;
                </h1></> :
                <></>
            }

            <Modal
                show={show} onHide={handleClose} centered
            >
                <Form onSubmit={handleSubmit}
                    style={{ backgroundColor: 'whitesmoke' }}
                >
                    <Modal.Header closeButton>
                        <h4 className='m-0 p-0' style={{ color: 'grey' }}>
                            New bus detail
                        </h4>
                    </Modal.Header>
                    <Modal.Body>
                        <h5 className='text-center' style={{ color: 'black' }}>{`${props.from} to ${props.to}`}</h5>
                        <table style={{ width: '100%' }} className="td-center post-modal">
                            <tr>
                                <td style={{ width: '50%' }}>
                                    <Form.Check
                                        inline
                                        label="Government Bus"
                                        name="busownerradio"
                                        type="radio"
                                        value="government"
                                        onClick={() => {
                                            bus.busOwner = "government";
                                            setBus(bus);
                                        }}
                                        required
                                    />
                                </td>

                                <td><Form.Check
                                    inline
                                    label="Private Bus"
                                    name="busownerradio"
                                    type="radio"
                                    value="private"
                                    onClick={() => {
                                        bus.busOwner = "private";
                                        setBus(bus);
                                    }}
                                />
                                </td>
                            </tr>

                            <tr>
                                <td><Form.Label>Bus Name or Number *</Form.Label></td>
                                <td><Form.Control
                                    required
                                    onChange={(e) => {
                                        bus.busName = e.target.value;
                                        setBus(bus);
                                    }} />
                                </td>
                            </tr>

                            <tr>
                                <td><Form.Label>{`Bus time at ${props.from}`}</Form.Label></td>
                                <td>
                                    {/* <tr>
                                        <td> */}
                                    <TimePicker
                                        value={originTime.a}
                                        onChange={(val) => {
                                            // console.log(val);
                                            originTime.a = val;
                                            setOriginTime(originTime)
                                            // bus.destinationTime = val + document.getElementById("destselect").value;
                                        }}
                                        disableClock={true}
                                        hourPlaceholder="HH"
                                        minutePlaceholder='MM'
                                        clearIcon={null}
                                    // amPmAriaLabel={null}
                                    />
                                    {/* </td> */}
                                    {/* <td> */}
                                    {/* <select className="p-0 m-0"
                                                onChange={(e) => {
                                                    originTime.b = e.target.value;
                                                    // console.log(e.target.value);
                                                    // bus.destinationTime = e.target.value;
                                                }}
                                            >
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                            </select></td> */}
                                    {/* </tr> */}
                                </td>
                            </tr>

                            <tr>
                                <td><Form.Label>{`Bus time at ${props.to}`}</Form.Label></td>
                                <td>
                                    {/* <tr>
                                        <td> */}
                                    <TimePicker
                                        value={destinationTime.a}
                                        onChange={(val) => {
                                            // console.log(val);
                                            destinationTime.a = val;
                                            // bus.destinationTime = val + document.getElementById("destselect").value;
                                        }}
                                        disableClock={true}
                                        hourPlaceholder="HH"
                                        minutePlaceholder='MM'
                                        clearIcon={null}
                                    />
                                    {/* </td> */}
                                    {/* <td>
                                            <select className="p-0 m-0"
                                                onChange={(e) => {
                                                    destinationTime.b = e.target.value;
                                                    // console.log(e.target.value);
                                                    // bus.destinationTime = e.target.value;
                                                }}
                                            >
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                            </select></td>
                                    </tr> */}
                                </td>
                            </tr>

                            <tr>
                                <td><Form.Label>Your Name *</Form.Label></td>
                                <td><Form.Control required onChange={(e) => {
                                    bus.authorName = e.target.value;
                                    setBus(bus);
                                }} />
                                </td>
                            </tr>
                        </table>
                    </Modal.Body>
                    <Modal.Footer className='my-0 py-1'>
                        <div style={{ width: '100%' }} className="text-center">
                            <Button variant="warning" type="submit" className='px-4'>
                                <h5 className='m-1 px-5' style={{ textAlign: 'center', color: 'black' }}>Post</h5>
                            </Button>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default PostDetailModal;