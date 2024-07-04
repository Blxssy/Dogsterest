import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

export default function MediaCard({ id, img, likes }) {
    const handleLike = async () => {
        try {
            const response = await fetch(`http://localhost:3001/dog/${id}`, {
                method: "PATCH",
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={img}
        title="green iguana"
      />
      <CardActions>
        <Button size="small" onClick={handleLike}>👍🏻 Like</Button>
        {likes}
        <span>likes</span>
      </CardActions>
    </Card>
  );
}
