// import logo from './logo.svg';
import './App.css';
import { Form, Table, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PostDetailModal from './components/PostDetailModal'
// import { FaRegEdit } from 'react-icons/fa';
import DetailCard from './components/DetailCard';
import { AppState } from './reducers/AppContext';

function App() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [details, setDetails] = useState([]);
  const { getRefresh} = AppState();

  useEffect(() => {
    axios.get(`https://localhost:7252/api/BusDetails/${from}2${to}`)
      .then((res) => {
        console.log(res);
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, [from, to, getRefresh])

  return (
    <div className="App">
      <header className='text-center'>
        {/* &#128653; */}
        <h2 className='pb-4 pt-2'>Bus Details Management System</h2>
      </header>
      <Form className='center-items'>
        <Table style={{ width: window.innerWidth > 600 ? '60vw' : '90vw' }}>
          <tbody>
            <tr style={{ borderColor: 'transparent' }}>
              <td>
                <Form.Control size="lg" type="text" placeholder="FROM" onChange={(e) => setFrom(e.target.value)} />
              </td>
              {to ? <td className='mb-0 pt-3'><h4>to</h4></td> : <></>}
              <td>
                <Form.Control size="lg" type="text" placeholder="TO" onChange={(e) => setTo(e.target.value)} />
              </td>
            </tr>
          </tbody>
        </Table>
      </Form>
      <div className='text-center'>
        <PostDetailModal from={from} to={to} />
      </div>
      <br />
      <div>
        {details.length ? <h3 className='text-center mb-0 pt-2'>Available bus details</h3> : <></>}
      </div>
      <br />
      <Row xs={1} md={2} className="g-4 pt-0 mt-0" style={{ margin: window.innerWidth > 600 ? '0vw 10vw' : "0vw 0vw" }}>
        {/* <div className='center-items'> */}
        {
          details.map((item) => {
            // console.log(item);
            return <Col className="center-items">
              <DetailCard from={from} to={to} item={item} />
            </Col>;
          })
        }
        {/* </div> */}
      </Row>
      <br />
      <br />
      <br />
    </div>
  );
}

export default App;
