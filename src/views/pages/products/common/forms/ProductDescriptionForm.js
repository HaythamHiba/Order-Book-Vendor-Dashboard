import React from 'react'
import { Col, Row } from 'reactstrap'
import SingleLangEditor from './SingleLangEditor'

export default function ProductDescriptionForm() {
    return (
        <Row  xs={1} sm={1} md={1} lg={2} xl={2}>
            <Col>
                <SingleLangEditor langCode={1} property="product_description" />
            </Col>
            <Col>
                <SingleLangEditor langCode={2} property="product_description" />

            </Col>
        </Row>
    )
}
