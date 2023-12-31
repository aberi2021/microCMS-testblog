//components/Pagination.js
import Link from "next/link";
import style from "../styles/Home.module.scss";

export const Pagination = ({ totalCount }) => {
  const PER_PAGE = 5;

  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <ul>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index}>
          <Link href={`/blog/page/${number}`} className={style.textLink}>
            {number}
          </Link>
        </li>
      ))}
    </ul>
  );
};
