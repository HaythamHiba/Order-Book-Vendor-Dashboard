import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {  ImageURL } from "api/config";

export const ExistingImage = ({ image, deletedImages = [], onDelete }) => {

  if (deletedImages.find((id) => id === image.id)) {
    return null;
  }
  return (
    <Card
      style={{
        border: "1px solid lightgray",
        height: "275px",
        width: "275px",
      }}
      className="mx-1"
    >
      <CardImg
        alt="slider"
        src={`${ImageURL}${image.image}`}
        top
        style={{
          height: "200px",
          objectFit: "contain",
          maxWidth: "100%",
          padding: "0.5rem",
          paddingTop: "1rem",
        }}
      />
        <CardBody>
          <div className="d-flex justify-content-center align-items-center">
            <IconButton onClick={onDelete}>
              <DeleteForeverIcon fontSize="large" />
            </IconButton>
          </div>
        </CardBody>
      
    </Card>
  );
};
