import React from 'react'
import { Formik, Form } from 'formik';
import { Badge, Card, CardBody, CardHeader } from 'reactstrap';
import { useTranslation } from 'utility/language';
import { initialValues } from './utils'
import { useAuth } from 'redux/hooks/auth';
import AccountForm from './AccountForm';
export default function MyAccount() {
    const t = useTranslation();
    const { user } = useAuth();


    return (
        <Card >
            <CardHeader>
                {t("my_account")}

                <Badge color={user.status?"success":"danger"}>{ user.status?t("active"):t("inactive")}</Badge>
            </CardHeader>


            <Formik initialValues={initialValues(user)}>
                {
                    (formik) => <Form>
                        <CardBody>
                            <AccountForm />
                        </CardBody>
             
                    </Form>
                }
            </Formik>



        </Card>
    )
}