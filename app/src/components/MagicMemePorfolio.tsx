import React, { useEffect, useState } from "react";
import FlyingMeme from "./FlyingMeme";

type PortfolioType = {
  data: string;
  _id: string;
};

const MagicMemePorfolio = () => {
  const [portfolio, setPortfolio] = useState<PortfolioType[]>([]);

  const magicPaste = async (event: ClipboardEvent) => {
    let items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;

    // console.log(JSON.stringify(items));
    const blob =
      items[0].type == "text/html"
        ? items[1].getAsFile()
        : items[0].getAsFile();
    const reader = new FileReader();
    reader.onload = function (event) {
      //console.log(event.target.result); // data url!
      //loadImage(event.target.result);

      fetch("http://127.0.0.1:3000/meme", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          data: event.target?.result,
        }),
      }).then(() => {
        loadPortfolio();
      });
    };

    reader.readAsDataURL(blob);
  };

  const loadPortfolio = () => {
    fetch("http://127.0.0.1:3000/meme", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPortfolio(data as PortfolioType[]);
      });
  };

  const deleteMeme = (id: string) => {
    fetch("http://127.0.0.1:3000/meme", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    }).then(() => {
      loadPortfolio();
    });
  };

  useEffect(() => {
    loadPortfolio();
    document.addEventListener("paste", magicPaste);

    return () => {
      document.removeEventListener("paste", magicPaste);
    };
  }, []);

  return (
    <div className="meme-portfolio">
      {portfolio.map((meme: PortfolioType) => (
        <FlyingMeme {...meme} onDelete={deleteMeme} />
      ))}
    </div>
  );
};

export default MagicMemePorfolio;
