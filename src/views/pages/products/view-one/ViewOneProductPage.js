import React from "react";
import { useParams } from "react-router-dom";
import { useGetShopProductComments, useGetShopProductReviews, useGetSingleProduct, useUpdateShopProductCommentStatus, useUpdateShopProductReviewsStatus } from "api/products";
import { Spinner } from "reactstrap";
import CustomCard from "views/components/CustomCard";
import { useTranslation } from "utility/language";
import ProductDetails from "./ProductDetails";
import AdditionalImages from "./AdditionalImages";
// import ProductTabs from "./ProductTabs";


const ViewOneProductPage = () => {
  const t = useTranslation();
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProduct({ product_id: id });
  const commentQuery = useGetShopProductComments;
  const reviewsQuery = useGetShopProductReviews;
  const commentMuation = useUpdateShopProductCommentStatus();
  const reviewsMutation = useUpdateShopProductReviewsStatus();

  const product = data?.product || {};

  if (isLoading) {
    return (
      <CustomCard>
        <Spinner color="primary" size="lg" />
      </CustomCard>
    );
  }
  if (!data) {
    return (
      <CustomCard>
        <h3 className="mb-0">{t("product_not_found")}</h3>
      </CustomCard>
    );
  }
  return (
    <>
      <ProductDetails
       commentQuery={commentQuery}
        reviewsQuery={reviewsQuery}
        commentMuation={commentMuation}
        reviewsMutation={reviewsMutation}
         product={product} />
      <AdditionalImages product={product} />
      {/* <ProductTabs
        commentQuery={commentQuery}
        reviewsQuery={reviewsQuery}
        commentMuation={commentMuation}
        reviewsMutation={reviewsMutation}

      /> */}
    </>
  );
};

export default ViewOneProductPage;
