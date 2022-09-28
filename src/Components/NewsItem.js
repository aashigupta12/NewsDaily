import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3  justify-content-center">
      <div className="card mx-auto" style={{ width: "18rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>

        {/* agar imageUrl null nhi h to use normal imageUrl, othweise that imag link i have copied  */}
        <img
          src={
            imageUrl
              ? imageUrl
              : "https://c.ndtvimg.com/2022-04/l98j8f7g_spicejet-boeing-737-max-aircraft_625x300_13_April_22.jpg"
          }
          className="card-img-top"
          alt="..."
        />

        <div className="card-body ">
          <h5 className="card-title">{title}</h5>

          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-danger">
              By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>
          {/* _blank is used to open the news on a diff pge  */}
          <a
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
            rel="noreferrer"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
