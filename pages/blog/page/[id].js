// pages/blog/page/[id].js
import Link from "next/link";
import { Pagination } from "../../../components/Pagination";
import { client } from "../../../libs/client";
import style from "../../../styles/Home.module.scss";
import { Footer } from "@/components/Footer";

const PER_PAGE = 5;

// pages/blog/[id].js
export default function BlogPageId({ blog, totalCount }) {
  return (
    <div>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`} className={style.textLink}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
      <p>以下はページネーションだよ</p>
      <Pagination totalCount={totalCount} className={style.textLink} />
      <Footer />
    </div>
  );
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: "blog" });

  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
    (repo) => `/blog/page/${repo}`
  );

  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context) => {
  const id = context.params.id;

  const data = await client.get({
    endpoint: "blog",
    queries: { offset: (id - 1) * 5, limit: 5 },
  });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  };
};
