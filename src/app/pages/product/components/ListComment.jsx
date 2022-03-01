const ListComment = ({ data }) => {
  return (
    <>
      {data && data.length ? (
        <div className="comment-product">
          <ul className="list-comment">
            {data.map((item, index) => (
              <li className="item-comment" key={index}>
                <p className="comment-user">{item.customer[0]?.name}</p>
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
        <p>Chưa có đánh giá nào</p>
      )}
    </>
  );
};

export default ListComment;
