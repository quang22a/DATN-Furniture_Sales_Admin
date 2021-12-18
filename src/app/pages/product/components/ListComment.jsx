const ListComment = ({ data }) => {
  return (
    <>
      {data ? (
        <div className="comment-product">
          <ul className="list-comment">
            {data.map((item, index) => (
              <li className="item-comment" key={index}>
                <p className="comment-user">{item.user}</p>
                <div>
                  {[...Array(item.rating)].map((item1, index1) => (
                    // <i className="far fa-star active" key={index1}></i>
                    <span
                      className="material-icons-outlined icon-star"
                      key={index1}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="comment">{item.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ListComment;
