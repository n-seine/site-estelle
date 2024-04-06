const getAllStories = async () => {
  const sbApi = useStoryblokApi();

  const { data } = await sbApi.get("cdn/stories", {
    content_type: "project",
    version:
      import.meta.env.STORYBLOK_IS_PREVIEW === "yes" ? "draft" : "published",
  });

  const stories = Object.values(data.stories);
  return stories as Project[];
};

export default getAllStories;
