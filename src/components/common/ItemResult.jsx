import React from "react";

const ItemResult = ({ matchQuery, info, defaultInfo }) => {

  return (
    <div className="item-result">
      {info !== defaultInfo && (
        <span className="item-result_default">{defaultInfo}</span>
      )}
      <div className="item-result_marked">
        {info.split(new RegExp(`(${matchQuery})`, "gi")).map((part, index) =>
          part.toLowerCase() === matchQuery.toLowerCase() ? (
            <mark key={index} className="item-result_match">
              {part}
            </mark>
          ) : (
            <React.Fragment key={index}>{part}</React.Fragment>
          )
        )}
      </div>
    </div>
  );
};

export default ItemResult;
