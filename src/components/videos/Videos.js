import { useGetVideosQuery } from "../../feature/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
  const { data: videos, isError, isLoading } = useGetVideosQuery();
  //  what to render
  let content = null;
  if (isLoading) {
    content = (
      <>
        <VideoLoader></VideoLoader>
        <VideoLoader></VideoLoader>
        <VideoLoader></VideoLoader>
        <VideoLoader></VideoLoader>
      </>
    );
  }
  if (!isLoading && isError) {
    content = <Error message={"there are some error occurred !"}></Error>;
  }
  if (!isLoading && !isError && videos.length === 0) {
    content = <Error message={"No video found!"}></Error>;
  }
  if (!isLoading && !isError && videos.length > 0) {
    content = videos.map((video) => <Video key={video.id} video={video} />);
  }
  return <>{content}</>;
}
