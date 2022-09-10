import { useGetRelatedVideosQuery } from "../../../feature/api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ id, title }) {
  const {
    data: relatedVideos,
    isLoading,
    isError,
  } = useGetRelatedVideosQuery({ id, title });

  // what to render
  let content = null;
  if (isLoading) {
    content = (
      <>
        <RelatedVideoLoader></RelatedVideoLoader>
        <RelatedVideoLoader></RelatedVideoLoader>
        <RelatedVideoLoader></RelatedVideoLoader>
      </>
    );
  }
  if (!isLoading && isError) {
    content = (
      <Error message={"there are some error occurred related videos!"}></Error>
    );
  }
  if (!isLoading && !isError && relatedVideos?.length === 0) {
    content = <Error message={"No video found!"}></Error>;
  }
  if (!isLoading && !isError && relatedVideos?.length > 0) {
    content = relatedVideos.map((video) => (
      <RelatedVideo key={video.id} video={video} />
    ));
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
}
