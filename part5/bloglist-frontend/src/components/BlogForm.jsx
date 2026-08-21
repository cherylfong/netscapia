const BlogForm = ({
    addBlog,
    newBlogTitle, handlBlogTitleChange,
    newBlogAuthor, handleBlogAuthorChange,
    newBlogUrl, handleBlogUrlChange
}) => (
    <form onSubmit={addBlog}>
        <div><label>title:
            <input
                value={newBlogTitle}
                onChange={handlBlogTitleChange}
            />
        </label></div>
        <div><label>author:
            <input
                value={newBlogAuthor}
                onChange={handleBlogAuthorChange}
            />
        </label></div>
        <div><label>url:
            <input
                value={newBlogUrl}
                onChange={handleBlogUrlChange}
            />
        </label></div>
        <button type="submit">Save</button>
    </form>
)

export default BlogForm