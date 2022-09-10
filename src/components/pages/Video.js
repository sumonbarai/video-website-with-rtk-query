import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../feature/api/apiSlice";
import Error from "../ui/Error";
import DescriptionLoader from "../ui/loaders/DescriptionLoader";
import PlayerLoader from "../ui/loaders/PlayerLoader";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";

export default function Video() {
  const { videoId } = useParams();
  const {
    data: video,
    isError,
    isLoading,
    isSuccess,
  } = useGetVideoQuery(videoId);
  const { link, title, id } = video || {};

  // what to render
  let content = null;
  if (isLoading) {
    content = (
      <>
        <PlayerLoader></PlayerLoader>
        <DescriptionLoader></DescriptionLoader>
      </>
    );
  }
  if (!isLoading && isError) {
    content = <Error message={"there are some error occurred !"}></Error>;
  }
  if (!isLoading && !isError && !video?.id) {
    content = <Error message={"No video found!"}></Error>;
  }
  if (!isLoading && !isError && video.id) {
    content = (
      <>
        <Player title={title} link={link} />
        <Description video={video} />
      </>
    );
  }

  return (
    <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
      <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <div className="col-span-full w-full space-y-8 lg:col-span-2">
            {content}
          </div>
          {isSuccess ? (
            <RelatedVideos title={title} id={id} />
          ) : (
            <Error message={"there are some error occurred !"}></Error>
          )}
        </div>
      </div>
    </section>
  );
}
