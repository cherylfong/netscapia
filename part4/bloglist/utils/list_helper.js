const lodash = require('lodash')

// array of blogs as param
const dummy = (blogs) => {
  console.log('BLOGS array is', blogs)
  return 1
}

// array of blogs as param
// returns sum of likes in list of blogs
const totalLikes = (blogs) => {

  return blogs.reduce((sum, b) => sum + (b.likes || 0), 0)
}

// array of blogs as param
// returns the blog with the most likes
// more than 1 blog will be returned
// when there are more than 1 highest likes of the same value
const favoriteBlog = (blogs) => {

  if (!blogs || blogs.length === 0 || blogs.length === 1) return blogs

  let maxLikes = -Infinity
  const result = []

  for (const b of blogs) {
    const likes = b.likes || 0
    if (likes > maxLikes) {
      maxLikes = likes
      result.length = 0
      result.push(b)
    } else if (likes === maxLikes) {
      result.push(b)
    }
  }

  return result
}

// array of blogs as param
// returns the author who has the highest number of blogs
// return value also contains the number of blogs by the author
// for example
// {
//   author: "Robert C. Martin",
//   blogs: 3
// }
const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return {}
  if (blogs.length === 1) return [{ author: blogs[0].author, blogs: 1 }]

  const result = []

  for (const b of blogs) {
    const author = b.author
    // find if author already exists in results
    const entry = lodash.find(result, { author })
    if (!entry) {
      result.push({ author, blogs: 1 })
    } else {
      entry.blogs += 1
    }
  }

  // return the author object with the highest blog count
  const top = lodash.maxBy(result, 'blogs')

  // check to see if there are coliding (more than one highest number of the same value)
  const winners = result.filter(r => r.blogs === top.blogs)

  return winners
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}