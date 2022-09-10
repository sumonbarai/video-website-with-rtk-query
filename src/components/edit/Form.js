import { useState } from "react";
import { useEditVideoMutation } from "../../feature/api/apiSlice";
import Error from "../ui/Error";
import Success from "../ui/Success";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";

export default function Form({ video }) {
  const [editVideo, { isLoading, isSuccess, isError }] = useEditVideoMutation();
  const {
    id,
    title: editTitle,
    author: editAuthor,
    description: editDescription,
    link: editLink,
    thumbnail: editThumbnail,
    date: editDate,
    duration: editDuration,
    views: editViews,
  } = video || {};

  const [title, setTitle] = useState(editTitle);
  const [author, setAuthor] = useState(editAuthor);
  const [description, setDescription] = useState(editDescription);
  const [link, setLink] = useState(editLink);
  const [thumbnail, setThumbnail] = useState(editThumbnail);
  const [date, setDate] = useState(editDate);
  const [duration, setDuration] = useState(editDuration);
  const [views, setViews] = useState(editViews);

  const handleEditPost = (e) => {
    e.preventDefault();
    const data = {
      title,
      author,
      description,
      link,
      thumbnail,
      date,
      duration,
      views,
    };
    editVideo({ id, data });
  };

  return (
    <form onSubmit={handleEditPost}>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Video Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <TextArea
                title="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="YouTube Video link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="Thumbnail link"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <TextInput
                title="Upload Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video no of views"
                value={views}
                onChange={(e) => setViews(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
        {isSuccess && <Success message="Video was added successfully" />}
        {isError && <Error message="There some occurred error" />}
      </div>
    </form>
  );
}
