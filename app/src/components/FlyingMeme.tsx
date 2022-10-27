import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";

type MagicMemeProps = {
  data: string;
  _id: string;
  onDelete: Function;
};

const FlyingMeme = ({ data, _id, onDelete }: MagicMemeProps) => {
  return (
    <Draggable>
      <div className="flying-meme">
        <div className="flying-meme-container">
          <button
            onClick={() => {
              onDelete(_id);
            }}
          >
            {" "}
            X{" "}
          </button>
          <div className="drag-me"></div>
          <img src={data} alt="FLYING MEME!!!" />
        </div>
      </div>
    </Draggable>
  );
};

export default FlyingMeme;
