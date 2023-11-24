import React from 'react';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle'
import BillTo from './BillTo'
import InvoiceNo from './InvoiceNo'
import InvoiceItemsTable from './InvoiceItemsTable'
import InvoiceThankYouMsg from './InvoiceThankYouMsg'
// import logo from '../../../src/logo.png'


const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    // logo: {
    //     width: 74,
    //     height: 66,
    //     marginLeft: 'auto',
    //     marginRight: 'auto'
    // }
});

let invoiceDummy = {
    "booking": [
        {
            "booking_id": "bk0090",
            "booking_date_from": "2023-11-24",
            "booking_date_to": "2023-11-25",
            "total_rooms_booked": 1,
            "is_cancelled": false,
            "booking_time": "2023-11-22 13:03:44.222",
            "booking_room_link": [
                {
                    "room_name": "Capsule",
                    "room_type": "single",
                    "room_count": 1,
                    "room_id": "r0011"
                }
            ],
            "booking_guest_link": [
                {
                    "guest_name": "Roshan ALi dar",
                    "guest_email": "roshanali@mail.in",
                    "guest_age": 20,
                    "guest_phone_number": 7006177645
                }
            ],
            "booking_invoice": [
                {
                    "base_price": 2200,
                    "taxes": 220,
                    "other_fees": 200,
                    "coupon_discount": 120,
                    "total_price": 2400,
                    "transaction_refrence_no": "rx12345",
                    "invoice_time": "2023-11-22 13:03:44.222",
                    "booking_gst_link": [
                        {
                            "gst_registration_no": "RX12aa4",
                            "gst_company_name": "ABC Co",
                            "gst_company_address": "12 Rashan Ghat",
                            "invoice_id": "inv001"
                        }
                    ]
                }
            ]
        }
    ]
}
const Invoice = ({ invoice }) => (

    <Document>

        <Page size="A4" style={styles.page}>
            {/* <Image style={styles.logo} src={logo} /> */}
            <InvoiceTitle title='Invoice' />
            <InvoiceNo invoice={invoice} />
            <BillTo invoice={invoice} />
            <InvoiceItemsTable invoice={invoice} />
            <InvoiceThankYouMsg />
        </Page>
    </Document>

);

export default Invoice
