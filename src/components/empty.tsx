import Typography from './typography'

const Empty = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[70px]">
        <svg
          className="w-[inherit] h-auto"
          width="57"
          height="48"
          viewBox="0 0 57 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M56.4575 25.5875L52.4575 6.61125C51.685 2.47125 48.71 0 44.5 0H12.5C10.4 0 8.62501 0.58625 7.23751 1.7425C5.85001 2.89875 4.94126 4.53125 4.54001 6.60375L0.54001 25.5875C0.512985 25.7233 0.499586 25.8615 0.50001 26V40C0.50001 42.1217 1.34286 44.1566 2.84316 45.6568C4.34345 47.1571 6.37828 48 8.50001 48H48.5C50.6217 48 52.6566 47.1571 54.1569 45.6568C55.6571 44.1566 56.5 42.1217 56.5 40V26C56.4996 25.8614 56.4854 25.7232 56.4575 25.5875ZM8.45751 7.4125C8.45751 7.4 8.45751 7.38875 8.45751 7.3775C8.90126 5.07375 10.1838 4.0025 12.4938 4.0025H44.5C46.8263 4.0025 48.1088 5.07125 48.5338 7.36625C48.5338 7.3825 48.54 7.39875 48.5425 7.415L51.9088 23.4C51.924 23.4728 51.9228 23.5481 51.9053 23.6205C51.8877 23.6928 51.8542 23.7602 51.8073 23.818C51.7603 23.8757 51.7011 23.9222 51.6339 23.9541C51.5667 23.9861 51.4932 24.0026 51.4188 24.0025H36.5C35.9727 23.9998 35.4658 24.2066 35.0908 24.5774C34.7158 24.9482 34.5033 25.4526 34.5 25.98C34.5 27.5713 33.8679 29.0974 32.7426 30.2226C31.6174 31.3479 30.0913 31.98 28.5 31.98C26.9087 31.98 25.3826 31.3479 24.2574 30.2226C23.1321 29.0974 22.5 27.5713 22.5 25.98C22.4987 25.7187 22.4459 25.4601 22.3447 25.2192C22.2435 24.9783 22.0958 24.7596 21.9101 24.5758C21.7244 24.3919 21.5043 24.2464 21.2623 24.1476C21.0204 24.0488 20.7613 23.9987 20.5 24H5.58126C5.50685 24.0001 5.43336 23.9836 5.36614 23.9516C5.29892 23.9197 5.23968 23.8732 5.19273 23.8155C5.14578 23.7577 5.11231 23.6903 5.09475 23.618C5.0772 23.5456 5.076 23.4703 5.09126 23.3975L8.45751 7.4125Z"
            fill="#B3B3B3"
          />
        </svg>
      </div>
      <Typography secondary>No Data</Typography>
    </div>
  )
}

export default Empty
