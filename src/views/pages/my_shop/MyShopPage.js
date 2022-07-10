import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from 'reactstrap'
import { useTranslation } from 'utility/language'
import { useGetShop, useUpdateShop } from 'api/shops';
import { Formik, Form } from 'formik';
import { getDataToSend, getInitialValues, getValidationSchema } from './form_utils';
import MyShopForm from './MyShopForm'
import { LoadingButton } from 'components/input';
import { useImagePreview } from 'hooks';
import { baseURL } from 'api/config';
import ComponentSpinner from 'components/@vuexy/spinner/Loading-spinner';
export default function MyShopPage() {

    const t = useTranslation();
    const { data, isLoading: shopIsLoading } = useGetShop()
    const updateMutation = useUpdateShop();
    const shop = data?.shop || {};

    const image = shop.shop_image;
    const { preview, setPreview, handleImageChange } = useImagePreview(image);

    React.useEffect(() => {
        setPreview(`${baseURL}${image}`)
    }, [image, setPreview])

    if (shopIsLoading) {
        return (
            <div>
                <ComponentSpinner />
            </div>
        )
    }

    const handleSubmit = (values) => {

        const data = getDataToSend(values)
        updateMutation.mutate(data)


    }




    return (
        <Card>
            <CardHeader>
                {t("my_shop")}
            </CardHeader>
            <Formik initialValues={getInitialValues(shop)} validationSchema={getValidationSchema(true)} onSubmit={handleSubmit}>
                {
                    (formik) => <Form>
                        <CardBody>
                            <MyShopForm preview={preview} handleImageChange={handleImageChange} />
                        </CardBody>
                        <CardFooter>
                            <LoadingButton
                                type="submit"
                                color="primary"
                                isLoading={updateMutation.isLoading}
                            >
                                {t("save")}
                            </LoadingButton>
                        </CardFooter>
                    </Form>
                }
            </Formik>

        </Card>

    )
}
