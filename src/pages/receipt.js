// import React, { useEffect } from 'react'
// import { Flex } from '@chakra-ui/react'
// import { Col, Divider, Row, Table } from 'antd'
// import jsPDF from 'jspdf'
// import html2canvas from 'html2canvas'
// import 'antd/dist/antd.css'
// import useComponent from 'context/component'
// const Receipt = () => {
//   const { clip } = useComponent()

//   useEffect(() => {
//     window.html2canvas = html2canvas
//     var doc = new jsPDF({
//       orientation: 'landscape',
//       unit: 'px'
//     })
//     doc.setFontSize(5)

//     var content = document.getElementById('content-22')
//     // console.log('content', content)
//     // console.log('document.body', document.body)
//     doc.html(content, {
//       callback: function (doc) {
//         //   console.log('in callback')
//         // doc.text(null, 10, 10)
//         doc.save(`${clip?.task?.name || 'receipt'}.pdf`)
//       }
//     })
//   }, [clip])
//   return (
//     <Flex align='center' justify='center'>
//       <div style={{ padding: 20 }} id='content-22'>
//         <Flex justify='center' align='center'>
//           <Row>
//             <Col>
//               <Divider>Receipt</Divider>
//             </Col>
//           </Row>
//         </Flex>

//         <Row gutter={24} style={{ marginTop: 32 }}>
//           <Col span={8}>
//             <h3>Complete Farmer</h3>
//             <div>No. 2 Abeasi St</div>
//             <div>East Legon,</div>
//             <div>Accra</div>
//           </Col>
//           <Col span={8} offset={8}>
//             <table>
//               <tr>
//                 <th>Receipt # :</th>
//                 <td>{clip?.reference}</td>
//               </tr>
//               <tr>
//                 <th>Receipt Date :</th>
//                 <td>{new Date(clip?.expenseDate).toLocaleDateString()}</td>
//               </tr>
//               {/* <tr>
//                 <th>Due Date :</th>
//                 <td>10-01-2018</td>
//               </tr> */}
//             </table>
//           </Col>
//         </Row>

//         <Row style={{ marginTop: 48 }}>
//           <Flex justify='center' align='center' direction='column'>
//             <div>
//               Bill To: <strong>{clip?.digitalFarmer}</strong>
//             </div>
//             {/* <Text>Bannerghatt Road,</Text>
//             <Text>Bangalore - 560076</Text> */}
//           </Flex>
//         </Row>

//         <Row style={{ marginTop: 48 }}>
//           <Table
//             dataSource={[
//               {
//                 id: 1,
//                 name: 'Accommodation (Single Occupancy)',
//                 description: 'Accommodation',
//                 price: 1599,
//                 quantity: 1
//               }
//             ]}
//             pagination={false}
//           >
//             <Table.Column title='Items' dataIndex='name' />
//             <Table.Column title='Description' dataIndex='description' />
//             <Table.Column title='Quantity' dataIndex='quantity' />
//             <Table.Column title='Price' dataIndex='price' />
//             <Table.Column title='Line Total' />
//           </Table>
//         </Row>

//         <Row style={{ marginTop: 48 }}>
//           <Col span={8} offset={16}>
//             <table>
//               <tr>
//                 <th>Gross Total :</th>
//                 <td>$ {clip?.amount}</td>
//               </tr>
//               {/* <tr>
//                 <th>IGST @6% :</th>
//                 <td>Rs. 95.94</td>
//               </tr>
//               <tr>
//                 <th>CGST @6% :</th>
//                 <td>Rs. 95.94</td>
//               </tr>
//               <tr>
//                 <th>Nett Total :</th>
//                 <td>Rs. 1790.88</td>
//               </tr> */}
//             </table>
//           </Col>
//         </Row>
//         <Flex align='center' direction='column' justify='center'>
//           <Row style={{ marginTop: 48, textAlign: 'center' }}>notes</Row>

//           <Row style={{ marginTop: 48, textAlign: 'center' }}>Footer</Row>
//         </Flex>
//       </div>
//     </Flex>
//   )
// }

// export default Receipt
