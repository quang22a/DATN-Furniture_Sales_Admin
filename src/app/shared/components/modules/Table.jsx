export const DataGrid = ({ columns, rows }) => {
  return (
    <div className="grid">
      <div className="table">
        <table>
          <tr>
            {columns
              ? columns.map((item, index) => (
                  <th key={`column-${index}`}>{item.name}</th>
                ))
              : ""}
          </tr>
          {rows
            ? rows.map((item, index) => (
                <tr key={`row-${index}`}>
                  {Object.keys(item).map((item1, index1) => (
                    <td key={`value-${index1}`}>{item[item1]}</td>
                  ))}
                </tr>
              ))
            : ""}
        </table>
      </div>
    </div>
  );
};
